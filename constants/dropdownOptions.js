// constants/dropdownOptions.js

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
    'Pixel Art'
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
    'Ocean Blues'
  ],
  
  imageResolutions: [
    '8K Ultra HD - Maximum Detail',
    '4K High Detail',
    '2K Standard Detail', 
    'Full HD (1080p)',
    'Stylized & Clean',
    'Ultra Detailed, Professional'
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
    'High Contrast'
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
    'Whiteboard Animation'
  ],
  
  videoResolutions: [
    '8K Ultra HD (7680x4320)',
    '4K Ultra HD (3840x2160)',
    '2K (2560x1440)',
    '1080p Full HD',
    '720p HD'
  ],
  
  frameRates: [
    '60 fps (Ultra Smooth)',
    '30 fps (Standard)', 
    '24 fps (Cinematic)',
    '120 fps (Slow Motion)'
  ],
  
  aspectRatios: [
    '16:9 (Widescreen)',
    '9:16 (Vertical)',
    '1:1 (Square)',
    '21:9 (Cinematic)',
    '4:3 (Standard)',
    '2.35:1 (Anamorphic)'
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
    'Corporate'
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
    'Minimalist'
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
    'Exhaustive'
  ],
  
  // === AI PLATFORMS ===
  aiPlatforms: {
    image: [
      { value: 'Midjourney', label: 'Midjourney' },
      { value: 'DALL-E 3', label: 'DALL-E 3 (OpenAI)' },
      { value: 'Stable Diffusion', label: 'Stable Diffusion' },
      { value: 'Leonardo.ai', label: 'Leonardo.ai' },
      { value: 'Adobe Firefly', label: 'Adobe Firefly' }
    ],
    video: [
      { value: 'Runway Gen-2', label: 'Runway Gen-2' },
      { value: 'Pika Labs', label: 'Pika Labs' },
      { value: 'Stable Video', label: 'Stable Video Diffusion' },
      { value: 'HeyGen', label: 'HeyGen' },
      { value: 'Sora', label: 'Sora (OpenAI)' }
    ],
    text: [
      { value: 'GPT-5.2', label: 'GPT-5.2 Turbo' },
      { value: 'Claude', label: 'Claude 3.5' },
      { value: 'Gemini', label: 'Gemini Pro' },
      { value: 'Llama', label: 'Llama 3' }
    ]
  }
};