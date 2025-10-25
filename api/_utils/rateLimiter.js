// Rate limiter with in-memory and Redis support
const buckets = new Map();

function rateLimit(req, res, { limit = 1000, windowMs = 60 * 1000 } = {}) {
  const key = req.apiKey || req.ip || 'anon';
  const now = Date.now();
  
  let entry = buckets.get(key);
  
  if (!entry || (now - entry.windowStart > windowMs)) {
    entry = { count: 0, windowStart: now };
  }
  
  entry.count += 1;
  buckets.set(key, entry);
  
  if (entry.count > limit) {
    res.status(429).json({ 
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil((windowMs - (now - entry.windowStart)) / 1000)
    });
    return false;
  }
  
  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - entry.count));
  res.setHeader('X-RateLimit-Reset', entry.windowStart + windowMs);
  
  return true;
}

// Redis implementation (optional - for production)
async function rateLimitRedis(req, res, { limit = 1000, windowMs = 60 * 1000 } = {}) {
  const redisUrl = process.env.RATE_LIMIT_REDIS_URL;
  if (!redisUrl) return rateLimit(req, res, { limit, windowMs });
  
  // TODO: Implement Redis rate limiting
  // const redis = require('redis').createClient({ url: redisUrl });
  // const key = `rate_limit:${req.apiKey || req.ip}`;
  // const count = await redis.incr(key);
  // if (count === 1) await redis.expire(key, Math.ceil(windowMs / 1000));
  
  return rateLimit(req, res, { limit, windowMs });
}

module.exports = { rateLimit, rateLimitRedis };
