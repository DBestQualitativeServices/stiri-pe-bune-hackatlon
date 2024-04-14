"use server"

import {isPositiveInteger} from "../../utils/utils";

export const sanitizeArticleIds = async (articles_ids) => {
    if (!Array.isArray(articles_ids) || articles_ids.length === 0) throw new Error("articles_ids param must be an array with at least one id")
    if (articles_ids.some(el => !isPositiveInteger(el))) throw new Error("articles_ids must be a list composed of positive integers")
    return articles_ids
}

export const sanitizeArticleId = async (article_id) => {
    if (!isPositiveInteger(article_id)) throw new Error("article_id must be a positive integer")
    return Number(article_id)
}

export const sanitizeCurrentPage = async (current_page) => {
    if (!isPositiveInteger(current_page)) throw new Error("current_page must be a positive integer greater than 0")
    if (current_page < 1) throw new Error("current_page must be a positive integer greater than 0")
    return Number(current_page)
}

export const sanitizeResultsPerPage = async (results_per_page) => {
    if (!isPositiveInteger(results_per_page)) throw new Error("results_per_page must be a positive integer greater than 0")
    if (results_per_page < 1) throw new Error("results_per_page must be a positive integer greater than 0")
    return Number(results_per_page)
}

export const sanitizeCategory = async (category) => {
    if (typeof category === "string") {
        if (!/^[a-zA-Z0-9_\-\s]+$/.test(category)) throw new Error("category param does not match the allowed pattern")
    } else throw new Error("category parameter must be a string")
    return String(category).trim()
}