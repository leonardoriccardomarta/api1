const { json } = require('micro');
const requireApiKey = require('./_utils/auth');
const { rateLimit } = require('./_utils/rateLimiter');
const { generateFromModel } = require('./_utils/groqClient');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  if (!requireApiKey(req, res)) return;
  if (!rateLimit(req, res, { limit: 200, windowMs: 60 * 1000 })) return;

  try {
    const body = await json(req);
    const { text, platform = 'facebook', language = 'en' } = body;

    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    // Build analysis prompt
    const prompt = `Analyze the following marketing copy for performance metrics on ${platform}.
    
Copy to analyze:
${text}

Provide a JSON response with:
- engagement_score (0-1): Expected engagement rate
- seo_score (0-1): SEO optimization level
- readability_score (0-1): Ease of reading
- conversions_score (0-1): Conversion potential
- recommendations: Array of 3 specific improvement suggestions
- strengths: Array of 2-3 key strengths

Respond only with valid JSON.`;

    const response = await generateFromModel(prompt, {
      max_tokens: 400,
      temperature: 0.3,
      systemPrompt: 'You are a marketing performance analyst. Provide structured, data-driven insights.'
    });

    // Try to parse JSON response
    let analysis = {};
    try {
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback for non-JSON responses
        analysis = { raw_analysis: response.text };
      }
    } catch (parseError) {
      analysis = { raw_analysis: response.text };
    }

    // Add basic heuristics if AI scores are missing
    if (!analysis.engagement_score) {
      const wordCount = text.split(/\s+/).length;
      const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}]/u.test(text);
      const hasQuestion = /\?/.test(text);
      
      analysis.engagement_score = Math.min(1, (hasEmoji ? 0.3 : 0) + (hasQuestion ? 0.2 : 0) + (wordCount < 30 ? 0.2 : 0) + (wordCount < 15 ? 0.3 : 0));
      analysis.seo_score = /#[a-z0-9]+/i.test(text) && wordCount > 50 ? 0.8 : 0.5;
    }

    return res.status(200).json({
      success: true,
      platform,
      language,
      analysis,
      metadata: {
        text_length: text.length,
        word_count: text.split(/\s+/).length,
        model: response.model
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
};
