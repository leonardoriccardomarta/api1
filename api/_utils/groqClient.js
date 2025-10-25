const Groq = require('groq-sdk');

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY
});

// Ultra-fast models - Groq specific
const MODELS = {
  ultra_fast: 'mixtral-8x7b-32768',
  fast: 'llama-3-70b-8192',
  balanced: 'mixtral-8x7b-32768',
  quality: 'llama-3-70b-8192'
};

async function generateFromModel(prompt, opts = {}) {
  try {
    // Use the fastest model by default
    const model = MODELS[opts.speed] || MODELS.ultra_fast || MODELS.fast;
    
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
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

module.exports = { generateFromModel, MODELS };
