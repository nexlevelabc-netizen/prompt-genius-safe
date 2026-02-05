// constants/dropdownOptions.js
// This file contains all dropdown options for all template categories

export const dropdownOptions = {
  // === IMAGE GENERATION ===
  imageStyles: [
    'Photorealistic',
    'Digital Painting', 
    'Concept Art',
    'Cinematic',
    'Minimalist Illustration',
    'Watercolor',
    '3D Render',
    'Anime',
    'Oil Painting',
    'Sketch',
    'Comic Book',
    'Pixel Art',
    'Cyberpunk',
    'Steampunk',
    'Fantasy Art',
    'Surrealism',
    'Abstract',
    'Impressionism'
  ],
  
  colorPalettes: [
    'Vibrant & Bold',
    'Muted & Pastel', 
    'Monochrome',
    'Dark & Moody',
    'Warm & Golden Hour',
    'Cool & Cyberpunk',
    'Earthy & Natural',
    'Neon & Electric',
    'Sunset Tones',
    'Ocean Blues',
    'Forest Greens',
    'Desert Warmth',
    'Cosmic Purple',
    'Metallic Tones',
    'Retro Colors'
  ],
  
  imageResolutions: [
    '8K Ultra HD - Maximum Detail (7680x4320)',
    '4K High Detail (3840x2160)',
    '2K Standard Detail (2560x1440)',
    'Full HD (1080p)',
    'Stylized & Clean',
    'Ultra Detailed, Professional',
    'High Resolution, Print Quality'
  ],
  
  lightingOptions: [
    'Dramatic Lighting',
    'Soft Ambient Light',
    'Studio Lighting',
    'Natural Sunlight',
    'Neon & Artificial',
    'Mysterious Fog',
    'Golden Hour',
    'Moonlight',
    'Cinematic Lighting',
    'High Contrast',
    'Backlit',
    'Rim Lighting',
    'Volumetric Lighting',
    'Candlelight',
    'Studio Softbox'
  ],
  
  // === VIDEO GENERATION ===
  videoStyles: [
    'Cinematic',
    'Animation',
    '3D Motion Graphics', 
    'Realistic CGI',
    'Anime Style',
    'Documentary',
    'Hyperrealistic',
    'Stop Motion',
    'Claymation',
    'Whiteboard Animation',
    'Live Action',
    'Cartoon',
    'VFX Heavy',
    'Minimalist',
    'Corporate Video'
  ],
  
  videoResolutions: [
    '8K Ultra HD (7680x4320)',
    '4K Ultra HD (3840x2160)',
    '2K (2560x1440)',
    '1080p Full HD',
    '720p HD',
    '4:3 Standard Definition'
  ],
  
  frameRates: [
    '60 fps (Ultra Smooth)',
    '30 fps (Standard)', 
    '24 fps (Cinematic)',
    '120 fps (Slow Motion)',
    '25 fps (PAL)',
    '50 fps (Smooth Motion)'
  ],
  
  aspectRatios: [
    '16:9 (Widescreen)',
    '9:16 (Vertical)',
    '1:1 (Square)',
    '21:9 (Cinematic)',
    '4:3 (Standard)',
    '2.35:1 (Anamorphic)',
    '3:2 (Classic)',
    '5:4 (Large Format)'
  ],
  
  videoLengths: [
    '5 seconds',
    '10 seconds',
    '15 seconds',
    '30 seconds',
    '60 seconds',
    '2 minutes',
    '5 minutes',
    '10 minutes'
  ],
  
  // === BUSINESS/MARKETING ===
  businessTones: [
    'Professional',
    'Authoritative',
    'Persuasive',
    'Educational',
    'Conversational',
    'Formal',
    'Analytical',
    'Strategic',
    'Inspirational',
    'Corporate',
    'Friendly',
    'Confident',
    'Urgent',
    'Empathetic',
    'Visionary'
  ],
  
  // === CREATIVE WRITING ===
  writingStyles: [
    'Descriptive',
    'Narrative',
    'Expository',
    'Persuasive',
    'Creative',
    'Academic',
    'Journalistic',
    'Technical',
    'Poetic',
    'Minimalist',
    'Lyrical',
    'Dramatic',
    'Humorous',
    'Satirical',
    'Epistolary'
  ],
  
  genres: [
    'Fiction',
    'Non-Fiction',
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Horror',
    'Thriller',
    'Historical',
    'Biography',
    'Self-Help',
    'Business',
    'Young Adult',
    'Children\'s',
    'Literary'
  ],
  
  // === HEALTH & WELLNESS ===
  medicalTones: [
    'Clinical',
    'Professional',
    'Educational',
    'Empathetic',
    'Authoritative',
    'Compassionate',
    'Informative',
    'Reassuring',
    'Direct',
    'Patient-Focused'
  ],
  
  complexityLevels: [
    'Beginner',
    'Intermediate',
    'Advanced', 
    'Expert',
    'Master',
    'Basic',
    'Standard',
    'Complex',
    'Technical'
  ],
  
  // === GENERAL ===
  expertiseLevels: [
    'Beginner',
    'Intermediate',
    'Advanced', 
    'Expert',
    'Master'
  ],
  
  lengths: [
    'Brief',
    'Standard',
    'Detailed',
    'Comprehensive',
    'Exhaustive',
    'Short',
    'Medium',
    'Long'
  ],
  
  languages: [
    'Formal',
    'Casual',
    'Technical',
    'Conversational',
    'Academic',
    'Professional',
    'Friendly',
    'Corporate',
    'Creative',
    'Simple'
  ],
  
  formats: [
    'Blog Post',
    'Email',
    'Report',
    'Article',
    'Social Media Post',
    'Script',
    'Presentation',
    'Whitepaper',
    'Case Study',
    'Newsletter',
    'Press Release',
    'Product Description'
  ],
  
  // === AI PLATFORMS ===
  aiPlatforms: {
    image: [
      { value: 'Midjourney', label: 'Midjourney' },
      { value: 'DALL-E 3', label: 'DALL-E 3 (OpenAI)' },
      { value: 'Stable Diffusion', label: 'Stable Diffusion' },
      { value: 'Leonardo.ai', label: 'Leonardo.ai' },
      { value: 'Adobe Firefly', label: 'Adobe Firefly' },
      { value: 'Craiyon', label: 'Craiyon' },
      { value: 'NightCafe', label: 'NightCafe' },
      { value: 'DreamStudio', label: 'DreamStudio' }
    ],
    video: [
      { value: 'Runway Gen-2', label: 'Runway Gen-2' },
      { value: 'Pika Labs', label: 'Pika Labs' },
      { value: 'Stable Video', label: 'Stable Video Diffusion' },
      { value: 'HeyGen', label: 'HeyGen' },
      { value: 'Sora', label: 'Sora (OpenAI)' },
      { value: 'InVideo AI', label: 'InVideo AI' },
      { value: 'Synthesia', label: 'Synthesia' },
      { value: 'Luma AI', label: 'Luma AI' }
    ],
    text: [
      { value: 'GPT-5.2', label: 'GPT-5.2 Turbo' },
      { value: 'Claude', label: 'Claude 3.5' },
      { value: 'Gemini', label: 'Gemini Pro' },
      { value: 'Llama', label: 'Llama 3' },
      { value: 'Mistral', label: 'Mistral AI' },
      { value: 'Cohere', label: 'Cohere' },
      { value: 'Jurassic', label: 'Jurassic-2' },
      { value: 'Bloom', label: 'Bloom' }
    ]
  },
  
  // === LEGAL & COMPLIANCE ===
  legalTones: [
    'Formal',
    'Authoritative',
    'Precise',
    'Professional',
    'Compliant',
    'Regulatory',
    'Contractual',
    'Legal'
  ],
  
  // === FINANCE & INVESTMENT ===
  financeTones: [
    'Analytical',
    'Professional',
    'Confident',
    'Strategic',
    'Conservative',
    'Bullish',
    'Bearish',
    'Technical'
  ],
  
  // === REAL ESTATE ===
  realEstateTones: [
    'Descriptive',
    'Persuasive',
    'Professional',
    'Welcoming',
    'Luxury',
    'Commercial',
    'Residential'
  ],
  
  // === EDUCATION ===
  educationTones: [
    'Educational',
    'Instructive',
    'Engaging',
    'Academic',
    'Simple',
    'Comprehensive',
    'Interactive'
  ],
  
  // === TECHNOLOGY ===
  techTones: [
    'Technical',
    'Innovative',
    'Cutting-edge',
    'Professional',
    'Detailed',
    'Analytical',
    'Forward-thinking'
  ],
  
  // === TRAVEL & HOSPITALITY ===
  travelTones: [
    'Descriptive',
    'Inspirational',
    'Welcoming',
    'Adventurous',
    'Luxury',
    'Budget-friendly',
    'Cultural'
  ],
  
  // === FOOD & CULINARY ===
  foodTones: [
    'Descriptive',
    'Appetizing',
    'Professional',
    'Home-style',
    'Gourmet',
    'Healthy',
    'Comforting'
  ],
  
  // === MUSIC & AUDIO ===
  musicTones: [
    'Creative',
    'Artistic',
    'Technical',
    'Emotional',
    'Energetic',
    'Relaxing',
    'Professional'
  ],
  
  // === FASHION & DESIGN ===
  fashionTones: [
    'Trendy',
    'Luxury',
    'Creative',
    'Professional',
    'Stylish',
    'Innovative',
    'Artistic'
  ],
  
  // === GAMING & ESPORTS ===
  gamingTones: [
    'Energetic',
    'Competitive',
    'Engaging',
    'Technical',
    'Fun',
    'Strategic',
    'Community-focused'
  ],
  
  // === PERSONAL DEVELOPMENT ===
  personalDevTones: [
    'Inspirational',
    'Motivational',
    'Supportive',
    'Educational',
    'Empowering',
    'Positive',
    'Transformational'
  ]
};

