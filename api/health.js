module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Text Generator Pro',
    version: '2.0.0',
    provider: 'Groq',
    models: ['mixtral-8x7b-32768', 'llama-3-70b-8192'],
    performance: {
      avg_response_time: '< 1s',
      uptime: '99.9%'
    }
  };

  return res.status(200).json(health);
};
