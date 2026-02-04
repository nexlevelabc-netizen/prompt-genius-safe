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
  'nutrition-guide': {
    name: 'Nutrition & Diet Guide',
    description: 'Create personalized nutrition and diet plans',
    category: 'Health',
    subcategory: 'Nutrition',
    template: "Create a {duration} nutrition plan for {goal}. Target audience: {audience}. Include {components}. Restrictions: {restrictions}. Provide contextual advice.",
    variables: ['duration', 'goal', 'audience', 'components', 'restrictions']
  },
  'mental-health': {
    name: 'Mental Health Advisor',
    description: 'Provide mental health guidance and coping strategies',
    category: 'Health',
    subcategory: 'Mental Health',
    template: "Provide 300-word mental health advice for dealing with {issue}. Audience: {audience}. Approach: {approach}. Include {techniques}. Use empathetic, human tone.",
    variables: ['issue', 'audience', 'approach', 'techniques']
  },

  // RELATIONSHIP CATEGORY
  'relationship-advice': {
    name: 'Relationship Counselor',
    description: 'Provide relationship advice and conflict resolution',
    category: 'Relationship',
    subcategory: 'Advice',
    template: "Provide 300-word relationship advice for {situation} between {parties}. Context: {context}. Goals: {goals}. Tone: {tone}. Be compassionate and practical.",
    variables: ['situation', 'parties', 'context', 'goals', 'tone']
  },
  'dating-profile': {
    name: 'Dating Profile Writer',
    description: 'Create compelling dating app profiles',
    category: 'Relationship',
    subcategory: 'Dating',
    template: "Write a {platform} dating profile for a {age} year old {gender} who enjoys {interests}. Looking for {lookingFor}. Tone: {tone}. Make it authentic and engaging.",
    variables: ['platform', 'age', 'gender', 'interests', 'lookingFor', 'tone']
  },

  // HISTORY CATEGORY
  'historical-analysis': {
    name: 'Historical Analysis',
    description: 'Analyze historical events and their significance',
    category: 'History',
    subcategory: 'Analysis',
    template: "Analyze the historical event: {event}. Time period: {period}. Focus on {aspects}. Include {perspectives}. Impact: {impact}. Write 300-word contextual analysis.",
    variables: ['event', 'period', 'aspects', 'perspectives', 'impact']
  },
  'biography-writer': {
    name: 'Biography Writer',
    description: 'Create detailed historical biographies',
    category: 'History',
    subcategory: 'Biography',
    template: "Write a 300-word biography of {person}. Focus on {focusPeriod}. Key achievements: {achievements}. Legacy: {legacy}. Tone: {tone}. Provide contextual background.",
    variables: ['person', 'focusPeriod', 'achievements', 'legacy', 'tone']
  },

  // IMAGE GENERATION CATEGORY
  'image-prompt-art': {
    name: 'Artistic Image Prompts',
    description: 'Create detailed prompts for AI image generation',
    category: 'Image Generation',
    subcategory: 'Art',
    template: "Create detailed image prompt: {subject} in {style} style. Setting: {setting}. Lighting: {lighting}. Mood: {mood}. Details: {details}. Aspect ratio: {ratio}. Be descriptive.",
    variables: ['subject', 'style', 'setting', 'lighting', 'mood', 'details', 'ratio']
  },
  'product-photography': {
    name: 'Product Photography Prompts',
    description: 'Generate prompts for product photography',
    category: 'Image Generation',
    subcategory: 'Product',
    template: "Create product photo prompt: {product}. Style: {style}. Background: {background}. Lighting: {lighting}. Props: {props}. Composition: {composition}. Be specific.",
    variables: ['product', 'style', 'background', 'lighting', 'props', 'composition']
  },

  // VIDEO GENERATION CATEGORY
  'video-script': {
    name: 'Video Script Writer',
    description: 'Create scripts for YouTube and social media videos',
    category: 'Video Generation',
    subcategory: 'Script',
    template: "Write a {duration} video script about {topic}. Platform: {platform}. Target audience: {audience}. Style: {style}. Call to action: {cta}. Make it engaging.",
    variables: ['duration', 'topic', 'platform', 'audience', 'style', 'cta']
  },
  'storyboard-creator': {
    name: 'Storyboard Creator',
    description: 'Create detailed storyboards for video production',
    category: 'Video Generation',
    subcategory: 'Storyboard',
    template: "Create storyboard for video about {topic}. Scenes: {scenes}. Camera angles: {angles}. Transitions: {transitions}. Mood: {mood}. Be descriptive.",
    variables: ['topic', 'scenes', 'angles', 'transitions', 'mood']
  },

  // FITNESS CATEGORY
  'workout-plan': {
    name: 'Workout Plan Creator',
    description: 'Create personalized fitness and workout plans',
    category: 'Fitness',
    subcategory: 'Workout',
    template: "Create {duration} workout plan for {goal}. Fitness level: {level}. Equipment: {equipment}. Focus areas: {focus}. Schedule: {schedule}. Provide context.",
    variables: ['duration', 'goal', 'level', 'equipment', 'focus', 'schedule']
  },
  'fitness-article': {
    name: 'Fitness Article Writer',
    description: 'Write informative fitness and exercise articles',
    category: 'Fitness',
    subcategory: 'Education',
    template: "Write 300-word fitness article about {topic}. Target audience: {audience}. Key points: {points}. Exercises: {exercises}. Safety: {safety}. Tone: {tone}.",
    variables: ['topic', 'audience', 'points', 'exercises', 'safety', 'tone']
  },

  // RELIGION CATEGORY
  'religious-study': {
    name: 'Religious Study Guide',
    description: 'Create study guides for religious texts and topics',
    category: 'Religion',
    subcategory: 'Study',
    template: "Create study guide for {topic} in {religion}. Text: {text}. Key themes: {themes}. Questions: {questions}. Applications: {applications}. Provide context.",
    variables: ['topic', 'religion', 'text', 'themes', 'questions', 'applications']
  },
  'sermon-writer': {
    name: 'Sermon & Speech Writer',
    description: 'Write religious sermons and inspirational speeches',
    category: 'Religion',
    subcategory: 'Speaking',
    template: "Write {duration} sermon about {topic}. Scripture: {scripture}. Audience: {audience}. Message: {message}. Application: {application}. Tone: {tone}.",
    variables: ['duration', 'topic', 'scripture', 'audience', 'message', 'application', 'tone']
  },

  // DOCUMENTARY CATEGORY
  'documentary-script': {
    name: 'Documentary Script Writer',
    description: 'Write scripts for documentary films',
    category: 'Documentary',
    subcategory: 'Script',
    template: "Write documentary script about {subject}. Angle: {angle}. Interviews: {interviews}. Locations: {locations}. Narrative arc: {arc}. Be contextual.",
    variables: ['subject', 'angle', 'interviews', 'locations', 'arc']
  },
  'research-paper': {
    name: 'Research Paper Assistant',
    description: 'Help structure and write academic research papers',
    category: 'Documentary',
    subcategory: 'Academic',
    template: "Help write research paper on {topic}. Field: {field}. Thesis: {thesis}. Arguments: {arguments}. Methodology: {methodology}. Sources: {sources}.",
    variables: ['topic', 'field', 'thesis', 'arguments', 'methodology', 'sources']
  },

  // BUSINESS CATEGORY
  'business-plan': {
    name: 'Business Plan Writer',
    description: 'Create comprehensive business plans',
    category: 'Business',
    subcategory: 'Planning',
    template: "Create business plan for {businessType}. Market: {market}. Value: {value}. Projections: {projections}. Goals: {goals}. Provide detailed context.",
    variables: ['businessType', 'market', 'value', 'projections', 'goals']
  },
  'marketing-strategy': {
    name: 'Marketing Strategy Planner',
    description: 'Develop complete marketing strategies',
    category: 'Business',
    subcategory: 'Marketing',
    template: "Create marketing strategy for {product}. Audience: {audience}. Channels: {channels}. Budget: {budget}. KPIs: {kpis}. Timeline: {timeline}.",
    variables: ['product', 'audience', 'channels', 'budget', 'kpis', 'timeline']
  },

  // TECHNOLOGY CATEGORY
  'tech-review': {
    name: 'Technology Review Writer',
    description: 'Write comprehensive tech product reviews',
    category: 'Technology',
    subcategory: 'Reviews',
    template: "Write 300-word review of {product}. Category: {category}. Features: {features}. Pros: {pros}. Cons: {cons}. User: {user}. Criteria: {criteria}. Tone: {tone}.",
    variables: ['product', 'category', 'features', 'pros', 'cons', 'user', 'criteria', 'tone']
  },
  'coding-tutorial': {
    name: 'Coding Tutorial Creator',
    description: 'Create programming tutorials and guides',
    category: 'Technology',
    subcategory: 'Programming',
    template: "Create tutorial for {task} using {language}. Level: {level}. Prerequisites: {prerequisites}. Steps: {steps}. Examples: {examples}. Challenges: {challenges}.",
    variables: ['task', 'language', 'level', 'prerequisites', 'steps', 'examples', 'challenges']
  },

  // EDUCATION CATEGORY
  'lesson-plan': {
    name: 'Lesson Plan Creator',
    description: 'Create detailed lesson plans for educators',
    category: 'Education',
    subcategory: 'Teaching',
    template: "Create lesson plan for {subject} for {gradeLevel}. Topic: {topic}. Objectives: {objectives}. Activities: {activities}. Assessment: {assessment}. Duration: {duration}.",
    variables: ['subject', 'gradeLevel', 'topic', 'objectives', 'activities', 'assessment', 'duration']
  },
  'study-guide': {
    name: 'Study Guide Generator',
    description: 'Create comprehensive study guides',
    category: 'Education',
    subcategory: 'Study',
    template: "Create study guide for {topic}. Concepts: {concepts}. Terms: {terms}. Questions: {questions}. Resources: {resources}. Provide contextual explanations.",
    variables: ['topic', 'concepts', 'terms', 'questions', 'resources']
  },

  // CREATIVE WRITING CATEGORY
  'short-story': {
    name: 'Short Story Writer',
    description: 'Create engaging short stories',
    category: 'Creative Writing',
    subcategory: 'Fiction',
    template: "Write 300-word short story about {premise}. Genre: {genre}. Characters: {characters}. Setting: {setting}. Conflict: {conflict}. Theme: {theme}. Tone: {tone}.",
    variables: ['premise', 'genre', 'characters', 'setting', 'conflict', 'theme', 'tone']
  },
  'poetry-generator': {
    name: 'Poetry Generator',
    description: 'Create poems in various styles',
    category: 'Creative Writing',
    subcategory: 'Poetry',
    template: "Write poem about {topic}. Form: {form}. Style: {style}. Meter: {meter}. Rhyme: {rhyme}. Mood: {mood}. Length: {length}. Use evocative language.",
    variables: ['topic', 'form', 'style', 'meter', 'rhyme', 'mood', 'length']
  },

  // TRAVEL CATEGORY
  'travel-guide': {
    name: 'Travel Guide Writer',
    description: 'Create comprehensive travel guides',
    category: 'Travel',
    subcategory: 'Guides',
    template: "Create 300-word travel guide for {destination}. Duration: {duration}. Budget: {budget}. Interests: {interests}. Attractions: {attractions}. Food: {food}. Tips: {tips}.",
    variables: ['destination', 'duration', 'budget', 'interests', 'attractions', 'food', 'tips']
  },
  'itinerary-planner': {
    name: 'Travel Itinerary Planner',
    description: 'Create detailed travel itineraries',
    category: 'Travel',
    subcategory: 'Planning',
    template: "Create {days} day itinerary for {destination}. Style: {style}. Inclusions: {inclusions}. Budget: {budget}. Pace: {pace}. Provide contextual details.",
    variables: ['days', 'destination', 'style', 'inclusions', 'budget', 'pace']
  },

  // MUSIC CATEGORY
  'song-lyrics': {
    name: 'Song Lyrics Writer',
    description: 'Create song lyrics in various genres',
    category: 'Music',
    subcategory: 'Lyrics',
    template: "Write song lyrics about {theme}. Genre: {genre}. Mood: {mood}. Structure: {structure}. Chorus: {chorus}. Verse theme: {verseTheme}. Tone: {tone}.",
    variables: ['theme', 'genre', 'mood', 'structure', 'chorus', 'verseTheme', 'tone']
  },
  'music-review': {
    name: 'Music Review Writer',
    description: 'Write detailed music album and song reviews',
    category: 'Music',
    subcategory: 'Reviews',
    template: "Write 300-word review of {album/song} by {artist}. Genre: {genre}. Highlights: {highlights}. Weaknesses: {weaknesses}. Context: {context}. Tone: {tone}.",
    variables: ['album/song', 'artist', 'genre', 'highlights', 'weaknesses', 'context', 'tone']
  },

  // MOVIES CATEGORY
  'movie-script': {
    name: 'Movie Script Writer',
    description: 'Write scripts for films and screenplays',
    category: 'Movies',
    subcategory: 'Script',
    template: "Write movie script scene: {sceneDescription}. Characters: {characters}. Setting: {setting}. Dialogue style: {dialogueStyle}. Mood: {mood}. Length: {length}.",
    variables: ['sceneDescription', 'characters', 'setting', 'dialogueStyle', 'mood', 'length']
  },
  'film-review': {
    name: 'Film Review Writer',
    description: 'Write comprehensive movie reviews',
    category: 'Movies',
    subcategory: 'Reviews',
    template: "Write 300-word review of {movie}. Director: {director}. Genre: {genre}. Strengths: {strengths}. Weaknesses: {weaknesses}. Rating: {rating}. Tone: {tone}.",
    variables: ['movie', 'director', 'genre', 'strengths', 'weaknesses', 'rating', 'tone']
  },

  // ENTERTAINMENT CATEGORY
  'celebrity-news': {
    name: 'Celebrity News Writer',
    description: 'Write entertainment news articles',
    category: 'Entertainment',
    subcategory: 'News',
    template: "Write 300-word entertainment article about {celebrity/event}. Angle: {angle}. Details: {details}. Reactions: {reactions}. Context: {context}. Tone: {tone}.",
    variables: ['celebrity/event', 'angle', 'details', 'reactions', 'context', 'tone']
  },
  'event-coverage': {
    name: 'Event Coverage Writer',
    description: 'Cover entertainment events and award shows',
    category: 'Entertainment',
    subcategory: 'Events',
    template: "Cover {eventName}. Highlights: {highlights}. Winners: {winners}. Fashion: {fashion}. Memorable moments: {moments}. Context: {context}. Tone: {tone}.",
    variables: ['eventName', 'highlights', 'winners', 'fashion', 'moments', 'context', 'tone']
  },

  // EROTIC CATEGORY (18+)
  'romance-novel': {
    name: 'Romance Novel Scene',
    description: 'Write romantic or intimate scenes',
    category: 'Erotic',
    subcategory: 'Romance',
    template: "Write romantic scene between {characters}. Setting: {setting}. Mood: {mood}. Sensuality level: {level}. Focus on: {focus}. Tone: {tone}. Be tasteful.",
    variables: ['characters', 'setting', 'mood', 'level', 'focus', 'tone']
  },
  'intimate-scene': {
    name: 'Intimate Scene Writer',
    description: 'Create tasteful intimate scenes',
    category: 'Erotic',
    subcategory: 'Scenes',
    template: "Write intimate scene: {context}. Characters: {characters}. Emotional tone: {emotionalTone}. Physical description: {physicalDesc}. Focus: {focus}. Be artistic.",
    variables: ['context', 'characters', 'emotionalTone', 'physicalDesc', 'focus']
  },

  // DEMOGRAPHY CATEGORY
  'population-study': {
    name: 'Population Study Analysis',
    description: 'Analyze demographic data and trends',
    category: 'Demography',
    subcategory: 'Analysis',
    template: "Analyze demographic data for {region}. Focus: {focus}. Time period: {period}. Trends: {trends}. Implications: {implications}. Recommendations: {recommendations}.",
    variables: ['region', 'focus', 'period', 'trends', 'implications', 'recommendations']
  },
  'census-report': {
    name: 'Census Report Writer',
    description: 'Create reports from census data',
    category: 'Demography',
    subcategory: 'Reports',
    template: "Create census report for {area}. Key findings: {findings}. Population changes: {changes}. Age distribution: {ageDist}. Ethnic composition: {ethnicity}. Insights: {insights}.",
    variables: ['area', 'findings', 'changes', 'ageDist', 'ethnicity', 'insights']
  },

  // NEWS CATEGORY
  'breaking-news': {
    name: 'Breaking News Reporter',
    description: 'Write breaking news articles',
    category: 'News',
    subcategory: 'Breaking',
    template: "Write breaking news article about {event}. Location: {location}. Time: {time}. Key facts: {facts}. Official statements: {statements}. Updates: {updates}. Tone: {tone}.",
    variables: ['event', 'location', 'time', 'facts', 'statements', 'updates', 'tone']
  },
  'feature-article': {
    name: 'Feature Article Writer',
    description: 'Write in-depth feature articles',
    category: 'News',
    subcategory: 'Features',
    template: "Write 500-word feature article about {topic}. Angle: {angle}. Interviews: {interviews}. Research: {research}. Human interest: {humanElement}. Conclusion: {conclusion}.",
    variables: ['topic', 'angle', 'interviews', 'research', 'humanElement', 'conclusion']
  },

  // FINANCE CATEGORY
  'investment-advice': {
    name: 'Investment Advisor',
    description: 'Provide investment advice and analysis',
    category: 'Finance',
    subcategory: 'Investing',
    template: "Provide investment advice for {goal}. Timeframe: {timeframe}. Risk tolerance: {risk}. Amount: {amount}. Strategy: {strategy}. Recommendations: {recommendations}. Disclaimers: {disclaimers}.",
    variables: ['goal', 'timeframe', 'risk', 'amount', 'strategy', 'recommendations', 'disclaimers']
  },
  'financial-planning': {
    name: 'Financial Planning Guide',
    description: 'Create personal financial plans',
    category: 'Finance',
    subcategory: 'Planning',
    template: "Create financial plan for {situation}. Income: {income}. Expenses: {expenses}. Goals: {goals}. Timeline: {timeline}. Strategies: {strategies}. Emergency fund: {emergencyFund}.",
    variables: ['situation', 'income', 'expenses', 'goals', 'timeline', 'strategies', 'emergencyFund']
  },

  // JUSTICE CATEGORY
  'legal-document': {
    name: 'Legal Document Assistant',
    description: 'Help draft legal documents and letters',
    category: 'Justice',
    subcategory: 'Documents',
    template: "Draft {documentType} for {purpose}. Parties: {parties}. Key terms: {terms}. Conditions: {conditions}. Jurisdiction: {jurisdiction}. Format: {format}. Note: {disclaimer}.",
    variables: ['documentType', 'purpose', 'parties', 'terms', 'conditions', 'jurisdiction', 'format', 'disclaimer']
  },
  'case-analysis': {
    name: 'Legal Case Analysis',
    description: 'Analyze legal cases and precedents',
    category: 'Justice',
    subcategory: 'Analysis',
    template: "Analyze legal case: {caseName}. Issue: {issue}. Facts: {facts}. Arguments: {arguments}. Decision: {decision}. Precedent: {precedent}. Implications: {implications}.",
    variables: ['caseName', 'issue', 'facts', 'arguments', 'decision', 'precedent', 'implications']
  },

  // TRANSPORT CATEGORY
  'transport-review': {
    name: 'Transport System Review',
    description: 'Review transportation systems and services',
    category: 'Transport',
    subcategory: 'Reviews',
    template: "Review {transportSystem} in {location}. Service quality: {quality}. Pricing: {pricing}. Accessibility: {accessibility}. Safety: {safety}. Improvements: {improvements}. Rating: {rating}.",
    variables: ['transportSystem', 'location', 'quality', 'pricing', 'accessibility', 'safety', 'improvements', 'rating']
  },
  'logistics-planning': {
    name: 'Logistics Planning Guide',
    description: 'Create transportation and logistics plans',
    category: 'Transport',
    subcategory: 'Planning',
    template: "Create logistics plan for {cargo}. Origin: {origin}. Destination: {destination}. Mode: {mode}. Timeline: {timeline}. Cost: {cost}. Challenges: {challenges}. Solutions: {solutions}.",
    variables: ['cargo', 'origin', 'destination', 'mode', 'timeline', 'cost', 'challenges', 'solutions']
  }
};

