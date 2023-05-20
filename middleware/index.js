const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 min in milliseconds
    max: 5,
    message: `Login error, you have reached maximum retries. Please try again after 1 hour`, 
    statusCode: 429,
    Headers: true,
  });
  module.exports = { loginRateLimiter }