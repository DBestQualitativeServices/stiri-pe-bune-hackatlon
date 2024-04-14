"use server"

import process from 'process';
import {
    sanitizeArticleId, sanitizeArticleIds, sanitizeCategory,
    sanitizeCurrentPage, sanitizeResultsPerPage
} from "../services/param-validation";

const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE,
    port: process.env.DATABASE_PORT,
    ssl: process.env.DATABASE_SSL,
    max: 2
});

export const queryArticleCategories = async () => {
    const client = await pool.connect();
    try {
        const response = await client.query(`
            SELECT DISTINCT pa.category
            FROM processed_article pa`);
        return response.rows.map(row => row.category)
    } catch (error) {
        return {error: {message: error.message}}
    } finally {
        client.release()
    }
}

export const queryDetailedArticleById = async (article_id) => {
    console.log("not cache hit queryDetailedArticleById")
    const client = await pool.connect();
    try {
        const sanitized_article_id = await sanitizeArticleId(article_id);

        const query = {
            text: `SELECT pa.id,
                          pa.version,
                          pa.title,
                          pa.content,
                          pa.category,
                          pa.headline,
                          '[' || STRING_AGG('"' || sa.url || '"', ', ') || ']' AS all_versions_urls,
                          sa_max.date_uploaded                                 AS latest_version_date_uploaded
                   FROM processed_article pa
                            JOIN
                        (SELECT id,
                                MAX(version) as max_version
                         FROM processed_article
                         GROUP BY id) mv ON pa.id = mv.id AND pa.version = mv.max_version
                            LEFT JOIN
                        source_article sa ON sa.processed_article_id = pa.id
                            LEFT JOIN
                        source_article sa_max
                        ON sa_max.processed_article_id = pa.id AND sa_max.processed_article_version = mv.max_version
                   WHERE pa.id = $1
                   GROUP BY pa.id, pa.version, sa_max.date_uploaded`,
            values: [sanitized_article_id]
        };

        const response = await client.query(query);

        return response.rows.reduce((obj, row) => {
            obj[row.id] = row;
            return obj;
        }, {});
    } catch (error) {
        return {error: {message: error.message}};
    } finally {
        client.release();
    }
}

export const queryDetailedArticles = async (articles_ids) => {
    const client = await pool.connect();
    try {
        const sanitized_article_ids = await sanitizeArticleIds(articles_ids)

        const query = {
            text: `SELECT pa.id,
                          pa.version,
                          pa.title,
                          pa.content,
                          pa.category,
                          pa.headline,
                          '[' || STRING_AGG('"' || sa.url || '"', ', ') || ']' AS all_versions_urls,
                          sa_max.date_uploaded                                 AS latest_version_date_uploaded
                   FROM processed_article pa
                            JOIN
                        (SELECT id,
                                MAX(version) as max_version
                         FROM processed_article
                         GROUP BY id) mv ON pa.id = mv.id AND pa.version = mv.max_version
                            LEFT JOIN
                        source_article sa ON sa.processed_article_id = pa.id
                            LEFT JOIN
                        source_article sa_max
                        ON sa_max.processed_article_id = pa.id AND sa_max.processed_article_version = mv.max_version
                   WHERE pa.id = ANY ($1)
                   GROUP BY pa.id, pa.version, sa_max.date_uploaded`,
            values: [sanitized_article_ids]
        };

        const response = await client.query(query);

        const articles_map = new Map();
        for (const row of response.rows) {
            articles_map.set(row.id, row);
        }

        return articles_map;
    } catch (error) {
        return {error: {message: error.message}}
    } finally {
        client.release()
    }
}