// Available tones including "human"
const AVAILABLE_TONES = [
  'professional', 'conversational', 'authoritative', 'friendly', 'informative',
  'persuasive', 'formal', 'casual', 'enthusiastic', 'empathetic', 'analytical',
  'creative', 'technical', 'simple', 'academic', 'journalistic', 'human'
];

// Get all unique categories for filtering
const getAllCategories = () => {
  const categories = {};
  Object.values(premiumTemplates).forEach(template => {
    if (!categories[template.category]) {
      categories[template.category] = new Set();
    }
    categories[template.category].add(template.subcategory);
  });
  
  // Convert sets to arrays
  const result = {};
  Object.keys(categories).forEach(category => {
    result[category] = Array.from(categories[category]);
  });
  return result;
};

// Initialize OpenAI
let openai;
try {
  if (process.env.OPENAI_API_KEY) {
    const cleanOpenAIKey = process.env.OPENAI_API_KEY.trim();
    openai = new OpenAI({ apiKey: cleanOpenAIKey });
    console.log('✓ OpenAI initialized successfully');
  } else {
    console.log('⚠ OpenAI API key not found in environment');
  }
} catch (error) {
  console.log('✗ OpenAI initialization failed:', error.message);
}

// API Documentation
app.get('/', (req, res) => {
  const categories = getAllCategories();
  const categoryCount = Object.keys(categories).length;
  const templateCount = Object.keys(premiumTemplates).length;
  
  res.json({
    message: 'Mega Prompt Generator Pro - 50+ Templates Across 20+ Categories',
    version: '3.0.0',
    stats: {
      categories: categoryCount,
      subcategories: Object.values(categories).reduce((sum, arr) => sum + arr.length, 0),
      templates: templateCount,
      availableTones: AVAILABLE_TONES.length
    },
    availableTones: AVAILABLE_TONES,
    categories: categories,
    endpoints: {
      'GET /api/categories': 'Get all categories and subcategories',
      'GET /api/templates': 'List all premium templates',
      'GET /api/templates/category/:category': 'Get templates by category',
      'GET /api/tones': 'Get all available tones',
      'POST /api/generate/premium': 'Generate premium prompt',
      'POST /api/ai/generate': 'Generate AI content',
      'POST /api/ai/compare': 'Compare AI providers',
      'POST /api/generate/complete': 'Full workflow (prompt + AI response)',
      'GET /api/health': 'System health check',
      'GET /api/stats': 'Get platform statistics'
    }
  });
});

