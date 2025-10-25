const { generateFromModel } = require('./_utils/groqClient');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const result = {
    timestamp: new Date().toISOString(),
    step: 'starting',
    error: null,
    success: false
  };

  try {
    result.step = 'calling generateFromModel';
    
    const response = await generateFromModel('Say hello in one sentence.', {
      max_tokens: 50,
      speed: 'ultra_fast'
    });

    result.step = 'success';
    result.success = true;
    result.response = {
      text: response.text,
      model: response.model,
      usage: response.usage
    };

  } catch (error) {
    result.step = 'error';
    result.error = error.message;
    result.error_stack = error.stack;
  }

  return res.status(200).json(result);
};
