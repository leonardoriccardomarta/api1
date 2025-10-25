module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Lightning bolt -->
  <text x="200" y="450" font-size="280" fill="white" font-weight="bold" filter="url(#shadow)" font-family="system-ui, -apple-system, sans-serif">⚡</text>
  
  <!-- Title -->
  <text x="450" y="280" font-size="72" fill="white" font-weight="bold" font-family="system-ui, -apple-system, sans-serif">AI Text Generator</text>
  <text x="450" y="360" font-size="64" fill="rgba(255,255,255,0.95)" font-weight="bold" font-family="system-ui, -apple-system, sans-serif">World's Fastest API</text>
  
  <!-- Subtitle -->
  <text x="450" y="430" font-size="32" fill="rgba(255,255,255,0.85)" font-family="system-ui, -apple-system, sans-serif">300ms Response • Zero Cost • Multi-Language</text>
  
  <!-- Badge -->
  <rect x="450" y="460" width="250" height="60" rx="30" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <text x="575" y="505" font-size="24" fill="white" font-weight="600" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">⚡ Powered by Groq</text>
  
  <!-- Bottom decoration -->
  <circle cx="1000" cy="500" r="120" fill="rgba(255,255,255,0.05)"/>
  <circle cx="1100" cy="550" r="80" fill="rgba(255,255,255,0.05)"/>
</svg>`;
  
  return res.status(200).send(svg);
};
