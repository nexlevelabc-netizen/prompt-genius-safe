import React, { useState, useEffect } from 'react';
import { templateAPI, testConnection } from './services/api.js';
import { 
  Sparkles, 
  Code2, 
  PenTool, 
  TrendingUp, 
  Zap, 
  Copy,
  Check,
  Star,
  Layers,
  Settings,
  Download,
  History,
  Bot,
  Cpu,
  RefreshCw,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Grid,
  List,
  Heart,
  BookOpen,
  Music,
  Film,
  Camera,
  Video,
  Dumbbell,
  Book,
  Newspaper,
  Plane,
  DollarSign,
  Scale,
  Truck,
  Users,
  TrendingUp as ChartUp,
  Home,
  Briefcase,
  Smartphone,
  Palette,
  MessageSquare,
  FileText,
  Brain,
  Code,
  Globe,
  Target,
  Award,
  Clock,
  BarChart,
  Shield,
  Music as MusicIcon,
  Coffee,
  GamepadIcon,
  GraduationCap,
  Wrench,
  VideoIcon,
  BriefcaseBusiness,
  UserCheck,
  Zap as Lightning,
  Diamond,
  Crown,
  Info
} from 'lucide-react';
import './App.css';

function App() {
  // Enhanced Google Fonts with premium options
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);
    
    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'true';
    document.head.appendChild(link2);
    
    // Premium font stack: Inter (sans-serif), JetBrains Mono (monospace), Source Serif Pro (serif for content)
    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Source+Serif+Pro:wght@400;600;700&display=swap';
    document.head.appendChild(link3);
    
    // Apply base font styles
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  }, []);

  // State management
  const [selectedTemplate, setSelectedTemplate] = useState('health-article');
  const [inputs, setInputs] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [aiContent, setAiContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [aiProvider, setAiProvider] = useState('openai');
  const [apiStatus, setApiStatus] = useState({ openai: false, templates: 0 });
  
  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState('templates');
  const [tones, setTones] = useState([]);
  const [expertMode, setExpertMode] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Fetch data on load
  useEffect(() => {
    fetchTemplates();
    checkAPIHealth();
    fetchTones();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await templateAPI.getTemplates();
      console.log('Templates loaded:', response.data.templates?.length || 0);
      setTemplates(response.data.templates || []);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      setTemplates([]);
    }
  };

  const fetchTones = async () => {
    try {
      const tonesList = [
        'Professional', 'Expert', 'Authoritative', 'Clinical', 'Technical',
        'Creative', 'Persuasive', 'Educational', 'Conversational', 'Formal',
        'Analytical', 'Strategic', 'Inspirational', 'Detailed', 'Comprehensive',
        'Casual', 'Friendly', 'Academic', 'Business', 'Marketing'
      ];
      setTones(tonesList);
    } catch (error) {
      console.error('Failed to fetch tones:', error);
    }
  };

  const checkAPIHealth = async () => {
    try {
      const response = await templateAPI.healthCheck();
      console.log('API Health:', response.data);
      setApiStatus({
        openai: response.data.services?.openai || false,
        templates: response.data.services?.templates || 0
      });
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Health check failed:', error);
      setApiStatus({ openai: false, templates: 0 });
      setConnectionStatus('disconnected');
      
      // Try direct connection test
      const test = await testConnection();
      if (test.success) {
        setConnectionStatus('connected');
        setApiStatus({
          openai: test.data.services?.openai || false,
          templates: test.data.services?.templates || 0
        });
      }
    }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Enhanced input label formatter - converts snake_case to readable text
  const formatVariableLabel = (variable) => {
    const labelMap = {
      // Medical/Health
      'presentation': 'Describe the Symptoms',
      'diagnosis_considerations': 'Possible Causes to Consider',
      'treatment_approach': 'Suggested Treatment Plan',
      'monitoring': 'What to Watch For (Follow-up)',
      'red_flags': 'Urgent Warning Signs',
      'complexity': 'Case Difficulty Level',
      'condition': 'Main Medical Condition',
      'demographic': 'Patient Information',
      'tone': 'Output Tone / Style',
      
      // Business/Marketing
      'target_audience': 'Target Audience',
      'product_service': 'Product or Service',
      'key_benefits': 'Key Benefits',
      'call_to_action': 'Call to Action',
      'unique_selling_proposition': 'Unique Selling Point',
      'brand_voice': 'Brand Voice',
      
      // Creative Writing
      'genre': 'Genre',
      'plot_summary': 'Plot Summary',
      'character_descriptions': 'Character Descriptions',
      'setting': 'Setting/Location',
      'theme': 'Theme/Mood',
      'writing_style': 'Writing Style',
      
      // Image Generation
      'subject': 'Main Subject',
      'style': 'Art Style',
      'color_palette': 'Color Palette',
      'composition': 'Composition/Layout',
      'lighting': 'Lighting',
      'mood': 'Mood/Atmosphere',
      'ai_model': 'AI Platform / Model',
      
      // General/Common
      'topic': 'Topic',
      'audience': 'Intended Audience',
      'purpose': 'Purpose/Goal',
      'key_points': 'Key Points to Include',
      'format': 'Output Format',
      'length': 'Desired Length',
      'examples': 'Examples/References',
      'level': 'Expertise Level',
      'language': 'Language/Tone',
      'requirements': 'Specific Requirements',
      'constraints': 'Limitations/Constraints',
      'goals': 'Desired Outcomes',
      'metrics': 'Success Metrics'
    };

    if (labelMap[variable]) {
      return labelMap[variable];
    }

    // Fallback: convert snake_case to readable text
    return variable
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
      .replace(/\bai\b/gi, 'AI')
      .replace(/\bapi\b/gi, 'API');
  };

  // Enhanced placeholder text generator
  const getPlaceholderText = (variable) => {
    const placeholderMap = {
      // Medical/Health
      'presentation': 'Describe how the condition looks/feels. Be detailed.',
      'diagnosis_considerations': 'List possible conditions to analyze. e.g., "gout, infection, fracture"',
      'treatment_approach': 'Describe the recommended care steps. e.g., "rest, medication, therapy"',
      'monitoring': 'List signs of improvement or worsening to track.',
      'red_flags': 'List symptoms that require immediate attention.',
      'complexity': 'Choose: Beginner | Intermediate | Advanced',
      'condition': 'e.g., "swelling in left ankle"',
      'demographic': 'e.g., "45-year-old male"',
      'tone': 'Choose tone for the output...',
      
      // Business/Marketing
      'target_audience': 'Describe your ideal customer or audience.',
      'product_service': 'Briefly describe what you offer.',
      'key_benefits': 'List main benefits or features.',
      'call_to_action': 'What should the audience do next?',
      'unique_selling_proposition': 'What makes you different?',
      'brand_voice': 'Describe your brand personality.',
      
      // Creative
      'plot_summary': 'Brief overview of the story.',
      'character_descriptions': 'Describe main characters.',
      'setting': 'Where and when does this take place?',
      'theme': 'What mood or message do you want?',
      'writing_style': 'Describe the writing approach.',
      
      // Image Generation
      'subject': 'What is the main focus?',
      'style': 'e.g., "photorealistic, cartoon, oil painting"',
      'color_palette': 'e.g., "warm tones, cool blues, vibrant"',
      'composition': 'e.g., "close-up, wide shot, portrait"',
      'lighting': 'e.g., "dramatic, soft, natural"',
      'mood': 'e.g., "mysterious, joyful, peaceful"',
      'ai_model': 'Choose AI platform: Midjourney | DALL-E 3 | Stable Diffusion | Leonardo.ai',
      
      // General
      'topic': 'What is this about?',
      'audience': 'Who will read/see this?',
      'purpose': 'What should this achieve?',
      'key_points': 'What must be included?',
      'format': 'e.g., "blog post, email, report"',
      'length': 'e.g., "brief, medium, detailed"',
      'examples': 'Provide examples for reference.',
      'level': 'Choose: Beginner | Intermediate | Advanced | Expert',
      'language': 'e.g., "formal, casual, technical"',
      'requirements': 'Any special needs?',
      'constraints': 'Any limitations to consider?',
      'goals': 'What are you trying to accomplish?',
      'metrics': 'How will you measure success?'
    };

    if (placeholderMap[variable]) {
      return placeholderMap[variable];
    }

    // Fallback based on variable type
    if (variable.includes('tone') || variable.includes('style') || variable.includes('voice')) {
      return 'Choose the appropriate tone...';
    } else if (variable.includes('level') || variable.includes('complexity') || variable.includes('difficulty')) {
      return 'Select the expertise level...';
    } else if (variable.includes('length') || variable.includes('duration') || variable.includes('time')) {
      return 'Select desired length...';
    } else if (variable.includes('type') || variable.includes('format') || variable.includes('category')) {
      return 'Select from options...';
    } else {
      return `Enter ${variable.replace(/_/g, ' ')}...`;
    }
  };

  // Get AI model help text
  const getAIModelHelpText = () => {
    return (
      <div className="ai-model-help">
        <div className="help-title">
          <Info size={14} />
          <span>Which AI platform should I choose?</span>
        </div>
        <div className="help-content">
          <div className="ai-option">
            <strong>Midjourney:</strong> Best for artistic/creative images, concept art, illustrations
          </div>
          <div className="ai-option">
            <strong>DALL-E 3 (OpenAI):</strong> Best for realistic images, detailed scenes, photography
          </div>
          <div className="ai-option">
            <strong>Stable Diffusion:</strong> Open-source, highly customizable, good for technical images
          </div>
          <div className="ai-option">
            <strong>Leonardo.ai:</strong> Great for game assets, character design, concept art
          </div>
          <div className="ai-option">
            <strong>Adobe Firefly:</strong> Best for commercial/safe content, marketing materials
          </div>
        </div>
      </div>
    );
  };

  // Filter templates by category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All Categories' || template.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories
  const categories = ['All Categories', ...new Set(templates.map(t => t.category))].filter(Boolean);

  // Get current template
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  // Enhanced category icons mapping
  const getCategoryIcon = (category) => {
    const icons = {
      'Health & Wellness': <Heart size={18} className="category-icon" />,
      'Image Generation': <Camera size={18} className="category-icon" />,
      'Business & Marketing': <Briefcase size={18} className="category-icon" />,
      'Creative Writing': <PenTool size={18} className="category-icon" />,
      'Technology': <Code size={18} className="category-icon" />,
      'Legal & Compliance': <Scale size={18} className="category-icon" />,
      'Finance & Investment': <DollarSign size={18} className="category-icon" />,
      'Real Estate': <Home size={18} className="category-icon" />,
      'Travel & Hospitality': <Plane size={18} className="category-icon" />,
      'Food & Culinary': <Coffee size={18} className="category-icon" />,
      'Music & Audio': <MusicIcon size={18} className="category-icon" />,
      'Fashion & Design': <Palette size={18} className="category-icon" />,
      'Gaming & Esports': <GamepadIcon size={18} className="category-icon" />,
      'Education': <GraduationCap size={18} className="category-icon" />,
      'Creative Content': <VideoIcon size={18} className="category-icon" />,
      'Personal Development': <UserCheck size={18} className="category-icon" />,
      'Default': <Layers size={18} className="category-icon" />
    };
    return icons[category] || icons['Default'];
  };

  const generatePrompt = async () => {
    if (!selectedTemplate) {
      alert('Please select a template first!');
      return;
    }

    setLoading(true);
    setGeneratedPrompt(null);
    setAiContent(null);
    setExpandedSection('results');
    
    try {
      const response = await templateAPI.generatePrompt(selectedTemplate, inputs);
      
      const templateName = response.data.template?.name || 
                          response.data.template?.id || 
                          currentTemplate?.name || 
                          selectedTemplate;
      
      setGeneratedPrompt({
        prompt: response.data.prompt || '',
        template: templateName,
        category: response.data.category || response.data.template?.category || '',
        subcategory: response.data.subcategory || response.data.template?.subcategory || '',
        metadata: response.data.metadata || {},
        expert_level: response.data.template?.expert_level || 'Professional'
      });
      
    } catch (error) {
      console.error('Error generating prompt:', error);
      setGeneratedPrompt({
        prompt: 'Error generating prompt. Please check your inputs and try again.',
        template: 'Error',
        category: 'Error',
        subcategory: '',
        metadata: {},
        expert_level: 'Error'
      });
    }
    
    setLoading(false);
  };

  const generateAIResponse = async () => {
    if (!generatedPrompt?.prompt) {
      alert('Please generate a prompt first!');
      return;
    }
    
    setAiLoading(true);
    
    try {
      const response = await templateAPI.generateAI(generatedPrompt.prompt, aiProvider);
      setAiContent({
        content: response.data.content || '',
        provider: response.data.provider || aiProvider,
        tokens: response.data.tokens || 0,
        wordCount: response.data.wordCount || (response.data.content ? response.data.content.split(/\s+/).length : 0),
        quality: response.data.quality || 'Standard',
        enhancement: response.data.enhancement || ''
      });
      
    } catch (error) {
      console.error('AI Generation Error:', error);
      setAiContent({
        content: `Error: ${error.response?.data?.error || 'AI generation failed. Please check your API keys.'}`,
        provider: aiProvider,
        tokens: 0,
        wordCount: 0,
        quality: 'Error',
        enhancement: ''
      });
    }
    
    setAiLoading(false);
  };

  const generateCompleteWorkflow = async () => {
    if (!selectedTemplate) {
      alert('Please select a template first!');
      return;
    }

    setLoading(true);
    setAiLoading(true);
    setGeneratedPrompt(null);
    setAiContent(null);
    setExpandedSection('results');
    
    try {
      const response = await templateAPI.completeWorkflow(selectedTemplate, inputs, aiProvider);
      
      const templateName = response.data.template?.name || 
                          response.data.template?.id || 
                          currentTemplate?.name || 
                          selectedTemplate;
      
      setGeneratedPrompt({
        prompt: response.data.prompt || '',
        template: templateName,
        category: response.data.template?.category || '',
        subcategory: response.data.template?.subcategory || '',
        metadata: response.data.metadata || {},
        expert_level: response.data.template?.expert_level || 'Professional'
      });
      
      setAiContent({
        content: response.data.aiResponse?.content || '',
        provider: response.data.aiResponse?.provider || aiProvider,
        tokens: response.data.aiResponse?.tokens || 0,
        wordCount: response.data.aiResponse?.wordCount || 
                  (response.data.aiResponse?.content ? response.data.aiResponse.content.split(/\s+/).length : 0),
        quality: response.data.aiResponse?.quality || 'Standard',
        enhancement: response.data.aiResponse?.enhancement || '',
        category_optimized: response.data.aiResponse?.category_optimized || false
      });
      
    } catch (error) {
      console.error('Complete Workflow Error:', error);
      setGeneratedPrompt({
        prompt: 'Error in complete workflow. Please try again.',
        template: 'Error',
        category: 'Error',
        subcategory: '',
        metadata: {},
        expert_level: 'Error'
      });
    }
    
    setLoading(false);
    setAiLoading(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const exportPrompt = () => {
    if (!generatedPrompt) return;
    
    const content = `PROMPT GENIUS - EXPERT PROMPT
Template: ${generatedPrompt.template}
Category: ${generatedPrompt.category} > ${generatedPrompt.subcategory}
Expert Level: ${generatedPrompt.expert_level}
Generated: ${new Date().toISOString()}

${generatedPrompt.prompt}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expert-prompt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAIContent = () => {
    if (!aiContent) return;
    
    const content = `PROMPT GENIUS - AI EXPERT RESPONSE
Provider: ${aiContent.provider}
Quality: ${aiContent.quality}
Tokens: ${aiContent.tokens}
Generated: ${new Date().toISOString()}
Enhancement: ${aiContent.enhancement || 'Standard'}

${aiContent.content}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-expert-response-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to render AI content with beautiful formatting
  const renderAIContent = (content) => {
    if (!content) return content;
    
    // Convert markdown-style formatting to HTML
    const formattedContent = content
      // Headers
      .replace(/^# (.*$)/gim, '<h1 class="ai-header">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="ai-subheader">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="ai-subsubheader">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="ai-section">$1</h4>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="ai-bold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em class="ai-italic">$1</em>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ai-list-item">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ai-list-item">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ai-ordered-item">$1. $2</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="ai-code-block"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="ai-inline-code">$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="ai-blockquote">$1</blockquote>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="ai-paragraph">')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph if no HTML tags yet
    if (!formattedContent.includes('<')) {
      return `<p class="ai-paragraph">${formattedContent}</p>`;
    }
    
    // Wrap loose list items in ul/ol
    let withLists = formattedContent;
    const listItemRegex = /<li class="ai-list-item">(.*?)<\/li>/g;
    const listMatches = [...withLists.matchAll(listItemRegex)];
    
    if (listMatches.length > 0) {
      withLists = withLists.replace(listItemRegex, '</ul><ul class="ai-unordered-list"><li class="ai-list-item">$1</li>');
      withLists = withLists.replace('</ul>', '', 1) + '</ul>';
    }
    
    const orderedItemRegex = /<li class="ai-ordered-item">(.*?)<\/li>/g;
    const orderedMatches = [...withLists.matchAll(orderedItemRegex)];
    
    if (orderedMatches.length > 0) {
      withLists = withLists.replace(orderedItemRegex, '</ol><ol class="ai-ordered-list"><li class="ai-ordered-item">$1</li>');
      withLists = withLists.replace('</ol>', '', 1) + '</ol>';
    }
    
    return withLists;
  };

  // Connection test function
  const testBackendConnection = async () => {
    try {
      const result = await testConnection();
      if (result.success) {
        alert(`✅ Backend Connected!\n\nTemplates: ${result.data.services?.templates || 0}\nOpenAI: ${result.data.services?.openai ? 'Active' : 'Inactive'}\n Version: ${result.data.services?._version || 'Unknown'}`);
        checkAPIHealth();
      } else {
        alert(`❌ Connection Failed\n\nURL: ${result.url}\nError: ${result.error}`);
      }
    } catch (error) {
      alert('Connection test failed. Check console for details.');
      console.error('Connection test error:', error);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="logo">
            <Sparkles className="logo-icon" />
            <h1>Prompt<span className="gradient-text">Genius</span></h1>
            <div className="badge">{templates.length}+ EXPERT TEMPLATES</div>
          </div>
          
          <div className="ai-status">
            <div className="status-item">
              <Bot size={16} />
              <span>-5.2 Expert</span>
              <div className={`status-dot ${apiStatus.openai ? 'live' : 'offline'}`}></div>
            </div>
            <div className="expert-mode-toggle">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={expertMode}
                  onChange={(e) => setExpertMode(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <span>Expert Mode</span>
                <Crown size={14} style={{ marginLeft: '4px' }} />
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h3>
              <Layers className="icon" />
              Expert Categories
            </h3>
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.slice(0, 6).map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setExpandedSection('templates');
                }}
              >
                {getCategoryIcon(category)}
                <span>{category.split(' ')[0]}</span>
              </button>
            ))}
            
            {categories.length > 6 && (
              <div className="dropdown-categories">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setExpandedSection('templates');
                  }}
                  className="category-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search expert templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Templates List */}
          <div className="template-scroll">
            <div className={`template-container ${viewMode}`}>
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.id ? 'selected' : ''} ${template.expert_level === 'Professional' ? 'premium' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setExpandedSection('customize');
                  }}
                >
                  <div className="template-icon">
                    {getCategoryIcon(template.category)}
                    {template.expert_level === 'Professional' && (
                      <div className="premium-badge">
                        <Crown size={12} />
                      </div>
                    )}
                  </div>
                  <div className="template-info">
                    <h4>
                      {template.name}
                      {template.expert_level === 'Professional' && (
                        <span style={{ color: '#f59e0b', marginLeft: '6px' }}>
                          <Diamond size={12} />
                        </span>
                      )}
                    </h4>
                    <p className="template-desc">{template.description}</p>
                    <div className="template-tags">
                      <span className="tag category">{template.category}</span>
                      <span className="tag subcategory">{template.subcategory}</span>
                      {template.expert_level === 'Professional' && (
                        <span className="tag premium">Expert</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="sidebar-footer">
            <div className="stats">
              <div className="stat">
                <span className="stat-number">{filteredTemplates.length}</span>
                <span className="stat-label">Templates</span>
              </div>
              <div className="stat">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">{apiStatus.openai ? '-4' : 'Offline'}</span>
                <span className="stat-label">AI Status</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="content">
          {/* Connection Status Banner */}
          {connectionStatus === 'checking' && (
            <div className="connection-banner checking">
              <RefreshCw className="spinner-icon" size={16} />
              <span>Checking backend connection...</span>
            </div>
          )}
          
          {connectionStatus === 'disconnected' && (
            <div className="connection-banner disconnected">
              <X size={16} />
              <span>Backend connection failed. </span>
              <button onClick={testBackendConnection} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {/* Collapsible Sections */}
          <div className="sections-container">
            {/* Templates Section */}
            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => setExpandedSection(expandedSection === 'templates' ? null : 'templates')}
              >
                <h3>
                  <Layers className="icon" />
                  {selectedCategory === 'All Categories' ? 'All Expert Templates' : `${selectedCategory} Templates`}
                  <span className="count-badge">{filteredTemplates.length}</span>
                </h3>
                {expandedSection === 'templates' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSection === 'templates' && (
                <div className="section-content">
                  <div className="category-grid">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {getCategoryIcon(category)}
                        {category}
                      </button>
                    ))}
                  </div>
                  
                  {/* Template Statistics */}
                  <div className="template-stats">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Award size={20} />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">{templates.filter(t => t.expert_level === 'Professional').length}</div>
                        <div className="stat-label">Expert Templates</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Target size={20} />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">{categories.length}</div>
                        <div className="stat-label">Specializations</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Brain size={20} />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">-4</div>
                        <div className="stat-label">AI Model</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customize Section */}
            <div className="section-card">
              <div 
                className="section-header"
                onClick={() => setExpandedSection(expandedSection === 'customize' ? null : 'customize')}
              >
                <h3>
                  <PenTool className="icon" />
                  Expert Prompt Customization
                  {currentTemplate && (
                    <span className="template-name">{currentTemplate.name}</span>
                  )}
                </h3>
                {expandedSection === 'customize' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSection === 'customize' && currentTemplate && (
                <div className="section-content">
                  <div className="template-preview">
                    <div className="preview-header">
                      <h4>
                        {currentTemplate.name}
                        {currentTemplate.expert_level === 'Professional' && (
                          <span className="expert-badge">
                            <Crown size={14} />
                            Expert Grade
                          </span>
                        )}
                      </h4>
                      <div className="preview-tags">
                        <span className="tag category">{currentTemplate.category}</span>
                        <span className="tag subcategory">{currentTemplate.subcategory}</span>
                        <span className="tag ai">
                          <Zap size={12} />
                          -4 Optimized
                        </span>
                      </div>
                    </div>
                    <p className="preview-desc">{currentTemplate.description}</p>
                    
                    <div className="template-complexity">
                      <div className="complexity-indicator">
                        <span>Complexity:</span>
                        <div className="complexity-bar">
                          <div className="complexity-fill" style={{ width: '75%' }}></div>
                        </div>
                        <span>Advanced</span>
                      </div>
                    </div>
                  </div>

                  <div className="input-grid">
                    {currentTemplate.variables && currentTemplate.variables.map(variable => (
                      <div className="input-group" key={variable}>
                        <label>
                          <strong>{formatVariableLabel(variable)}</strong>
                          <span className="hint">
                            {variable.includes('tone') ? '(Select tone for best results)' : 
                             variable.includes('level') || variable.includes('complexity') ? '(Higher level = More expert output)' :
                             variable.includes('length') || variable.includes('duration') ? '(Longer = More detailed content)' :
                             '(Be specific for best results)'}
                          </span>
                        </label>
                        
                        {variable === 'ai_model' ? (
                          <>
                            <select
                              value={inputs[variable] || ''}
                              onChange={(e) => handleInputChange(variable, e.target.value)}
                              className="input-field"
                            >
                              <option value="">Select AI platform...</option>
                              <option value="Midjourney">Midjourney (Best for artistic/creative)</option>
                              <option value="DALL-E 3">DALL-E 3 (Best for realistic images)</option>
                              <option value="Stable Diffusion">Stable Diffusion (Open-source, customizable)</option>
                              <option value="Leonardo.ai">Leonardo.ai (Great for game assets)</option>
                              <option value="Adobe Firefly">Adobe Firefly (Commercial/safe content)</option>
                              <option value="-4">-4 (Text generation)</option>
                              <option value="Claude">Claude (Text analysis)</option>
                              <option value="Gemini">Gemini (Google AI)</option>
                            </select>
                            {getAIModelHelpText()}
                          </>
                        ) : variable.includes('tone') || variable.includes('style') || variable.includes('voice') ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select {variable.includes('tone') ? 'tone' : 'style'}...</option>
                            {tones.map(tone => (
                              <option key={tone} value={tone}>
                                {tone}
                              </option>
                            ))}
                          </select>
                        ) : variable.includes('duration') || variable.includes('length') || variable.includes('time') ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select length...</option>
                            <option value="brief">Brief (Concise overview)</option>
                            <option value="standard">Standard (Comprehensive)</option>
                            <option value="detailed">Detailed (In-depth analysis)</option>
                            <option value="comprehensive">Comprehensive (Expert-level detail)</option>
                          </select>
                        ) : variable.includes('level') || variable.includes('complexity') || variable.includes('difficulty') ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select expertise level...</option>
                            <option value="beginner">Beginner (Basic concepts)</option>
                            <option value="intermediate">Intermediate (Practical application)</option>
                            <option value="advanced">Advanced (Professional depth)</option>
                            <option value="expert">Expert (Industry mastery)</option>
                          </select>
                        ) : variable.includes('type') || variable.includes('format') || variable.includes('category') ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select {variable.replace(/_/g, ' ')}...</option>
                            <option value="blog">Blog Post</option>
                            <option value="email">Email</option>
                            <option value="report">Report</option>
                            <option value="article">Article</option>
                            <option value="social">Social Media</option>
                            <option value="script">Script</option>
                          </select>
                        ) : variable === 'genre' ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select genre...</option>
                            <option value="fiction">Fiction</option>
                            <option value="nonfiction">Non-Fiction</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="scifi">Science Fiction</option>
                            <option value="mystery">Mystery</option>
                            <option value="romance">Romance</option>
                            <option value="horror">Horror</option>
                          </select>
                        ) : variable.includes('language') ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select language style...</option>
                            <option value="formal">Formal</option>
                            <option value="casual">Casual</option>
                            <option value="technical">Technical</option>
                            <option value="conversational">Conversational</option>
                            <option value="academic">Academic</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder={getPlaceholderText(variable)}
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="expert-options">
                    <h4>Expert Configuration</h4>
                    <div className="options-grid">
                      <div className="option-group">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>Include Best Practices</span>
                        </label>
                      </div>
                      <div className="option-group">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>Add Technical Details</span>
                        </label>
                      </div>
                      <div className="option-group">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>Include Examples</span>
                        </label>
                      </div>
                      <div className="option-group">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span>Optimize for AI</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      onClick={generatePrompt}
                      disabled={loading}
                      className="action-btn primary"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="spinner-icon" />
                          Generating Expert Prompt...
                        </>
                      ) : (
                        <>
                          <PenTool size={18} />
                          Generate Expert Prompt
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={generateCompleteWorkflow}
                      disabled={loading || aiLoading}
                      className="action-btn success"
                    >
                      {loading || aiLoading ? (
                        <>
                          <RefreshCw className="spinner-icon" />
                          Full Expert Workflow...
                        </>
                      ) : (
                        <>
                          <Zap size={18} />
                          Generate Prompt + AI Expert Response
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {generatedPrompt && (
              <div className="section-card">
                <div 
                  className="section-header"
                  onClick={() => setExpandedSection(expandedSection === 'results' ? null : 'results')}
                >
                  <h3>
                    <Sparkles className="icon" />
                    Expert Results
                    <span className="results-badge">
                      <Diamond size={12} />
                      Professional Grade
                    </span>
                  </h3>
                  {expandedSection === 'results' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                
                {expandedSection === 'results' && (
                  <div className="section-content">
                    {/* Generated Prompt */}
                    <div className="result-card">
                      <div className="result-header">
                        <h4>
                          <Crown size={18} style={{ marginRight: '8px' }} />
                          Expert-Grade Prompt
                          <span className="ai-model">{generatedPrompt.expert_level}</span>
                        </h4>
                        <div className="result-actions">
                          <button
                            onClick={() => copyToClipboard(generatedPrompt.prompt)}
                            className="action-btn small"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                          <button onClick={exportPrompt} className="action-btn small">
                            <Download size={16} />
                            Export
                          </button>
                        </div>
                      </div>
                      
                      <div className="prompt-output expert">
                        <pre>{generatedPrompt.prompt}</pre>
                      </div>

                      <div className="result-meta expert">
                        <div className="meta-item">
                          <strong>Template:</strong> {generatedPrompt.template || 'N/A'}
                        </div>
                        <div className="meta-item">
                          <strong>Specialization:</strong> {generatedPrompt.category || 'N/A'} › {generatedPrompt.subcategory || 'N/A'}
                        </div>
                        <div className="meta-item">
                          <strong>Expert Level:</strong> {generatedPrompt.expert_level || 'Professional'}
                        </div>
                        <div className="meta-item">
                          <strong>Complexity:</strong> {generatedPrompt.metadata?.complexity || 'High'}
                        </div>
                        <div className="meta-item">
                          <strong>Quality:</strong> {generatedPrompt.metadata?.quality || 'Expert Grade'}
                        </div>
                      </div>

                      {/* AI Actions */}
                      <div className="ai-actions">
                        <button
                          onClick={generateAIResponse}
                          disabled={aiLoading}
                          className="ai-action-btn"
                        >
                          {aiLoading ? (
                            <>
                              <RefreshCw className="spinner-icon" />
                              Generating AI Expert Response...
                            </>
                          ) : (
                            <>
                              <Brain size={18} />
                              Get -4 Expert Analysis
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* AI Response */}
                    {aiContent && (
                      <div className="result-card ai-response expert">
                        <div className="result-header">
                          <h4>
                            <Brain size={18} style={{ marginRight: '8px' }} />
                            AI Expert Response
                            <span className="ai-model">
                              {aiContent.provider === 'openai' ? '-4' : 'Gemini Pro'} • {aiContent.quality}
                            </span>
                          </h4>
                          <div className="result-actions">
                            <button
                              onClick={() => copyToClipboard(aiContent.content)}
                              className="action-btn small"
                            >
                              {copied ? <Check size={16} /> : <Copy size={16} />}
                              Copy
                            </button>
                            <button onClick={exportAIContent} className="action-btn small">
                              <Download size={16} />
                              Export
                            </button>
                          </div>
                        </div>
                        
                        <div className="ai-content expert">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: renderAIContent(aiContent.content) 
                            }} 
                          />
                        </div>

                        <div className="result-meta expert">
                          <div className="meta-item">
                            <strong>AI Provider:</strong> {aiContent.provider === 'openai' ? '-4 Turbo' : 'Gemini Pro'}
                          </div>
                          {aiContent.wordCount && (
                            <div className="meta-item">
                              <strong>Analysis Depth:</strong> {aiContent.wordCount} words
                            </div>
                          )}
                          {aiContent.tokens && (
                            <div className="meta-item">
                              <strong>Processing:</strong> {aiContent.tokens} tokens
                            </div>
                          )}
                          {aiContent.enhancement && (
                            <div className="meta-item">
                              <strong>Enhancement:</strong> {aiContent.enhancement}
                            </div>
                          )}
                          {aiContent.category_optimized && (
                            <div className="meta-item">
                              <strong>Optimization:</strong> Category-specific
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats Footer */}
          <div className="content-footer">
            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Award size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{templates.length}</div>
                  <div className="stat-label">Expert Templates</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Brain size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{apiStatus.openai ? '-4' : 'Offline'}</div>
                  <div className="stat-label">AI Engine</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Target size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{categories.length}</div>
                  <div className="stat-label">Specializations</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <BarChart size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">Expert</div>
                  <div className="stat-label">Quality Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {copied && (
        <div className="toast">
          <Check size={18} />
          Copied to clipboard!
        </div>
      )}

      {/* Connection Test Button (Bottom Right) */}
      <div className="connection-test-fab">
        <button 
          onClick={testBackendConnection}
          className={`connection-btn ${connectionStatus}`}
          title="Test Backend Connection"
        >
          {connectionStatus === 'connected' ? (
            <Check size={16} />
          ) : connectionStatus === 'checking' ? (
            <RefreshCw className="spinner-icon" size={16} />
          ) : (
            <X size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
