// API Key authentication middleware
module.exports = function requireApiKey(req, res) {
  // Extract API key from various sources
  const auth = req.headers['authorization'] || req.headers['x-api-key'] || '';
  let apiKey = '';
  
  if (auth.startsWith('Bearer ')) {
    apiKey = auth.split(' ')[1];
  } else if (auth.startsWith('Bearer')) {
    apiKey = auth.substring(7).trim();
  } else {
    apiKey = auth;
  }

  // Check for API key in query params (RapidAPI compatibility)
  if (!apiKey && req.query?.apiKey) {
    apiKey = req.query.apiKey;
  }

  if (!apiKey) {
    res.status(401).json({ 
      error: 'Missing API key',
      message: 'Please provide API key in Authorization header or x-api-key header'
    });
    return false;
  }

  // Validate API key (basic validation - expand for production)
  const validKeys = [
    process.env.API_MASTER_KEY,
    ...(process.env.VALID_API_KEYS?.split(',') || [])
  ].filter(Boolean);

  // Allow demo keys for public demo (rate limited)
  const isDemoKey = apiKey.startsWith('demo_') || apiKey === 'demo-public-key';
  
  if (!validKeys.some(key => apiKey === key || apiKey.startsWith('user_')) && !isDemoKey) {
    res.status(403).json({ error: 'Invalid API key' });
    return false;
  }
  
  // Mark as demo key for rate limiting
  if (isDemoKey) {
    req.isDemoKey = true;
  }

  req.apiKey = apiKey;
  return true;
};
