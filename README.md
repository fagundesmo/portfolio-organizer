# 📚 Portfolio Organizer

AI-powered resume organizer that helps you create professional portfolios by combining courses, work experience, and activities.

## ✨ Features

- 🤖 **AI-Powered Resume Parsing** - Upload any resume (PDF/DOCX) and AI extracts everything automatically
- 📝 **Drag & Drop Interface** - Organize your courses and experience visually
- 🔄 **Section Reordering** - Drag entire sections to reorder them in your portfolio
- 📄 **Professional PDF Export** - Export as a clean, formatted PDF resume
- 📝 **Word Document Export** - Generate properly formatted .docx files with separate bullet points
- ✏️ **Edit & Delete** - Modify or remove any item
- 🏷️ **Custom Tabs** - Create tabs for any category (Skills, Projects, etc.)
- 🔒 **Secure API** - Backend server keeps your Groq API key safe

## 🚀 Quick Start

### **Local Development**

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/portfolio-organizer.git
cd portfolio-organizer
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Groq API key to `.env`:
```
GROQ_API_KEY=gsk_your_key_here
```

5. Start the server:
```bash
npm start
```

6. Open browser:
```
http://localhost:3000/portfolio-organizer.html
```

## 🌐 Deploy to Cloud

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed deployment instructions for:
- Railway (recommended)
- Render
- Vercel

## 🔑 Get a Free Groq API Key

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up (free!)
3. Create an API key
4. Add it to your `.env` file

## 📖 How to Use

1. **Add Profile Info** - Click "⚙️ Profile" to add your name, email, LinkedIn, etc.
2. **Upload Resume** - Click "📤 Upload Resume" and let AI extract everything
3. **Or Add Manually** - Use "+ Add" buttons to create items manually
4. **Organize** - Click items to select them for your portfolio
5. **Reorder** - In "Together" tab, drag sections to reorder
6. **Export** - Click "📄 Export as PDF" or "📝 Export as Word" to download your resume

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express
- **AI**: Groq API (Llama 3.3 70B)
- **PDF Parsing**: PDF.js
- **DOCX Parsing**: Mammoth.js

## 📂 Project Structure

```
portfolio-organizer/
├── portfolio-organizer.html  # Main application
├── server.js                 # Backend API server
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── SETUP_GUIDE.md           # Deployment guide
└── README.md                # This file
```

## 🔒 Security

- API keys stored in `.env` (never committed)
- Backend server keeps keys secure
- Users never see your API key
- CORS enabled for local development

## 📝 License

MIT License - feel free to use for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

## 💬 Support

Questions? Open an issue or contact: mfagundes.ufma@gmail.com

---

Built with ❤️ using Claude AI
