"use server"

import {LRUCache} from 'lru-cache';
import {Mutex} from 'async-mutex';

const articles_cache = new LRUCache({
    max: 1000,
    ttl: 300000 // in milliseconds
});
const articles_cache_mutex = new Mutex();

export const isArticleCached = async (key) => {
    return articles_cache.has(key);
}
export const getCachedArticle = async (key) => {
    return articles_cache.get(key);
}

export const setCachedArticle = async (key, value) => {
    if (await isArticleCached(key)) return
    const release = await articles_cache_mutex.acquire();
    try {
        articles_cache.set(key, value);
    } finally {
        release();
    }
}

export const invalidateCachedArticle = async (key) => {
    if (!await isArticleCached(key)) return
    const release = await articles_cache_mutex.acquire();
    try {
        articles_cache.delete(key);
    } finally {
        release();
    }
}

export const setCachedBulkArticles = async (uncached_articles_map) => {
    if (uncached_articles_map && uncached_articles_map instanceof Map && uncached_articles_map.size > 0) {
        for (const [key, value] of uncached_articles_map) {
            await setCachedArticle(`article: ${key}`, value)
        }
    }
}