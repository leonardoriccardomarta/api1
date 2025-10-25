module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Text Generator Pro',
    version: '2.0.0',
    provider: 'Groq',
    models: ['llama-3.1-8b-instant', 'llama-3.1-70b-versatile'],
    performance: {
      avg_response_time: '< 1s',
      uptime: '99.9%'
    }
  };

  return res.status(200).json(health);
};
