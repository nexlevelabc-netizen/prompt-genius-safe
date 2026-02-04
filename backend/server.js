// server.js - MEGA PROMPT GENERATOR WITH 20+ CATEGORIES
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow frontend connection
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// MEGA TEMPLATE DATABASE WITH 20+ CATEGORIES
const premiumTemplates = {
  // HEALTH & WELLNESS CATEGORY
  'health-article': {
    name: 'Health Article Writer',
    description: 'Create informative health and wellness articles',
    category: 'Health',
    subcategory: 'Articles',
    template: "Write a comprehensive 300-word health article about {topic} for {audience}. Focus on {focus}. Include {sections}. Tone: {tone}. Make it contextual and practical.",
    variables: ['topic', 'audience', 'focus', 'sections', 'tone']
  },
  
  'medical-advice': {
    name: 'Medical Advice Assistant',
    description: 'Generate medical advice and explanations',
    category: 'Health',
    subcategory: 'Advice',
    template: "Provide medical advice for {condition}. Include symptoms, prevention, and treatment options for {demographic}. Tone: {tone}. Important: Add disclaimer.",
    variables: ['condition', 'demographic', 'tone']
  },
  
  'fitness-routine': {
    name: 'Fitness Routine Planner',
    description: 'Create personalized fitness routines',
    category: 'Health',
    subcategory: 'Fitness',
    template: "Design a {duration} fitness routine for {fitnessLevel} focusing on {goals}. Include warmup, exercises, reps, and cooldown. Equipment: {equipment}. Tone: {tone}.",
    variables: ['duration', 'fitnessLevel', 'goals', 'equipment', 'tone']
  },
  
  // RELATIONSHIP & SOCIAL CATEGORY
  'dating-profile': {
    name: 'Dating Profile Writer',
    description: 'Craft compelling dating profiles',
    category: 'Relationship',
    subcategory: 'Dating',
    template: "Write a {platform} dating profile for a {gender} {age} interested in {interests}. Personality: {personality}. Looking for: {lookingFor}. Tone: {tone}.",
    variables: ['platform', 'gender', 'age', 'interests', 'personality', 'lookingFor', 'tone']
  },
  
  'conflict-resolution': {
    name: 'Conflict Resolution Guide',
    description: 'Generate scripts for relationship conflicts',
    category: 'Relationship',
    subcategory: 'Advice',
    template: "Create a conflict resolution script for {situation} between {parties}. Key issues: {issues}. Desired outcome: {outcome}. Tone: {tone}.",
    variables: ['situation', 'parties', 'issues', 'outcome', 'tone']
  },
  
  // IMAGE GENERATION CATEGORY
  'ai-image-prompt': {
    name: 'AI Image Prompt Generator',
    description: 'Create detailed prompts for AI image generation',
    category: 'Image Generation',
    subcategory: 'Prompts',
    template: "Create a detailed AI image prompt in the style of {style}. Subject: {subject}. Setting: {setting}. Lighting: {lighting}. Composition: {composition}. Mood: {mood}. Include technical details for {aiModel}.",
    variables: ['style', 'subject', 'setting', 'lighting', 'composition', 'mood', 'aiModel']
  },
  
  // Add the rest of your templates here...
  // Continue with your existing template database
};

// AI Service (simplified for deployment)
const aiService = {
  generateWithOpenAI: async (prompt) => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return {
        success: true,
        content: response.choices[0]?.message?.content || '',
        provider: 'openai',
        tokens: response.usage?.total_tokens || 0
      };
    } catch (error) {
      console.error('OpenAI Error:', error.message);
      return {
        success: false,
        error: error.message,
        provider: 'openai'
      };
    }
  }
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      openai: !!process.env.OPENAI_API_KEY,
      templates: Object.keys(premiumTemplates).length
    }
  });
});

app.get('/api/templates', (req, res) => {
  const templates = Object.entries(premiumTemplates).map(([id, template]) => ({
    id,
    ...template
  }));
  
  res.json({
    success: true,
    templates,
    total: templates.length,
    categories: [...new Set(templates.map(t => t.category))]
  });
});

app.post('/api/generate/premium', (req, res) => {
  try {
    const { templateId, variables } = req.body;
    
    if (!templateId || !premiumTemplates[templateId]) {
      return res.status(400).json({
        success: false,
        error: 'Template not found'
      });
    }
    
    const template = premiumTemplates[templateId];
    let prompt = template.template;
    
    // Replace variables in template
    Object.entries(variables || {}).forEach(([key, value]) => {
      prompt = prompt.replace(`{${key}}`, value);
    });
    
    res.json({
      success: true,
      prompt,
      template: {
        id: templateId,
        name: template.name,
        category: template.category,
        subcategory: template.subcategory
      },
      metadata: {
        wordCount: prompt.split(/\s+/).length,
        variablesUsed: Object.keys(variables || {}).length,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate prompt'
    });
  }
});

app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, provider = 'openai' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }
    
    const result = await aiService.generateWithOpenAI(prompt);
    
    if (result.success) {
      res.json({
        success: true,
        content: result.content,
        provider: result.provider,
        tokens: result.tokens,
        wordCount: result.content.split(/\s+/).length
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        provider: result.provider
      });
    }
    
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'AI generation failed'
    });
  }
});

app.post('/api/generate/complete', async (req, res) => {
  try {
    const { templateId, variables, provider = 'openai' } = req.body;
    
    // Generate prompt
    const template = premiumTemplates[templateId];
    let prompt = template.template;
    
    Object.entries(variables || {}).forEach(([key, value]) => {
      prompt = prompt.replace(`{${key}}`, value);
    });
    
    // Generate AI response
    const aiResult = await aiService.generateWithOpenAI(prompt);
    
    if (aiResult.success) {
      res.json({
        success: true,
        prompt,
        aiResponse: {
          content: aiResult.content,
          provider: aiResult.provider,
          tokens: aiResult.tokens,
          wordCount: aiResult.content.split(/\s+/).length
        },
        template: {
          id: templateId,
          name: template.name,
          category: template.category,
          subcategory: template.subcategory
        }
      });
    } else {
      res.status(500).json({
        success: false,
        error: aiResult.error
      });
    }
    
  } catch (error) {
    console.error('Complete Workflow Error:', error);
    res.status(500).json({
      success: false,
      error: 'Complete workflow failed'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Templates loaded: ${Object.keys(premiumTemplates).length}`);
  console.log(`🔑 OpenAI Status: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Missing API Key'}`);
});
