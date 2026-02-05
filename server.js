// Backend Server for Portfolio Organizer
// This keeps your Groq API key safe and allows anyone to use the tool

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.')); // Serve the HTML files

// Parse resume endpoint
app.post('/api/parse-resume', async (req, res) => {
    try {
        const { resumeText } = req.body;

        if (!resumeText) {
            return res.status(400).json({ error: 'Resume text is required' });
        }

        // Your Groq API key from environment variable
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Server not configured with API key' });
        }

        const prompt = `You are a resume parser. Extract work experience, education, skills, and other sections from this resume. Return ONLY valid JSON (no markdown, no explanations) in this exact format:

{
  "profile": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "123-456-7890",
    "linkedin": "linkedin.com/in/username",
    "summary": "Professional summary"
  },
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "location": "City, State",
      "date": "Month YYYY - Month YYYY",
      "description": "Bullet point 1. Bullet point 2. Bullet point 3."
    }
  ],
  "education": [
    {
      "school": "University Name",
      "degree": "Degree Name",
      "location": "City, State",
      "date": "Month YYYY",
      "description": "Details about degree, honors, etc."
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "leadership": ["Activity 1", "Activity 2"]
}

Resume text:
${resumeText}`;

        // Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                temperature: 0.1,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API error:', errorText);
            return res.status(response.status).json({
                error: `Groq API error: ${response.statusText}`
            });
        }

        const result = await response.json();
        const content = result.choices[0].message.content;

        // Parse JSON response
        const parsed = JSON.parse(content);

        res.json({ success: true, data: parsed });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Failed to parse resume: ' + error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`
🚀 Portfolio Organizer Server Running!
📍 Server: http://localhost:${PORT}
📄 App: http://localhost:${PORT}/portfolio-organizer.html
🔑 API Key: ${process.env.GROQ_API_KEY ? 'Configured ✓' : 'Missing ✗'}

Ready to accept resume uploads!
    `);
});
