const Groq = require('groq-sdk');

// Check for API key
const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('ERROR: GROQ_API_KEY not found in environment variables');
}

const groq = new Groq({ 
  apiKey: apiKey
});

// Ultra-fast models - Groq specific (updated Oct 2025)
const MODELS = {
  ultra_fast: 'mixtral-8x7b-instruct',  // Updated model name
  fast: 'llama-3.1-70b-versatile',
  balanced: 'mixtral-8x7b-instruct',
  quality: 'llama-3.1-70b-versatile'
};

async function generateFromModel(prompt, opts = {}) {
  try {
    // Check if API key is configured
    if (!apiKey) {
      throw new Error('GROQ_API_KEY not configured. Please set GROQ_API_KEY environment variable.');
    }
    
    // Use the fastest model by default
    const model = MODELS[opts.speed] || MODELS.ultra_fast || MODELS.fast;
    
    console.log('Attempting to generate with model:', model);
    
    const response = await groq.chat.completions.create({
      model: model,
      messages: [
        { 
          role: 'system', 
          content: opts.systemPrompt || 'You are a world-class AI copywriter. Generate high-quality, conversion-optimized content that drives results.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: opts.max_tokens || 800,
      temperature: opts.temperature || 0.7,
      top_p: opts.top_p || 0.9,
      stream: false
    });

    return {
      text: response.choices[0]?.message?.content || '',
      usage: response.usage,
      model: response.model,
      finish_reason: response.choices[0]?.finish_reason
    };
  } catch (error) {
    console.error('Groq API Error:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

module.exports = { generateFromModel, MODELS };