// Helper function to get dropdown options by category and variable
export const getOptionsForVariable = (variable, category = '') => {
  // Convert variable to lowercase for matching
  const varLower = variable.toLowerCase();
  const catLower = category.toLowerCase();
  
  // Image Generation
  if (catLower.includes('image') || catLower.includes('photo') || catLower.includes('visual')) {
    if (varLower.includes('style') || varLower.includes('art style')) {
      return dropdownOptions.imageStyles;
    }
    if (varLower.includes('color') || varLower.includes('palette')) {
      return dropdownOptions.colorPalettes;
    }
    if (varLower.includes('resolution') || varLower.includes('quality') || varLower.includes('detail')) {
      return dropdownOptions.imageResolutions;
    }
    if (varLower.includes('light') || varLower.includes('lighting')) {
      return dropdownOptions.lightingOptions;
    }
  }
  
  // Video Generation
  if (catLower.includes('video') || catLower.includes('film') || catLower.includes('animation')) {
    if (varLower.includes('video_style') || varLower.includes('style')) {
      return dropdownOptions.videoStyles;
    }
    if (varLower.includes('resolution') || varLower.includes('video_resolution')) {
      return dropdownOptions.videoResolutions;
    }
    if (varLower.includes('frame') || varLower.includes('fps')) {
      return dropdownOptions.frameRates;
    }
    if (varLower.includes('aspect') || varLower.includes('ratio')) {
      return dropdownOptions.aspectRatios;
    }
    if (varLower.includes('length') || varLower.includes('duration')) {
      return dropdownOptions.videoLengths;
    }
  }
  
  // Business/Marketing
  if (catLower.includes('business') || catLower.includes('marketing') || catLower.includes('sales')) {
    if (varLower.includes('tone') || varLower.includes('voice') || varLower.includes('style')) {
      return dropdownOptions.businessTones;
    }
  }
  
  // Creative Writing
  if (catLower.includes('creative') || catLower.includes('writing') || catLower.includes('content')) {
    if (varLower.includes('style') || varLower.includes('writing_style')) {
      return dropdownOptions.writingStyles;
    }
    if (varLower.includes('genre')) {
      return dropdownOptions.genres;
    }
  }
  
  // Health & Wellness
  if (catLower.includes('health') || catLower.includes('medical') || catLower.includes('wellness')) {
    if (varLower.includes('tone') || varLower.includes('style')) {
      return dropdownOptions.medicalTones;
    }
  }
  
  // Legal & Compliance
  if (catLower.includes('legal') || catLower.includes('compliance') || catLower.includes('contract')) {
    if (varLower.includes('tone') || varLower.includes('style')) {
      return dropdownOptions.legalTones;
    }
  }
  
  // Finance & Investment
  if (catLower.includes('finance') || catLower.includes('investment') || catLower.includes('money')) {
    if (varLower.includes('tone') || varLower.includes('style')) {
      return dropdownOptions.financeTones;
    }
  }
  
  // Real Estate
  if (catLower.includes('real estate') || catLower.includes('property')) {
    if (varLower.includes('tone') || varLower.includes('style')) {
      return dropdownOptions.realEstateTones;
    }
  }
  
  // General fallbacks
  if (varLower.includes('complexity') || varLower.includes('level') || varLower.includes('difficulty')) {
    return dropdownOptions.complexityLevels;
  }
  
  if (varLower.includes('length') || varLower.includes('duration') || varLower.includes('time')) {
    return dropdownOptions.lengths;
  }
  
  if (varLower.includes('language') || varLower.includes('tone') && !catLower) {
    return dropdownOptions.languages;
  }
  
  if (varLower.includes('format') || varLower.includes('type')) {
    return dropdownOptions.formats;
  }
  
  // Default empty array if no match
  return [];
};

// Helper function to get AI platforms by type
export const getAIPlatforms = (type = 'text') => {
  return dropdownOptions.aiPlatforms[type] || dropdownOptions.aiPlatforms.text;
};

export default dropdownOptions;