// Get all available tones
app.get('/api/tones', (req, res) => {
  res.json({
    success: true,
    count: AVAILABLE_TONES.length,
    tones: AVAILABLE_TONES,
    description: 'Includes "human" tone for natural, conversational writing'
  });
});

// Get platform statistics
app.get('/api/stats', (req, res) => {
  const categories = getAllCategories();
  
  res.json({
    success: true,
    stats: {
      totalTemplates: Object.keys(premiumTemplates).length,
      totalCategories: Object.keys(categories).length,
      totalSubcategories: Object.values(categories).reduce((sum, arr) => sum + arr.length, 0),
      availableTones: AVAILABLE_TONES.length,
      wordTarget: '300+ words for contextual prompts'
    },
    categories: Object.keys(categories),
    features: [
      '50+ specialized templates',
      '20+ main categories',
      'Contextual 300-word prompts',
      'Human tone included',
      'Variable replacement system',
      'OpenAI integration'
    ]
  });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = getAllCategories();
    const categoryList = Object.keys(categories);
    
    res.json({
      success: true,
      count: categoryList.length,
      categories: categoryList,
      detailed: categories,
      templateCount: Object.keys(premiumTemplates).length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      details: error.message
    });
  }
});

// Get templates by category
app.get('/api/templates/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const templates = Object.entries(premiumTemplates)
      .filter(([id, template]) => template.category.toLowerCase() === category.toLowerCase())
      .map(([id, template]) => ({
        id,
        ...template
      }));
    
    if (templates.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
        availableCategories: Object.keys(getAllCategories())
      });
    }
    
    res.json({
      success: true,
      category,
      count: templates.length,
      templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates by category',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const categories = getAllCategories();
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      openai: !!openai,
      templates: Object.keys(premiumTemplates).length,
      categories: Object.keys(categories).length,
      subcategories: Object.values(categories).reduce((sum, arr) => sum + arr.length, 0),
      tones: AVAILABLE_TONES.length
    }
  });
});

