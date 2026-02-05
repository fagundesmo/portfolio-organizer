# Portfolio Organizer - Backend Setup Guide

## 📋 What This Does

This backend server:
- ✅ Keeps your Groq API key **secure** (never exposed to users)
- ✅ Allows **anyone** to use the Portfolio Organizer
- ✅ Handles AI resume parsing on the server
- ✅ Easy to deploy to the cloud

---

## 🚀 Step-by-Step Setup

### **Step 1: Install Node.js**

1. Go to [nodejs.org](https://nodejs.org)
2. Download and install Node.js (LTS version)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### **Step 2: Get Your Groq API Key**

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up (it's free!)
3. Click "Create API Key"
4. Copy the key (starts with `gsk_...`)

### **Step 3: Set Up the Server**

1. Open a terminal in the `website_resume` folder
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your API key:
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

### **Step 4: Run the Server**

Start the server:
```bash
npm start
```

You should see:
```
🚀 Portfolio Organizer Server Running!
📍 Server: http://localhost:3000
📄 App: http://localhost:3000/portfolio-organizer.html
🔑 API Key: Configured ✓
```

### **Step 5: Test It**

1. Open your browser
2. Go to: `http://localhost:3000/portfolio-organizer.html`
3. Upload a resume
4. The server will handle the AI parsing!

---

## 🌐 Deploy to the Internet (Free!)

### **Option A: Deploy to Railway (Easiest)**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Connect your GitHub account
5. Push your code to GitHub
6. Select your repository
7. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: Your Groq API key
8. Railway will deploy automatically!
9. You'll get a URL like: `https://your-app.railway.app`

### **Option B: Deploy to Render**

1. Go to [render.com](https://render.com)
2. Sign up
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: Your Groq API key
7. Click "Create Web Service"
8. You'll get a URL like: `https://your-app.onrender.com`

### **Option C: Deploy to Vercel**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts
4. Add environment variable in Vercel dashboard:
   - `GROQ_API_KEY` = your key
5. Redeploy: `vercel --prod`

---

## 🔒 Security Notes

- ✅ Your API key is stored in `.env` (never committed to Git)
- ✅ The `.env` file is in `.gitignore`
- ✅ Users never see your API key
- ✅ All parsing happens on your server

---

## 🆘 Troubleshooting

**Server won't start?**
- Make sure Node.js is installed
- Run `npm install` first
- Check that `.env` exists with your API key

**"API key missing" error?**
- Open `.env` file
- Make sure the key starts with `gsk_`
- No quotes or spaces around the key

**Can't access from other computers?**
- You need to deploy to the cloud (Railway, Render, or Vercel)
- Local server only works on your computer

---

## 📝 Next Steps

1. Update the Portfolio Organizer HTML to use the backend
2. Deploy to a cloud platform
3. Share the URL with anyone!

No one will ever see your API key, and everyone can use the AI-powered resume parsing!
