module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const response = {
    name: 'AI Text Generator Pro API',
    version: '1.0.0',
    status: 'operational',
    description: 'Professional AI-powered text generation API',
    endpoints: {
      '/api/generate-text': {
        method: 'POST',
        description: 'Generate marketing copy, social media posts, and other text content',
        parameters: {
          type: 'string - Type of content (e.g., "social post", "email subject", "ad copy")',
          input: 'string - Product description or content to generate',
          tone: 'string - Tone (professional, casual, friendly, persuasive)',
          length: 'string - Length (short, medium, long)',
          language: 'string - Language code (en, it, es, fr, de)',
          variants: 'number - Number of variants (1-5)',
          keywords: 'array - Keywords to include',
          audience: 'string - Target audience',
          platform: 'string - Platform (facebook, instagram, twitter, all)',
          speed: 'string - Speed mode (fast, balanced, quality)',
          temperature: 'number - Creativity (0-1)'
        }
      },
      '/api/analyze-performance': {
        method: 'POST',
        description: 'Analyze text performance metrics',
        parameters: {
          text: 'string - Text to analyze',
          platform: 'string - Target platform',
          language: 'string - Language code'
        }
      }
    },
    pricing: {
      free: '100 requests/hour',
      basic: '500 requests/hour - $9/month',
      pro: '2000 requests/hour - $29/month',
      ultra: '10000 requests/hour - $99/month'
    },
    rapidapi: 'https://rapidapi.com',
    documentation: 'https://your-docs-url.com'
  };

  return res.status(200).json(response);
};
