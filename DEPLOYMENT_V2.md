# Resume Organizer V2 - Deployment Guide

## What's New in V2

- ✨ Modern card-based UI with sidebar navigation
- 🎨 Purple/teal gradient design
- 👁️ Live preview panel
- 📝 Integrated Word export
- 🤖 AI-powered resume parsing
- 📄 Professional PDF export

## Files to Upload to GitHub/Railway

Upload these files to your repository:

1. **resume-organizer-v2.html** - New modern UI
2. **server.js** - Updated backend (already has Word export)
3. **package.json** - Dependencies (already has docx library)
4. **.env** - Your GROQ_API_KEY (don't commit this!)

## Deployment Steps

### Option 1: Update Existing Railway Deployment

```bash
# In your website_resume folder
git add resume-organizer-v2.html server.js
git commit -m "Add modern v2 design with integrated AI parsing and Word export"
git push origin master
```

Railway will automatically:
- Detect the changes
- Install dependencies (docx, express, cors, dotenv)
- Redeploy in ~2-3 minutes

### Option 2: Test Locally First

```bash
cd /path/to/website_resume
npm install
node server.js
```

Then open: `http://localhost:3000/resume-organizer-v2.html`

## How to Use V2

1. **Set Up Profile**
   - Click "⚙️ Profile" button
   - Enter your name, email, phone, LinkedIn
   - Add professional summary
   - Click Save

2. **Upload Your Resume (AI Parsing)**
   - Click "📤 Upload Resume"
   - Select your PDF or DOCX resume
   - AI will extract all information automatically
   - Review the parsed items in each section

3. **Curate Your Resume**
   - Switch between tabs (Experience, Education, Courses, etc.)
   - Click "Add to Export" on items you want to include
   - See live preview update on the right

4. **Export**
   - **Word**: Click "📝 Download Word" - generates professional .docx
   - **PDF**: Click "📄 Download PDF" - prints to PDF with proper formatting

## Features

### AI Resume Parsing
- Supports PDF and DOCX uploads
- Extracts: work experience, education, skills, leadership
- Uses Groq's Llama 3.3 70B model
- Automatically categorizes items

### Word Export
- Professional Times New Roman formatting
- Reverse chronological order (latest first)
- Proper bullet point separation
- US Letter size with 1-inch margins
- Company names, locations, titles, dates properly formatted

### Live Preview
- See your resume update in real-time
- Exactly how it will look when exported
- Located in right panel

## Comparison: V1 vs V2

| Feature | V1 (portfolio-organizer.html) | V2 (resume-organizer-v2.html) |
|---------|-------------------------------|-------------------------------|
| UI Style | Tab-based | Card-based with sidebar |
| Live Preview | Hidden until "Together" tab | Always visible (right panel) |
| Navigation | Top tabs | Sidebar menu |
| Add to Resume | Click item card | "Add to Export" button |
| Design | Basic gradient | Modern purple/teal |
| Mobile | Responsive tabs | Collapsible sidebar |

## Troubleshooting

**Word export not working:**
- Make sure server is running
- Check Railway logs for errors
- Verify `docx` package is installed

**AI upload failing:**
- Check GROQ_API_KEY is set in Railway environment variables
- Verify file is PDF or DOCX format
- Check Railway logs for parsing errors

**Preview not updating:**
- Make sure you clicked "Add to Export"
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R)

## Next Steps

After deploying:
1. Visit your Railway URL + `/resume-organizer-v2.html`
2. Test the profile setup
3. Upload a resume to test AI parsing
4. Export to Word and PDF
5. Share your deployed URL!

Your Railway URL should be: `https://portfolio-organizer-production.up.railway.app/resume-organizer-v2.html`