export const queryPaginatedArticlesIds = async (current_page, results_per_page) => {
    const client = await pool.connect();

    try {
        const sanitized_current_page = await sanitizeCurrentPage(current_page);
        const sanitized_results_per_page = await sanitizeResultsPerPage(results_per_page);
        const pagination_offset = (sanitized_current_page - 1) * sanitized_results_per_page;

        const query = {
            text: `SELECT pa.id
                   FROM processed_article pa
                            JOIN
                        (SELECT id,
                                MAX(version) as max_version
                         FROM processed_article
                         GROUP BY id) mv ON pa.id = mv.id AND pa.version = mv.max_version
                            LEFT JOIN
                        source_article sa ON sa.processed_article_id = pa.id
                            LEFT JOIN
                        source_article sa_max
                        ON sa_max.processed_article_id = pa.id AND sa_max.processed_article_version = mv.max_version
                   GROUP BY pa.id, pa.version, sa_max.date_uploaded
                   ORDER BY sa_max.date_uploaded DESC
                   OFFSET $1 LIMIT $2;`,
            values: [pagination_offset, sanitized_results_per_page]
        };
        const articles_response = await client.query(query);

        const total_count = articles_response.rows.length > 0 ? parseInt(articles_response.rows[0].total_count, 10) : 0;
        const has_next_page = (sanitized_current_page * sanitized_results_per_page) < total_count;
        const total_pages = Math.ceil(total_count / sanitized_results_per_page);

        const response = {
            pagination: {
                current_page: sanitized_current_page,
                has_next_page: has_next_page,
                total_pages: total_pages,
                results_per_page: sanitized_results_per_page
            },
            articles: new Map()
        }

        for (const row of articles_response.rows) {
            response.articles.set(row.id, null);
        }

        return response;
    } catch (error) {
        return {error: {message: error.message}};
    } finally {
        client.release();
    }
};


export const queryCategorisedPaginatedArticlesIds = async (current_page, results_per_page, category = "") => {
    const client = await pool.connect();

    try {
        const sanitized_current_page = await sanitizeCurrentPage(current_page);
        const sanitized_results_per_page = await sanitizeResultsPerPage(results_per_page);
        const sanitized_category = await sanitizeCategory(category);

        const pagination_offset = (sanitized_current_page - 1) * sanitized_results_per_page;

        const query = {
            text: `SELECT pa.id,
                          (SELECT COUNT(*)
                           FROM processed_article sub_pa
                                    JOIN (SELECT id,
                                                 MAX(version) AS max_version
                                          FROM processed_article
                                          GROUP BY id) sub_mv
                                         ON sub_pa.id = sub_mv.id AND sub_pa.version = sub_mv.max_version
                                    LEFT JOIN source_article sub_sa ON sub_sa.processed_article_id = sub_pa.id
                                    LEFT JOIN source_article sub_sa_max
                                              ON sub_sa_max.processed_article_id = sub_pa.id AND
                                                 sub_sa_max.processed_article_version =
                                                 sub_mv.max_version) AS total_count
                   FROM processed_article pa
                            JOIN (SELECT id,
                                         MAX(version) AS max_version
                                  FROM processed_article
                                  GROUP BY id) mv ON pa.id = mv.id AND pa.version = mv.max_version
                            LEFT JOIN source_article sa ON sa.processed_article_id = pa.id
                            LEFT JOIN source_article sa_max ON sa_max.processed_article_id = pa.id AND
                                                               sa_max.processed_article_version = mv.max_version
                   WHERE pa.category = $1
                   GROUP BY pa.id, pa.version, sa_max.date_uploaded
                   ORDER BY sa_max.date_uploaded DESC
                   OFFSET $2 LIMIT $3;`,
            values: [sanitized_category, pagination_offset, sanitized_results_per_page]
        };

        const articles_response = await client.query(query);

        const total_count = articles_response.rows.length > 0 ? parseInt(articles_response.rows[0].total_count, 10) : 0;
        const total_pages = Math.ceil(total_count / sanitized_results_per_page);
        const has_next_page = (sanitized_current_page * sanitized_results_per_page) < total_count;

        const response = {
            pagination: {
                current_page: sanitized_current_page,
                has_next_page: has_next_page,
                total_pages: total_pages,
                results_per_page: sanitized_results_per_page
            },
            articles: new Map()
        }

        for (const row of articles_response.rows) {
            response.articles.set(row.id, null);
        }

        return response;
    } catch (error) {
        return {error: {message: error.message}};
    } finally {
        client.release();
    }
};
