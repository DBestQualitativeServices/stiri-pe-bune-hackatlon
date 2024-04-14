"use server"

import {Mutex} from 'async-mutex';

const TTLCache = require('@isaacs/ttlcache')

const categories_cache = new TTLCache({
    max: 1,
    ttl: 300000
});
const categories_cache_mutex = new Mutex();

export const areCategoriesCached = async (key) => {
    return categories_cache.has(key);
}

export const getCachedCategories = async (key) => {
    return categories_cache.get(key)?.value;
}

export const setCachedCategories = async (key, value) => {
    if (await areCategoriesCached(key)) return
    const release = await categories_cache_mutex.acquire();
    try {
        categories_cache.set(key, {value, timestamp: Date.now()});
    } finally {
        release();
    }
}

// export const invalidateCachedCategories = async (key) => {
//     if (!await areCategoriesCached(key)) return
//     const release = await categories_cache_mutex.acquire();
//     try {
//         categories_cache.delete(key);
//     } finally {
//         release();
//     }
// }