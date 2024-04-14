"use server"

import {articlesMapToObject} from "../../utils/utils";
import {getCachedArticle, isArticleCached, setCachedArticle, setCachedBulkArticles} from "../lib/article-cache";
import {areCategoriesCached, getCachedCategories, setCachedCategories} from "../lib/categories-cache";
import {sanitizeArticleId, sanitizeCategory, sanitizeCurrentPage, sanitizeResultsPerPage} from "./param-validation";
import {
    queryArticleCategories, queryCategorisedPaginatedArticlesIds, queryDetailedArticleById,
    queryDetailedArticles, queryPaginatedArticlesIds
} from "../lib/database";

export const fetchCategories = async () => {
    try {
        const cached_categories = await areCategoriesCached("categories")
        if (cached_categories) console.log("categories cache hit")
        if (cached_categories) return getCachedCategories("categories")

        const article_categories = await queryArticleCategories()
        if (article_categories && article_categories.length > 0) await setCachedCategories("categories", article_categories)

        return article_categories
    } catch (error) {
        return {error: {message: error.message}}
    }
}

export const fetchArticleById = async (article_id) => {
    try {
        const sanitized_article_id = await sanitizeArticleId(article_id)

        let is_article_cached = true
        if (await isArticleCached(`${sanitized_article_id}`)) {
            const cached_article = await getCachedArticle(`${sanitized_article_id}`)
            if (cached_article) return {[sanitized_article_id]: cached_article}
            is_article_cached = false
        } else is_article_cached = false

        if (!is_article_cached) {
            const uncached_article_obj = await queryDetailedArticleById(sanitized_article_id)
            if (uncached_article_obj && Object.keys(uncached_article_obj).length === 1) {
                await setCachedArticle(`${sanitized_article_id}`, uncached_article_obj[sanitized_article_id])
            }
            return uncached_article_obj
        }
    } catch (error) {
        return {error: {message: error.message}}
    }
}

export const fetchArticlesByPage = async (current_page, results_per_page, category) => {
    try {
        const sanitized_current_page = await sanitizeCurrentPage(current_page)
        const sanitized_results_per_page = await sanitizeResultsPerPage(results_per_page)

        const uncached_articles = []
        let paginated_articles

        if (category !== undefined && category !== null) {
            const sanitized_category = await sanitizeCategory(category)
            paginated_articles = await queryCategorisedPaginatedArticlesIds(sanitized_current_page, sanitized_results_per_page, sanitized_category)
        } else paginated_articles = await queryPaginatedArticlesIds(sanitized_current_page, sanitized_results_per_page)

        if (paginated_articles && paginated_articles.articles instanceof Map && paginated_articles.articles.size > 0) {
            for (const [key,] of paginated_articles.articles) {
                if (await isArticleCached(`${key}`)) {
                    console.log("cache hit articles by page")
                    const cached_article = await getCachedArticle(`${key}`)
                    if (cached_article) {
                        paginated_articles.articles.set(key, cached_article)
                    } else uncached_articles.push(key)
                } else uncached_articles.push(key)
            }

            if (uncached_articles.length > 0) {
                const uncached_articles_map = await queryDetailedArticles(uncached_articles)
                if (uncached_articles_map && uncached_articles_map instanceof Map && uncached_articles_map.size > 0) {
                    await setCachedBulkArticles(uncached_articles_map)
                    for (const [key, value] of uncached_articles_map) {
                        paginated_articles.articles.set(key, value)
                    }
                }
            }
        }
        return {...paginated_articles, articles: articlesMapToObject(paginated_articles.articles)}
    } catch (error) {
        return {error: {message: error.message}}
    }
}

