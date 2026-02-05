// Backend Server for Resume Organizer
// This keeps your Groq API key safe and allows anyone to use the tool

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat,
         Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign } from 'docx';

dotenv.config();

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

// Generate Word document endpoint
app.post('/api/generate-docx', async (req, res) => {
    try {
        const { profile, sections } = req.body;

        if (!profile || !sections) {
            return res.status(400).json({ error: 'Profile and sections are required' });
        }

        // Create numbering config for bullets
        const numberingConfig = {
            config: [{
                reference: "bullets",
                levels: [{
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: "•",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 }
                        }
                    }
                }]
            }]
        };

        // Build document sections
        const docSections = [];

        // Header with name and contact info
        if (profile.name) {
            docSections.push(
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: profile.name.toUpperCase(),
                            bold: true,
                            font: "Times New Roman",
                            size: 22 // 11pt
                        })
                    ],
                    spacing: { after: 120 }
                })
            );
        }

        // Contact line
        const contactParts = [];
        if (profile.email) contactParts.push(profile.email);
        if (profile.phone) contactParts.push(profile.phone);
        if (profile.linkedin) contactParts.push(profile.linkedin);

        if (contactParts.length > 0) {
            docSections.push(
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: contactParts.join(' | '),
                            font: "Times New Roman",
                            size: 20 // 10pt
                        })
                    ],
                    spacing: { after: 120 }
                })
            );
        }

        // Professional summary
        if (profile.summary) {
            docSections.push(
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: profile.summary,
                            italics: true,
                            font: "Times New Roman",
                            size: 20 // 10pt
                        })
                    ],
                    spacing: { after: 200 }
                })
            );
        }

        // Add each section
        sections.forEach((section, sectionIndex) => {
            // Section header
            docSections.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: section.title.toUpperCase(),
                            bold: true,
                            font: "Times New Roman",
                            size: 22 // 11pt
                        })
                    ],
                    spacing: { before: 200, after: 120 },
                    border: {
                        bottom: {
                            color: "000000",
                            space: 1,
                            style: "single",
                            size: 6
                        }
                    }
                })
            );

            // Section items - using table format like template
            section.items.forEach((item, itemIndex) => {
                const tableRows = [];

                // Row 1: Company/School and Location
                tableRows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 70, type: WidthType.PERCENTAGE },
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
                                          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                                children: [new Paragraph({
                                    children: [new TextRun({
                                        text: item.company || item.school || '',
                                        font: "Times New Roman",
                                        size: 20
                                    })]
                                })]
                            }),
                            new TableCell({
                                width: { size: 30, type: WidthType.PERCENTAGE },
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
                                          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                                children: [new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [new TextRun({
                                        text: item.location || '',
                                        bold: true,
                                        font: "Times New Roman",
                                        size: 20
                                    })]
                                })]
                            })
                        ]
                    })
                );

                // Row 2: Title/Degree and Date
                tableRows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 70, type: WidthType.PERCENTAGE },
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
                                          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                                children: [new Paragraph({
                                    children: [new TextRun({
                                        text: item.title || item.degree || '',
                                        italics: true,
                                        font: "Times New Roman",
                                        size: 20
                                    })]
                                })]
                            }),
                            new TableCell({
                                width: { size: 30, type: WidthType.PERCENTAGE },
                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
                                          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                                children: [new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [new TextRun({
                                        text: item.date || '',
                                        font: "Times New Roman",
                                        size: 20
                                    })]
                                })]
                            })
                        ]
                    })
                );

                // Row 3: Bullets (spanning full width)
                if (item.description) {
                    const bullets = item.description
                        .split(/\.\s+/)
                        .map(b => b.trim())
                        .filter(b => b && b.length > 10);

                    const bulletParagraphs = bullets.map(bullet => {
                        let bulletText = bullet;
                        if (!bulletText.endsWith('.')) {
                            bulletText += '.';
                        }
                        return new Paragraph({
                            numbering: { reference: "bullets", level: 0 },
                            children: [new TextRun({
                                text: bulletText,
                                font: "Times New Roman",
                                size: 20
                            })],
                            spacing: { after: 60 }
                        });
                    });

                    tableRows.push(
                        new TableRow({
                            children: [
                                new TableCell({
                                    columnSpan: 2,
                                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
                                              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                                    children: bulletParagraphs
                                })
                            ]
                        })
                    );
                }

                // Add the table
                docSections.push(
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: tableRows,
                        margins: { top: 60, bottom: 180, left: 0, right: 0 }
                    })
                );
            });
        });

        // Create document
        const doc = new Document({
            numbering: numberingConfig,
            sections: [{
                properties: {
                    page: {
                        size: {
                            width: 12240,  // 8.5 inches (US Letter)
                            height: 15840  // 11 inches
                        },
                        margin: {
                            top: 1440,    // 1 inch
                            right: 1440,
                            bottom: 1440,
                            left: 1440
                        }
                    }
                },
                children: docSections
            }]
        });

        // Generate buffer
        const buffer = await Packer.toBuffer(doc);

        // Send as downloadable file
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.docx"');
        res.send(buffer);

    } catch (error) {
        console.error('DOCX generation error:', error);
        res.status(500).json({
            error: 'Failed to generate Word document: ' + error.message
        });
    }
});

// Redirect root to new version
app.get('/', (req, res) => {
    res.redirect('/resume-organizer-v2.html');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`
🚀 Resume Organizer Server Running!
📍 Server: http://localhost:${PORT}
📄 App: http://localhost:${PORT}/resume-organizer-v2.html
🔑 API Key: ${process.env.GROQ_API_KEY ? 'Configured ✓' : 'Missing ✗'}

Ready to accept resume uploads and generate Word documents!
    `);
});
