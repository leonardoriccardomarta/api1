// Test script per l'API
// Esegui: node test-api.js

const API_URL = 'http://localhost:3000'; // Cambia con il tuo URL Vercel dopo deploy
const API_KEY = 'test-key-123'; // Usa la tua API_MASTER_KEY

async function testAPI() {
  console.log('🧪 Testing API...\n');

  // Test 1: Health Check
  try {
    console.log('1️⃣ Testing GET /api...');
    const healthRes = await fetch(`${API_URL}/api`);
    const healthData = await healthRes.json();
    console.log('✅ Status:', healthRes.status);
    console.log('📦 Response:', JSON.stringify(healthData, null, 2));
    console.log('');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 2: Generate Text
  try {
    console.log('2️⃣ Testing POST /api/generate-text...');
    const generateRes = await fetch(`${API_URL}/api/generate-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        type: 'social post',
        input: 'Nuova app AI per content creators',
        tone: 'friendly',
        length: 'short',
        platform: 'instagram',
        variants: 2
      })
    });

    const generateData = await generateRes.json();
    console.log('✅ Status:', generateRes.status);
    console.log('📦 Response:', JSON.stringify(generateData, null, 2));
    console.log('');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 3: Analyze Performance
  try {
    console.log('3️⃣ Testing POST /api/analyze-performance...');
    const analyzeRes = await fetch(`${API_URL}/api/analyze-performance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        text: '🚀 Introducing our revolutionary new product! Get 50% off today only!',
        platform: 'facebook',
        language: 'en'
      })
    });

    const analyzeData = await analyzeRes.json();
    console.log('✅ Status:', analyzeRes.status);
    console.log('📦 Response:', JSON.stringify(analyzeData, null, 2));
    console.log('');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('✅ All tests completed!');
}

// Run tests
testAPI().catch(console.error);
