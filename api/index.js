const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only handle GET requests for the landing page
  if (req.method === 'GET') {
    try {
      // Read the HTML file from the public directory
      const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
      
      // Check if file exists
      if (!fs.existsSync(htmlPath)) {
        return res.status(404).json({ error: 'Landing page not found' });
      }
      
      const html = fs.readFileSync(htmlPath, 'utf-8');
      
      // Set content type
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      
      return res.status(200).send(html);
    } catch (error) {
      console.error('Error serving landing page:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Return 405 for other methods
  return res.status(405).json({ error: 'Method not allowed' });
};