// Enhanced prompt generation with word count targeting
app.post('/api/generate/premium', (req, res) => {
  try {
    const { templateId, variables } = req.body;
    
    if (!templateId || !premiumTemplates[templateId]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template ID',
        availableTemplates: Object.keys(premiumTemplates)
      });
    }
    
    const template = premiumTemplates[templateId];
    let prompt = template.template;
    
    // Replace variables in template
    if (variables && typeof variables === 'object') {
      Object.entries(variables).forEach(([key, value]) => {
        if (value) {
          prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value);
        }
      });
    }
    
    // Remove any remaining {variable} placeholders
    prompt = prompt.replace(/{[^}]+}/g, '[Please specify]');
    
    // Add contextual instructions for 300+ word output
    if (prompt.includes('300-word') || prompt.includes('300 word')) {
      prompt += " Provide a detailed, contextual response of approximately 300 words. Include specific examples, practical advice, and real-world applications.";
    } else if (prompt.includes('500-word') || prompt.includes('500 word')) {
      prompt += " Provide an in-depth, comprehensive response of approximately 500 words. Include thorough analysis, multiple perspectives, and detailed explanations.";
    } else {
      // Add general contextual instruction
      prompt += " Provide a detailed, contextual response with specific examples and practical applications.";
    }
    
    // Add human tone instruction if selected
    if (variables && variables.tone === 'human') {
      prompt += " Use a natural, conversational human tone. Write as if speaking to a friend - avoid overly formal language, use contractions, and make it engaging.";
    }
    
    res.json({
      success: true,
      prompt,
      template: {
        name: template.name,
        category: template.category,
        subcategory: template.subcategory,
        description: template.description,
        wordTarget: prompt.includes('300-word') ? '300 words' : prompt.includes('500-word') ? '500 words' : 'Detailed'
      },
      metadata: {
        variablesUsed: Object.keys(variables || {}),
        variablesMissing: template.variables.filter(v => !variables || !variables[v]),
        toneUsed: variables?.tone || 'not specified',
        isHumanTone: variables?.tone === 'human'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate prompt',
      details: error.message
    });
  }
});

