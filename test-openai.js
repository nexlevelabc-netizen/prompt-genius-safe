// BACKEND/test-openai.js
require('dotenv').config();
const aiService = require('./services/aiService');

async function testOpenAI() {
  console.log('Testing GPT-4 Turbo...');
  
  const prompt = "Write a short introduction about artificial intelligence in 100 words.";
  
  try {
    const result = await aiService.generateWithOpenAI(prompt, {
      model: 'gpt-4-turbo-preview',
      temperature: 0.7,
      max_tokens: 200
    });
    
    if (result.success) {
      console.log('✅ GPT-4 Turbo Test Successful!');
      console.log(`Model: ${result.model}`);
      console.log(`Tokens: ${result.tokens}`);
      console.log(`Word Count: ${result.wordCount}`);
      console.log('\nResponse:');
      console.log(result.content);
    } else {
      console.log('❌ GPT-4 Turbo Test Failed:');
      console.log(result.error);
    }
  } catch (error) {
    console.log('❌ Test Error:', error.message);
  }
}

// Also test Gemini
async function testGemini() {
  console.log('\n\nTesting Gemini Pro...');
  
  const prompt = "Explain machine learning in simple terms.";
  
  try {
    const result = await aiService.generateWithGemini(prompt, {
      model: 'gemini-pro',
      temperature: 0.7,
      maxOutputTokens: 200
    });
    
    if (result.success) {
      console.log('✅ Gemini Pro Test Successful!');
      console.log(`Model: ${result.model}`);
      console.log(`Word Count: ${result.wordCount}`);
      console.log('\nResponse:');
      console.log(result.content);
    } else {
      console.log('❌ Gemini Pro Test Failed:');
      console.log(result.error);
    }
  } catch (error) {
    console.log('❌ Test Error:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting AI Service Tests...\n');
  
  await testOpenAI();
  await testGemini();
  
  console.log('\n\n🏁 All tests completed!');
}

runTests();