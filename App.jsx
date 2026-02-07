import React, { useState, useEffect } from 'react';
import { templateAPI, testConnection } from './services/api.js';
import { 
  Sparkles, 
  PenTool, 
  Zap, 
  Copy, 
  Check,
  Layers,
  Download,
  Bot,
  RefreshCw,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Grid,
  List,
  Heart,
  Camera,
  Briefcase,
  Code,
  Scale,
  DollarSign,
  Home,
  Plane,
  Coffee,
  Music as MusicIcon,
  Palette,
  GamepadIcon,
  GraduationCap,
  VideoIcon,
  UserCheck,
  Video,
  Crown,
  Diamond,
  Brain,
  Award,
  Target,
  BarChart
} from 'lucide-react';
import './App.css';

// Import dropdown options
import { dropdownOptions } from './constants/dropdownOptions.js';

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
    
    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap';
    document.head.appendChild(link3);
    
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
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Fetch data on load
  useEffect(() => {
    fetchTemplates();
    checkAPIHealth();
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

  // Enhanced input label formatter
  const formatVariableLabel = (variable) => {
    const labelMap = {
      // Medical and Health
      'presentation': 'Describe the Symptoms',
      'diagnosis_considerations': 'Possible Causes to Consider',
      'treatment_approach': 'Suggested Treatment Plan',
      'monitoring': 'What to Watch For Follow up',
      'red_flags': 'Urgent Warning Signs',
      'complexity': 'Case Difficulty Level',
      'condition': 'Main Medical Condition',
      'demographic': 'Patient Information',
      'tone': 'Output Tone and Style',
      
      // Business and Marketing
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
      'setting': 'Setting and Location',
      'theme': 'Theme and Mood',
      'writing_style': 'Writing Style',
      
      // Image Generation
      'subject': 'Main Subject',
      'style': 'Art Style',
      'color_palette': 'Color Palette',
      'composition': 'Composition and Layout',
      'lighting': 'Lighting',
      'mood': 'Mood and Atmosphere',
      'ai_model': 'AI Platform',
      'resolution': 'Resolution',
      
      // Video Generation
      'video_subject': 'Video Subject',
      'video_style': 'Video Style',
      'video_length': 'Video Length',
      'aspect_ratio': 'Aspect Ratio',
      'frame_rate': 'Frame Rate',
      'video_resolution': 'Video Resolution',
      'video_ai_model': 'Video AI Platform',
      
      // General
      'topic': 'Topic',
      'audience': 'Intended Audience',
      'purpose': 'Purpose and Goal',
      'key_points': 'Key Points to Include',
      'format': 'Output Format',
      'length': 'Desired Length',
      'examples': 'Examples and References',
      'level': 'Expertise Level',
      'language': 'Language and Tone',
      'requirements': 'Specific Requirements',
      'constraints': 'Limitations and Constraints',
      'goals': 'Desired Outcomes',
      'metrics': 'Success Metrics'
    };

    if (labelMap[variable]) {
      return labelMap[variable];
    }

    return variable
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
      .replace(/\bai\b/gi, 'AI')
      .replace(/\bapi\b/gi, 'API');
  };

  // Get dropdown options for ANY variable based on its name
  const getDropdownOptionsForVariable = (variable) => {
    if (!dropdownOptions || typeof dropdownOptions !== 'object') {
      return [];
    }

    // Medical and Health variables
    if (variable.includes('tone') && (variable.includes('medical') || variable.includes('health') || variable.includes('clinical'))) {
      return dropdownOptions.medicalTones || ['Professional', 'Clinical', 'Technical', 'Educational', 'Compassionate', 'Authoritative'];
    }
    if (variable.includes('complexity') || variable.includes('difficulty')) {
      return dropdownOptions.expertiseLevels || ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    }
    if (variable.includes('demographic')) {
      return ['Child (0-12)', 'Teenager (13-19)', 'Adult (20-64)', 'Senior (65+)', 'Male', 'Female', 'All ages'];
    }
    
    // Business and Marketing variables
    if (variable.includes('tone') && (variable.includes('business') || variable.includes('marketing'))) {
      return dropdownOptions.businessTones || ['Professional', 'Persuasive', 'Informative', 'Conversational', 'Formal', 'Friendly'];
    }
    if (variable.includes('target_audience')) {
      return ['Business Professionals', 'Entrepreneurs', 'Students', 'Consumers', 'Investors', 'General Public'];
    }
    if (variable.includes('brand_voice')) {
      return ['Professional', 'Friendly', 'Authoritative', 'Innovative', 'Luxury', 'Casual'];
    }
    
    // Creative Writing variables
    if (variable.includes('genre')) {
      return dropdownOptions.writingGenres || ['Fiction', 'Non-fiction', 'Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror'];
    }
    if (variable.includes('writing_style')) {
      return dropdownOptions.writingStyles || ['Descriptive', 'Narrative', 'Persuasive', 'Expository', 'Creative', 'Technical'];
    }
    if (variable.includes('theme')) {
      return ['Love', 'Adventure', 'Conflict', 'Growth', 'Justice', 'Freedom', 'Identity'];
    }
    
    // Image Generation variables
    if (variable.includes('style') && variable.includes('image')) {
      return dropdownOptions.imageStyles || ['Realistic', 'Photorealistic', 'Digital Art', 'Watercolor', 'Oil Painting', 'Sketch', 'Anime', 'Cartoon'];
    }
    if (variable.includes('color_palette')) {
      return dropdownOptions.colorPalettes || ['Warm', 'Cool', 'Vibrant', 'Pastel', 'Monochromatic', 'Earth Tones', 'Neon'];
    }
    if (variable.includes('lighting')) {
      return dropdownOptions.lightingOptions || ['Natural Light', 'Studio Lighting', 'Dramatic', 'Soft', 'Golden Hour', 'Night', 'Backlit'];
    }
    if (variable.includes('mood')) {
      return ['Happy', 'Mysterious', 'Peaceful', 'Energetic', 'Melancholy', 'Inspiring', 'Serious'];
    }
    if (variable.includes('ai_model')) {
      return dropdownOptions.aiPlatforms?.image || ['DALL-E 3', 'Midjourney', 'Stable Diffusion', 'Adobe Firefly'];
    }
    if (variable.includes('resolution')) {
      return dropdownOptions.imageResolutions || ['1024x1024', '1024x1792', '1792x1024', '512x512', '768x768'];
    }
    
    // Video Generation variables
    if (variable.includes('video_style')) {
      return dropdownOptions.videoStyles || ['Cinematic', 'Documentary', 'Animation', 'Tutorial', 'Promotional', 'Social Media'];
    }
    if (variable.includes('video_length')) {
      return dropdownOptions.videoLengths || ['15 seconds', '30 seconds', '1 minute', '2 minutes', '5 minutes', '10 minutes'];
    }
    if (variable.includes('aspect_ratio')) {
      return dropdownOptions.aspectRatios || ['16:9', '9:16', '1:1', '4:5', '21:9'];
    }
    if (variable.includes('frame_rate')) {
      return dropdownOptions.frameRates || ['24fps', '30fps', '60fps', '120fps'];
    }
    if (variable.includes('video_resolution')) {
      return dropdownOptions.videoResolutions || ['1080p', '4K', '720p', '1440p'];
    }
    if (variable.includes('video_ai_model')) {
      return dropdownOptions.aiPlatforms?.video || ['Runway ML', 'Pika Labs', 'Sora', 'Stable Video'];
    }
    
    // General variables - FALLBACK for ANY variable
    if (variable.includes('tone') || variable.includes('style') || variable.includes('voice')) {
      return ['Professional', 'Casual', 'Formal', 'Friendly', 'Authoritative', 'Conversational', 'Technical'];
    }
    if (variable.includes('level') || variable.includes('complexity') || variable.includes('difficulty')) {
      return ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    }
    if (variable.includes('length') || variable.includes('duration')) {
      return dropdownOptions.lengths || ['Short', 'Medium', 'Long', 'Detailed'];
    }
    if (variable.includes('format')) {
      return ['Paragraph', 'List', 'Step-by-step', 'Bullet points', 'Essay', 'Report'];
    }
    if (variable.includes('language')) {
      return ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean'];
    }
    if (variable.includes('audience')) {
      return ['General Public', 'Experts', 'Students', 'Professionals', 'Beginners', 'Advanced Users'];
    }
    
    // Default empty array - will render as text input
    return [];
  };

  // Check if variable should use dropdown
  const shouldUseDropdown = (variable) => {
    const options = getDropdownOptionsForVariable(variable);
    return options.length > 0;
  };

  // Get placeholder text
  const getPlaceholderText = (variable) => {
    if (shouldUseDropdown(variable)) {
      return 'Select an option';
    }
    
    const placeholderMap = {
      'presentation': 'Describe how the condition looks and feels',
      'diagnosis_considerations': 'List possible conditions to analyze',
      'treatment_approach': 'Describe the recommended care steps',
      'condition': 'Example: swelling in left ankle',
      'demographic': 'Example: 45 year old male',
      'subject': 'What is the main focus',
      'plot_summary': 'Brief overview of the story',
      'character_descriptions': 'Describe main characters',
      'video_subject': 'Describe the scene or action',
      'topic': 'What is this about',
      'key_points': 'What must be included',
      'examples': 'Provide examples for reference'
    };

    return placeholderMap[variable] || `Enter ${variable.replace(/_/g, ' ')}`;
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
      'Health and Wellness': <Heart size={18} className="category-icon" />,
      'Image Generation': <Camera size={18} className="category-icon" />,
      'Business and Marketing': <Briefcase size={18} className="category-icon" />,
      'Creative Writing': <PenTool size={18} className="category-icon" />,
      'Technology': <Code size={18} className="category-icon" />,
      'Legal and Compliance': <Scale size={18} className="category-icon" />,
      'Finance and Investment': <DollarSign size={18} className="category-icon" />,
      'Real Estate': <Home size={18} className="category-icon" />,
      'Travel and Hospitality': <Plane size={18} className="category-icon" />,
      'Food and Culinary': <Coffee size={18} className="category-icon" />,
      'Music and Audio': <MusicIcon size={18} className="category-icon" />,
      'Fashion and Design': <Palette size={18} className="category-icon" />,
      'Gaming and Esports': <GamepadIcon size={18} className="category-icon" />,
      'Education': <GraduationCap size={18} className="category-icon" />,
      'Creative Content': <VideoIcon size={18} className="category-icon" />,
      'Personal Development': <UserCheck size={18} className="category-icon" />,
      'Video Generation': <Video size={18} className="category-icon" />,
      'Default': <Layers size={18} className="category-icon" />
    };
    return icons[category] || icons['Default'];
  };

  const generatePrompt = async () => {
    if (!selectedTemplate) {
      alert('Please select a template first');
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
        expert_level: 'Professional'
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

  // REMOVED: generateAIResponse function since we don't want AI analysis tab

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
    
    const content = `PROMPT GENIUS EXPERT PROMPT
Template: ${generatedPrompt.template}
Category: ${generatedPrompt.category} ${generatedPrompt.subcategory}
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

  // Connection test function
  const testBackendConnection = async () => {
    try {
      const result = await testConnection();
      if (result.success) {
        alert(`✅ Backend Connected\n\nTemplates: ${result.data.services?.templates || 0}\nAI Service: ${result.data.services?.openai ? 'Active' : 'Inactive'}`);
        checkAPIHealth();
      } else {
        alert(`❌ Connection Failed\n\nURL: ${result.url}\nError: ${result.error}`);
      }
    } catch (error) {
      alert('Connection test failed. Check console for details.');
      console.error('Connection test error:', error);
    }
  };

  // Mobile sidebar toggle
  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mobile template selection handler
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setExpandedSection('customize');
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  // Render input field - ALL categories get dropdowns where possible
  const renderInputField = (variable) => {
    const dropdownOptionsList = getDropdownOptionsForVariable(variable);
    const hasDropdown = dropdownOptionsList.length > 0;
    
    if (hasDropdown) {
      return (
        <select
          value={inputs[variable] || ''}
          onChange={(e) => handleInputChange(variable, e.target.value)}
          className="input-field"
        >
          <option value="">Select {formatVariableLabel(variable).toLowerCase()}</option>
          {dropdownOptionsList.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      );
    }
    
    // Text input for free-text fields
    return (
      <input
        type="text"
        placeholder={getPlaceholderText(variable)}
        value={inputs[variable] || ''}
        onChange={(e) => handleInputChange(variable, e.target.value)}
        className="input-field"
      />
    );
  };

  return (
    <div className="app">
      {/* Header - REMOVED all AI branding */}
      <header className="header">
        <div className="header-content">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="menu-label">Menu</span>
          </button>
          
          <div className="logo">
            <Sparkles className="logo-icon" />
            <h1>Prompt<span className="gradient-text">Genius</span></h1>
            <div className="badge">{templates.length}+ Templates</div>
          </div>
          
          <div className="ai-status">
            <div className="status-item">
              <Bot size={16} />
              <span>AI Ready</span>
              <div className={`status-dot ${apiStatus.openai ? 'live' : 'offline'}`}></div>
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
              Categories
            </h3>
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={16} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
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
              placeholder="Search templates"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search templates"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
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
                  onClick={() => handleTemplateSelect(template.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleTemplateSelect(template.id);
                    }
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
                <span className="stat-number">{apiStatus.openai ? 'Ready' : 'Offline'}</span>
                <span className="stat-label">Status</span>
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
              <span>Checking connection</span>
            </div>
          )}
          
          {connectionStatus === 'disconnected' && (
            <div className="connection-banner disconnected">
              <X size={16} />
              <span>Connection failed</span>
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
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setExpandedSection(expandedSection === 'templates' ? null : 'templates');
                  }
                }}
              >
                <h3>
                  <Layers className="icon" />
                  {selectedCategory === 'All Categories' ? 'All Templates' : `${selectedCategory} Templates`}
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
                        <div className="stat-label">Premium</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Target size={20} />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">{categories.length}</div>
                        <div className="stat-label">Categories</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Brain size={20} />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">AI</div>
                        <div className="stat-label">Powered</div>
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
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setExpandedSection(expandedSection === 'customize' ? null : 'customize');
                  }
                }}
              >
                <h3>
                  <PenTool className="icon" />
                  Customize Prompt
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
                            Premium
                          </span>
                        )}
                      </h4>
                      <div className="preview-tags">
                        <span className="tag category">{currentTemplate.category}</span>
                        <span className="tag subcategory">{currentTemplate.subcategory}</span>
                        <span className="tag ai">
                          <Zap size={12} />
                          AI Optimized
                        </span>
                      </div>
                    </div>
                    <p className="preview-desc">{currentTemplate.description}</p>
                    
                    <div className="template-complexity">
                      <div className="complexity-indicator">
                        <span>Complexity</span>
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
                            {shouldUseDropdown(variable) ? 
                             'Select option for best results' : 
                             'Be specific for best results'}
                          </span>
                        </label>
                        
                        {renderInputField(variable)}
                      </div>
                    ))}
                  </div>

                  <div className="expert-options">
                    <h4>Configuration Options</h4>
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
                          <span>Optimize Output</span>
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
                          Generating Prompt
                        </>
                      ) : (
                        <>
                          <PenTool size={18} />
                          Generate Expert Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section - SIMPLIFIED, NO AI ANALYSIS */}
            {generatedPrompt && (
              <div className="section-card">
                <div 
                  className="section-header"
                  onClick={() => setExpandedSection(expandedSection === 'results' ? null : 'results')}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpandedSection(expandedSection === 'results' ? null : 'results');
                    }
                  }}
                >
                  <h3>
                    <Sparkles className="icon" />
                    Generated Prompt
                    <span className="results-badge">
                      <Diamond size={12} />
                      Ready
                    </span>
                  </h3>
                  {expandedSection === 'results' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                
                {expandedSection === 'results' && (
                  <div className="section-content">
                    {/* Generated Prompt Only */}
                    <div className="result-card">
                      <div className="result-header">
                        <h4>
                          <Crown size={18} style={{ marginRight: '8px' }} />
                          Expert Prompt
                          <span className="ai-model">Premium</span>
                        </h4>
                        <div className="result-actions">
                          <button
                            onClick={() => copyToClipboard(generatedPrompt.prompt)}
                            className="action-btn small"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy'}
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
                          <strong>Template</strong> {generatedPrompt.template || 'N A'}
                        </div>
                        <div className="meta-item">
                          <strong>Category</strong> {generatedPrompt.category || 'N A'} {generatedPrompt.subcategory || 'N A'}
                        </div>
                        <div className="meta-item">
                          <strong>Quality</strong> {generatedPrompt.expert_level || 'Premium'}
                        </div>
                        <div className="meta-item">
                          <strong>Complexity</strong> {generatedPrompt.metadata?.complexity || 'Advanced'}
                        </div>
                      </div>
                    </div>
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
                  <div className="stat-label">Templates</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Brain size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{apiStatus.openai ? 'Ready' : 'Offline'}</div>
                  <div className="stat-label">AI Service</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Target size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{categories.length}</div>
                  <div className="stat-label">Categories</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <BarChart size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">Premium</div>
                  <div className="stat-label">Quality</div>
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
          Copied to clipboard
        </div>
      )}

      {/* Connection Test Button */}
      <div className="connection-test-fab">
        <button 
          onClick={testBackendConnection}
          className={`connection-btn ${connectionStatus}`}
          title="Test Connection"
          aria-label="Test connection"
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