// List all templates (with filtering options)
app.get('/api/templates', (req, res) => {
  try {
    const { category, subcategory } = req.query;
    let templatesArray = Object.entries(premiumTemplates).map(([id, template]) => ({
      id,
      ...template
    }));
    
    // Apply filters if provided
    if (category) {
      templatesArray = templatesArray.filter(t => 
        t.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (subcategory) {
      templatesArray = templatesArray.filter(t => 
        t.subcategory.toLowerCase() === subcategory.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      count: templatesArray.length,
      filters: {
        category: category || 'none',
        subcategory: subcategory || 'none'
      },
      templates: templatesArray
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates',
      details: error.message
    });
  }
});

// Generate AI content with enhanced instructions
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, provider = 'openai' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }
    
    let result;
    
    if (provider === 'openai') {
      if (!openai) {
        return res.status(400).json({
          success: false,
          error: 'OpenAI not configured',
          details: 'Please check your OPENAI_API_KEY in .env file'
        });
      }
      
      try {
        // Enhanced system message for contextual, human-like responses
        const systemMessage = prompt.includes('human tone') || prompt.toLowerCase().includes('conversational') 
          ? "You are a helpful assistant that writes in a natural, conversational human tone. Use contractions, be engaging, and write as if speaking to a friend."
          : "You are a helpful assistant that provides detailed, contextual responses with specific examples and practical applications.";
        
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: prompt }
          ],
          max_tokens: 1200,
          temperature: 0.7
        });
        
        result = {
          provider: 'OpenAI GPT-3.5 Turbo',
          content: completion.choices[0].message.content,
          tokens: completion.usage.total_tokens,
          model: 'gpt-3.5-turbo',
          wordCount: completion.choices[0].message.content.split(/\s+/).length,
          tone: prompt.includes('human tone') ? 'human' : 'standard'
        };
        
      } catch (error) {
        console.error('OpenAI API Error:', error);
        return res.status(500).json({
          success: false,
          error: 'AI generation failed',
          details: error.message,
          suggestion: 'Check your OpenAI API key and billing'
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: `Provider '${provider}' not supported`,
        supportedProviders: ['openai']
      });
    }
    
    res.json({
      success: true,
      ...result
    });
    
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'AI generation failed',
      details: error.message
    });
  }
});

