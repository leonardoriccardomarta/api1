module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const debug = {
    timestamp: new Date().toISOString(),
    groq_api_key: process.env.GROQ_API_KEY ? 'SET' : 'NOT SET',
    groq_api_key_length: process.env.GROQ_API_KEY?.length || 0,
    node_env: process.env.NODE_ENV,
    error: null
  };

  try {
    // Try to require groq
    const Groq = require('groq-sdk');
    debug.groq_loaded = true;
    
    if (process.env.GROQ_API_KEY) {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      debug.groq_instance_created = true;
    } else {
      debug.error = 'GROQ_API_KEY is not set';
    }
  } catch (error) {
    debug.error = error.message;
    debug.error_stack = error.stack;
  }

  return res.status(200).json(debug);
};
