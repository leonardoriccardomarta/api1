const { json } = require('micro');
const { generateFromModel } = require('./_utils/groqClient');
const requireApiKey = require('./_utils/auth');
const { rateLimit } = require('./_utils/rateLimiter');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  // Authentication
  const authOk = requireApiKey(req, res);
  if (!authOk) return;

  // Rate limiting (adjusted for RapidAPI usage)
  const plan = req.headers['x-rapidapi-subscription'] || 'free';
  const limits = {
    free: { limit: 100, windowMs: 60 * 1000 },
    basic: { limit: 500, windowMs: 60 * 1000 },
    pro: { limit: 2000, windowMs: 60 * 1000 },
    ultra: { limit: 10000, windowMs: 60 * 1000 }
  };
  const rateLimitConfig = limits[plan] || limits.free;
  if (!rateLimit(req, res, rateLimitConfig)) return;

  try {
    const body = await json(req);
    const { 
      type = 'marketing copy',
      input,
      tone = 'professional',
      length = 'medium',
      language = 'en',
      variants = 1,
      keywords = [],
      audience = 'general',
      platform = 'all',
      speed = 'balanced',
      temperature = 0.7
    } = body;

    // Validation
    if (!input) {
      return res.status(400).json({ error: 'input is required' });
    }

    // Build optimized prompt
    function buildPrompt(variantIndex) {
      let prompt = `Generate a ${length} ${type} in ${language}. `;
      prompt += `Tone: ${tone}. `;
      prompt += `Target audience: ${audience}. `;
      
      if (platform !== 'all') {
        prompt += `Platform: ${platform}. `;
      }
      
      if (keywords && keywords.length) {
        prompt += `Include these keywords naturally: ${keywords.join(', ')}. `;
      }
      
      prompt += `\n\nContent to generate:\n${input}`;
      
      if (variants > 1) {
        prompt += `\n\nThis is variant ${variantIndex} of ${variants}. Make it unique while maintaining quality.`;
      }
      
      return prompt;
    }

    // Generate variants
    const results = [];
    const maxVariants = Math.min(variants, 5);
    
    for (let i = 0; i < maxVariants; i++) {
      const prompt = buildPrompt(i + 1);
      const startTime = Date.now();
      
      const response = await generateFromModel(prompt, {
        max_tokens: length === 'long' ? 1200 : length === 'medium' ? 600 : 300,
        speed: speed,
        temperature: temperature
      });

      const generationTime = Date.now() - startTime;

      results.push({
        variant_number: i + 1,
        text: response.text.trim(),
        metadata: {
          model: response.model,
          tokens_used: response.usage?.total_tokens || 0,
          generation_time_ms: generationTime,
          length: response.text.length
        }
      });
    }

    return res.status(200).json({
      success: true,
      results,
      total_variants: results.length,
      metadata: {
        type,
        tone,
        length,
        language,
        audience,
        platform
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      error: 'Text generation failed',
      message: error.message
    });
  }
};