// Compare AI providers
app.post('/api/ai/compare', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }
    
    if (!openai) {
      return res.status(400).json({
        success: false,
        error: 'OpenAI not configured',
        details: 'Please check your OPENAI_API_KEY in .env file'
      });
    }
    
    // Generate response with OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7
    });
    
    const openaiContent = completion.choices[0].message.content;
    
    res.json({
      success: true,
      count: 1,
      results: [{
        provider: 'OpenAI GPT-3.5 Turbo',
        content: openaiContent,
        tokens: completion.usage.total_tokens,
        latency: 'N/A',
        model: 'gpt-3.5-turbo',
        wordCount: openaiContent.split(/\s+/).length
      }],
      comparison: {
        fastest: 'OpenAI GPT-3.5 Turbo',
        longest: 'OpenAI GPT-3.5 Turbo',
        totalProviders: 1,
        note: 'Additional providers can be added by configuring API keys'
      }
    });
    
  } catch (error) {
    console.error('AI Comparison Error:', error);
    res.status(500).json({
      success: false,
      error: 'AI comparison failed',
      details: error.message
    });
  }
});

// Complete workflow: Generate prompt + AI response
app.post('/api/generate/complete', async (req, res) => {
  try {
    const { templateId, variables, provider = 'openai' } = req.body;
    
    // Step 1: Generate prompt from template
    if (!templateId || !premiumTemplates[templateId]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template ID',
        availableTemplates: Object.keys(premiumTemplates)
      });
    }
    
    const template = premiumTemplates[templateId];
    let prompt = template.template;
    
    if (variables && typeof variables === 'object') {
      Object.entries(variables).forEach(([key, value]) => {
        if (value) {
          prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value);
        }
      });
    }
    
    prompt = prompt.replace(/{[^}]+}/g, '[Please specify]');
    
    // Add contextual instructions
    if (prompt.includes('300-word') || prompt.includes('300 word')) {
      prompt += " Provide a detailed, contextual response of approximately 300 words.";
    }
    
    if (variables && variables.tone === 'human') {
      prompt += " Use a natural, conversational human tone.";
    }
    
    // Step 2: Get AI response
    let aiResponse = null;
    
    if (openai) {
      const systemMessage = variables?.tone === 'human'
        ? "You are a helpful assistant that writes in a natural, conversational human tone."
        : "You are a helpful assistant that provides detailed, contextual responses.";
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1200,
        temperature: 0.7
      });
      
      aiResponse = {
        provider: 'OpenAI GPT-3.5 Turbo',
        content: completion.choices[0].message.content,
        tokens: completion.usage.total_tokens,
        model: 'gpt-3.5-turbo',
        wordCount: completion.choices[0].message.content.split(/\s+/).length,
        tone: variables?.tone || 'standard'
      };
    }
    
    res.json({
      success: true,
      workflow: {
        step1: 'Prompt Generation',
        step2: 'AI Response',
        completed: true
      },
      prompt,
      aiResponse,
      template: {
        name: template.name,
        category: template.category,
        subcategory: template.subcategory,
        description: template.description,
        id: templateId
      }
    });
    
  } catch (error) {
    console.error('Complete Workflow Error:', error);
    res.status(500).json({
      success: false,
      error: 'Complete workflow failed',
      details: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  const categories = getAllCategories();
  
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      'GET /': 'API Documentation',
      'GET /api/categories': 'Get all categories',
      'GET /api/templates': 'List all templates',
      'GET /api/tones': 'Get all available tones',
      'GET /api/stats': 'Get platform statistics',
      'POST /api/generate/premium': 'Generate premium prompt',
      'POST /api/ai/generate': 'Generate AI content',
      'POST /api/ai/compare': 'Compare AI providers',
      'POST /api/generate/complete': 'Generate prompt + AI response',
      'GET /api/health': 'System health check'
    },
    stats: {
      categories: Object.keys(categories).length,
      templates: Object.keys(premiumTemplates).length,
      tones: AVAILABLE_TONES.length
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  const categories = getAllCategories();
  const categoryCount = Object.keys(categories).length;
  const templateCount = Object.keys(premiumTemplates).length;
  const subcategoryCount = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);
  
  console.log(`\n🚀 MEGA PROMPT GENERATOR PRO v3.0`);
  console.log(`🌐 Running at: http://localhost:${PORT}`);
  console.log(`\n📊 MASSIVE TEMPLATE LIBRARY:`);
  console.log(`   • Categories: ${categoryCount}`);
  console.log(`   • Subcategories: ${subcategoryCount}`);
  console.log(`   • Templates: ${templateCount}`);
  console.log(`   • Available Tones: ${AVAILABLE_TONES.length} (including "human")`);
  console.log(`\n🤖 AI SERVICES:`);
  console.log(`   • OpenAI: ${openai ? '✅ Ready' : '❌ Not configured'}`);
  console.log(`\n🎯 KEY FEATURES:`);
  console.log(`   • 300+ word contextual prompts`);
  console.log(`   • "Human" tone for natural writing`);
  console.log(`   • 50+ specialized templates`);
  console.log(`   • 20+ comprehensive categories`);
  console.log(`\n📚 AVAILABLE CATEGORIES:`);
  Object.keys(categories).forEach(category => {
    console.log(`   • ${category}: ${categories[category].length} subcategories`);
  });
  console.log(`\n🔧 API ENDPOINTS:`);
  console.log(`   • GET / - Complete documentation`);
  console.log(`   • GET /api/stats - Platform statistics`);
  console.log(`   • GET /api/tones - All available tones`);
  console.log(`   • GET /api/categories - List all categories`);
  console.log(`\n🎉 Your mega prompt generator is ready!`);
});