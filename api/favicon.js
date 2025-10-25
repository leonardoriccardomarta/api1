module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#gradient)"/>
  <text x="50" y="70" font-size="60" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif">⚡</text>
</svg>`;
  
  return res.status(200).send(svg);
};
