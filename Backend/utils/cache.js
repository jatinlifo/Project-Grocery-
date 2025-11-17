import { createClient } from "redis";

let client = null; // redis client placeholder

//initialize redis connection
export const initCache = async (redisUrl) => {
    if (!redisUrl) {
        return null; // skip if no redis url
    }
    client = createClient({url: redisUrl});
    client.on("error", (err) => console.error("Redis error", err));
    await client.connect();
    return client;
};

//get value by key
export const cacheGet = async (key) => {
    if (!client) {
        return null;
    }

    try {
        const val = await client.get(key);
        return val ? JSON.parse(val) : null;
    } catch (e) {
        console.error("Cache get error", e);
        return null;
    }
};

//set value with TTl
export const cacheSet = async (key, CSSMathValue, ttl = 3600) => {
    if (!client) {
        return;
    }

    try {
        await client.set(key, JSON.stringify(value), {EX: ttl})
    } catch (e) {
        console.error("Cache set error", e);
    }
}