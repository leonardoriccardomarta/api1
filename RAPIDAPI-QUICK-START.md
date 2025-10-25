# 🚀 Quick Setup Guide - RapidAPI

## STEP 1: Create New API
1. Vai su https://rapidapi.com/hub
2. Click "My APIs" → "Add New API"

## STEP 2: Fill Basic Info

### Configuration Tab
**Description**:
```
World's fastest AI text generator powered by Groq. Generate marketing copy, social media posts, emails in sub-second with ZERO infrastructure costs.
```

**Categories**: 
- AI & Machine Learning
- Text Generation

**Tags**:
```
ai, text generation, groq, fastest ai, marketing, copywriting, content generation
```

## STEP 3: Add Authorization

Click **"Add Authorization"**:

**Name**: `API Key`  
**Type**: `Header`  
**Key Name**: `Authorization`  
**Value**: `Bearer YOUR_API_KEY`

## STEP 4: Add Endpoints

### ENDPOINT 1: Generate Text

**Configuration Tab**:
- **Name**: `Generate Text`
- **Method**: `POST`

**Headers Tab**:
- `Content-Type`: `application/json`

**Body Tab** (JSON):
```json
{
  "input": "Marketing post for headphones",
  "type": "social post",
  "tone": "professional",
  "language": "en",
  "variants": 3
}
```

**URL Tab**:
```
https://api1-silk.vercel.app/api/generate-text
```

### ENDPOINT 2: Analyze Performance

**URL Tab**:
```
https://api1-silk.vercel.app/api/analyze-performance
```

Method: POST

Body:
```json
{
  "text": "Your marketing text here"
}
```

### ENDPOINT 3: Health Check

**URL Tab**:
```
https://api1-silk.vercel.app/api/health
```

Method: GET

## STEP 5: Configure Pricing

**Configuration** → **Pricing**:

- **Free**: $0, 100 req/min
- **Basic**: $9/mese, 500 req/min
- **Pro**: $29/mese, 2000 req/min
- **Ultra**: $99/mese, 10000 req/min

## STEP 6: Add Thumbnail

**Thumbnail URL**:
```
https://api1-silk.vercel.app/thumbnail.svg
```

## STEP 7: Test

Click "Test" su ogni endpoint per verificare che funzioni!

## STEP 8: Publish

Click "Submit for Review"

✅ **FATTO!** Attendi 24-48h per l'approvazione.
