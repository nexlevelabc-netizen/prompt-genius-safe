// BACKEND/services/aiService.js
require('dotenv').config();
const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Anthropic = require('@anthropic-ai/sdk');

// Initialize AI services
class AIService {
  constructor() {
    // OpenAI Configuration
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Gemini Configuration
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Claude Configuration (optional)
    this.claude = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
  }

  /**
   * Generate content using OpenAI (GPT-4 Turbo)
   */
  async generateWithOpenAI(prompt, options = {}) {
    try {
      const {
        model = 'gpt-4-turbo-preview', // CHANGED: gpt-3.5-turbo → gpt-4-turbo-preview
        temperature = 0.7,
        max_tokens = 2000,
        systemMessage = "You are a helpful AI assistant. Provide detailed, well-formatted responses."
      } = options;

      console.log(`Generating with OpenAI (${model})...`);

      const response = await this.openai.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature,
        max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const content = response.choices[0]?.message?.content || '';
      
      return {
        success: true,
        content,
        provider: 'openai',
        model: model,
        tokens: response.usage?.total_tokens || 0,
        wordCount: content.split(/\s+/).length
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

  /**
   * Generate content using Gemini
   */
  async generateWithGemini(prompt, options = {}) {
    try {
      const {
        model = 'gemini-pro', // You can change this to 'gemini-pro-vision' if needed
        temperature = 0.7,
        maxOutputTokens = 2000
      } = options;

      console.log(`Generating with Gemini (${model})...`);

      const genModel = this.gemini.getGenerativeModel({ model });
      
      const result = await genModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens,
          topP: 0.95,
          topK: 40
        }
      });

      const content = result.response?.text() || '';
      
      return {
        success: true,
        content,
        provider: 'gemini',
        model: model,
        wordCount: content.split(/\s+/).length
      };
    } catch (error) {
      console.error('Gemini Error:', error.message);
      return {
        success: false,
        error: error.message,
        provider: 'gemini'
      };
    }
  }

  /**
   * Generate content using Claude (optional)
   */
  async generateWithClaude(prompt, options = {}) {
    try {
      const {
        model = 'claude-3-opus-20240229',
        temperature = 0.7,
        max_tokens = 2000
      } = options;

      console.log(`Generating with Claude (${model})...`);

      const message = await this.claude.messages.create({
        model,
        max_tokens,
        temperature,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = message.content[0]?.text || '';
      
      return {
        success: true,
        content,
        provider: 'claude',
        model: model,
        tokens: message.usage?.input_tokens + message.usage?.output_tokens || 0,
        wordCount: content.split(/\s+/).length
      };
    } catch (error) {
      console.error('Claude Error:', error.message);
      return {
        success: false,
        error: error.message,
        provider: 'claude'
      };
    }
  }

  /**
   * Main method to generate AI content
   */
  async generateAI(prompt, provider = 'openai', options = {}) {
    switch (provider.toLowerCase()) {
      case 'openai':
        return await this.generateWithOpenAI(prompt, options);
      case 'gemini':
        return await this.generateWithGemini(prompt, options);
      case 'claude':
        return await this.generateWithClaude(prompt, options);
      default:
        return await this.generateWithOpenAI(prompt, options);
    }
  }

  /**
   * Check API health
   */
  async checkHealth() {
    const services = {
      openai: false,
      gemini: false,
      claude: false
    };

    try {
      // Check OpenAI
      await this.openai.models.list();
      services.openai = true;
    } catch (error) {
      console.log('OpenAI health check failed:', error.message);
    }

    try {
      // Check Gemini
      await this.gemini.getGenerativeModel({ model: 'gemini-pro' });
      services.gemini = true;
    } catch (error) {
      console.log('Gemini health check failed:', error.message);
    }

    try {
      // Check Claude
      if (this.claude && process.env.CLAUDE_API_KEY) {
        await this.claude.messages.create({
          model: 'claude-3-opus-20240229',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'test' }]
        });
        services.claude = true;
      }
    } catch (error) {
      console.log('Claude health check failed:', error.message);
    }

    return services;
  }
}

module.exports = new AIService();