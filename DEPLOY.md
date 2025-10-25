# 🚀 Quick Deploy Guide

## Deploy su Vercel in 5 minuti

### Passo 1: Installa Dipendenze
```bash
npm install
```

### Passo 2: Crea File .env
Crea un file `.env` nella root del progetto:
```env
OPENAI_API_KEY=sk-your-key-here
API_MASTER_KEY=your-secure-master-key-123
NODE_ENV=production
```

### Passo 3: Deploy su Vercel

**Opzione A: Tramite CLI**
```bash
# Installa Vercel CLI (se non hai)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Opzione B: Tramite GitHub (Consigliato)**
1. Crea un repo su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Importa il tuo repo GitHub
4. Aggiungi le environment variables nel dashboard Vercel
5. Deploy automatico!

### Passo 4: Ottieni URL API

Vercel ti darà un URL tipo:
```
https://your-api-name.vercel.app
```

Testa l'API:
```bash
curl https://your-api-name.vercel.app/api
```

### Passo 5: Setup su RapidAPI

1. Vai su [rapidapi.com](https://rapidapi.com)
2. Clicca su "My APIs" → "Add New API"
3. Inserisci questi dati:

**Base URL:**
```
https://your-api-name.vercel.app
```

**Endpoints:**
- `POST /api/generate-text`
- `POST /api/analyze-performance`

**Headers Richiesti:**
```
Authorization: Bearer YOUR_API_KEY
```

**Pricing Plans:**
- **FREE**: 100 req/hour
- **BASIC**: 500 req/hour - $9/mese
- **PRO**: 2000 req/hour - $29/mese  
- **ULTRA**: 10000 req/hour - $99/mese

## 🎯 Test Locale

Prima di deployare, testa localmente:

```bash
# Sviluppo locale
npm run dev

# Testa l'API
curl http://localhost:3000/api
```

## ⚡ Variabili Environment su Vercel

Nel dashboard Vercel, aggiungi:
- `OPENAI_API_KEY` - La tua OpenAI key
- `API_MASTER_KEY` - Una chiave segreta (genera con: `openssl rand -hex 32`)

## 📊 Monitoraggio

Vercel ti dà automaticamente:
- Analytics delle chiamate API
- Logs in tempo reale
- Performance metrics

## 🔒 Sicurezza

- ✅ API key validation
- ✅ Rate limiting
- ✅ CORS configurato
- ✅ Error handling robusto

## 🎉 Pronto!

La tua API è live e pronta per RapidAPI! 🚀
