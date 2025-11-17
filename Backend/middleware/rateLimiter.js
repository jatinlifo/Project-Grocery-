import rateLimit from 'express-rate-limit'

//factory function (creates new limiter)

export const createRateLimiter = (windowMs = 60000, max = 100) => {
    return rateLimit({
        windowMs: windowMs, // time window in ms (1 minute)
        max: max,        //    max number of requests allowed
        standardHeaders: true, // return rate limit info in headers
        legacyHeaders: false,  // disable old headers
        message: {error: "Too many requests, please try again later."} // message when exceeded
    })
}