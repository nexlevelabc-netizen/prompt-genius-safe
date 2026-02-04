import React, { useState, useEffect } from 'react';
import { templateAPI } from './services/api.js';
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
  FileText
} from 'lucide-react';
import './App.css';

function App() {
  // Add Google Fonts on mount
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
    link3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link3);
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
  const [apiStatus, setApiStatus] = useState({ openai: false, gemini: false });
  
  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Health');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState('templates'); // 'templates', 'customize', 'results'
  const [tones, setTones] = useState([]);

  // Fetch data on load
  useEffect(() => {
    fetchTemplates();
    checkAPIHealth();
    fetchTones();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await templateAPI.getTemplates();
      setTemplates(response.data.templates || []);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      setTemplates([]);
    }
  };

  const fetchTones = async () => {
    try {
      const tonesList = [
        'professional', 'conversational', 'authoritative', 'friendly',
        'informative', 'persuasive', 'formal', 'casual', 'enthusiastic',
        'empathetic', 'analytical', 'creative', 'technical', 'simple',
        'academic', 'journalistic', 'human'
      ];
      setTones(tonesList);
    } catch (error) {
      console.error('Failed to fetch tones:', error);
    }
  };

  const checkAPIHealth = async () => {
    try {
      const response = await templateAPI.healthCheck();
      setApiStatus(response.data.services || { openai: false, gemini: false });
    } catch (error) {
      console.error('Health check failed:', error);
      setApiStatus({ openai: false, gemini: false });
    }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Filter templates by category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories
  const categories = ['All', ...new Set(templates.map(t => t.category))].filter(Boolean);

  // Get current template
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  // Category icons mapping
  const getCategoryIcon = (category) => {
    const icons = {
      'Health': <Heart size={18} />,
      'Relationship': <Users size={18} />,
      'History': <Book size={18} />,
      'Image Generation': <Camera size={18} />,
      'Video Generation': <Video size={18} />,
      'Fitness': <Dumbbell size={18} />,
      'Religion': <BookOpen size={18} />,
      'Documentary': <Film size={18} />,
      'Business': <Briefcase size={18} />,
      'Technology': <Smartphone size={18} />,
      'Education': <BookOpen size={18} />,
      'Creative Writing': <PenTool size={18} />,
      'Travel': <Plane size={18} />,
      'Music': <Music size={18} />,
      'Movies': <Film size={18} />,
      'Entertainment': <Palette size={18} />,
      'Erotic': <Heart size={18} />,
      'Demography': <Users size={18} />,
      'News': <Newspaper size={18} />,
      'Finance': <DollarSign size={18} />,
      'Justice': <Scale size={18} />,
      'Transport': <Truck size={18} />
    };
    return icons[category] || <Layers size={18} />;
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
      // FIX: Ensure template is a string, not an object
      const templateName = response.data.template?.name || 
                          response.data.template?.id || 
                          currentTemplate?.name || 
                          selectedTemplate;
      
      setGeneratedPrompt({
        prompt: response.data.prompt || '',
        template: templateName, // Now a string, not object
        category: response.data.category || response.data.template?.category || '',
        subcategory: response.data.subcategory || response.data.template?.subcategory || '',
        metadata: response.data.metadata || {}
      });
      
    } catch (error) {
      console.error('Error generating prompt:', error);
      setGeneratedPrompt({
        prompt: 'Error generating prompt. Please check your inputs and try again.',
        template: 'Error',
        category: 'Error',
        subcategory: '',
        metadata: {}
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
        wordCount: response.data.wordCount || (response.data.content ? response.data.content.split(/\s+/).length : 0)
      });
      
    } catch (error) {
      console.error('AI Generation Error:', error);
      setAiContent({
        content: `Error: ${error.response?.data?.error || 'AI generation failed. Please check your API keys.'}`,
        provider: aiProvider,
        tokens: 0,
        wordCount: 0
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
        template: templateName, // String, not object
        category: response.data.template?.category || '',
        subcategory: response.data.template?.subcategory || '',
        metadata: response.data.metadata || {}
      });
      
      setAiContent({
        content: response.data.aiResponse?.content || '',
        provider: response.data.aiResponse?.provider || aiProvider,
        tokens: response.data.aiResponse?.tokens || 0,
        wordCount: response.data.aiResponse?.wordCount || 
                  (response.data.aiResponse?.content ? response.data.aiResponse.content.split(/\s+/).length : 0)
      });
      
    } catch (error) {
      console.error('Complete Workflow Error:', error);
      setGeneratedPrompt({
        prompt: 'Error in complete workflow. Please try again.',
        template: 'Error',
        category: 'Error',
        subcategory: '',
        metadata: {}
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
    
    const blob = new Blob([generatedPrompt.prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAIContent = () => {
    if (!aiContent) return;
    
    const blob = new Blob([aiContent.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-response-${Date.now()}.txt`;
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
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li>$1. $2</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph if no HTML tags yet
    if (!formattedContent.includes('<')) {
      return `<p>${formattedContent}</p>`;
    }
    
    // Wrap loose list items in ul/ol
    const withLists = formattedContent
      .replace(/<li>(.*?)<\/li>/g, (match, p1) => {
        if (p1.match(/^\d+\. /)) {
          return match;
        }
        return match;
      });
    
    return withLists;
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
            <h1>Prompt<span className="gradient-text">Pro</span></h1>
            <div className="badge">50+ TEMPLATES</div>
          </div>
          
          <div className="ai-status">
            <div className="status-item">
              <Bot size={16} />
              <span>{aiProvider === 'openai' ? 'GPT-4 Turbo' : 'Gemini'}</span>
              <div className={`status-dot ${apiStatus.openai ? 'live' : 'offline'}`}></div>
            </div>
            <select 
              value={aiProvider} 
              onChange={(e) => setAiProvider(e.target.value)}
              className="provider-select"
            >
              <option value="openai">🤖 GPT-4 Turbo</option>
              <option value="gemini">🔷 Gemini Pro</option>
            </select>
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
            {categories.slice(0, 8).map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setExpandedSection('templates');
                }}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </button>
            ))}
            
            {categories.length > 8 && (
              <div className="dropdown-categories">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setExpandedSection('templates');
                  }}
                  className="category-select"
                >
                  <option value="All">All Categories</option>
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
              placeholder="Search templates..."
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
                  className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setExpandedSection('customize');
                  }}
                >
                  <div className="template-icon">
                    {getCategoryIcon(template.category)}
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
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
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="content">
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
                  {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
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
                      <h4>{currentTemplate.name}</h4>
                      <div className="preview-tags">
                        <span className="tag">{currentTemplate.category}</span>
                        <span className="tag">{currentTemplate.subcategory}</span>
                      </div>
                    </div>
                    <p className="preview-desc">{currentTemplate.description}</p>
                  </div>

                  <div className="input-grid">
                    {currentTemplate.variables && currentTemplate.variables.map(variable => (
                      <div className="input-group" key={variable}>
                        <label>
                          {variable.charAt(0).toUpperCase() + variable.slice(1).replace(/([A-Z])/g, ' $1')}
                          {variable === 'tone' && (
                            <span className="hint">(Try "human" for natural tone)</span>
                          )}
                        </label>
                        {variable === 'tone' ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select {variable}...</option>
                            {tones.map(tone => (
                              <option key={tone} value={tone}>
                                {tone.charAt(0).toUpperCase() + tone.slice(1)}
                              </option>
                            ))}
                          </select>
                        ) : variable === 'duration' || variable === 'length' ? (
                          <select
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select {variable}...</option>
                            <option value="short">Short (100-200 words)</option>
                            <option value="medium">Medium (300-500 words)</option>
                            <option value="long">Long (500+ words)</option>
                            <option value="5 minutes">5 minutes</option>
                            <option value="10 minutes">10 minutes</option>
                            <option value="30 minutes">30 minutes</option>
                            <option value="1 hour">1 hour</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder={`Enter ${variable}`}
                            value={inputs[variable] || ''}
                            onChange={(e) => handleInputChange(variable, e.target.value)}
                            className="input-field"
                          />
                        )}
                      </div>
                    ))}
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
                          Generating...
                        </>
                      ) : (
                        <>
                          <PenTool size={18} />
                          Generate Prompt
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
                          Full AI Workflow...
                        </>
                      ) : (
                        <>
                          <Zap size={18} />
                          Generate Prompt + AI Response
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
                    Generated Results
                    <span className="results-badge">New</span>
                  </h3>
                  {expandedSection === 'results' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                
                {expandedSection === 'results' && (
                  <div className="section-content">
                    {/* Generated Prompt */}
                    <div className="result-card">
                      <div className="result-header">
                        <h4>✨ Generated Prompt</h4>
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
                      
                      <div className="prompt-output">
                        <pre>{generatedPrompt.prompt}</pre>
                      </div>

                      <div className="result-meta">
                        <div className="meta-item">
                          <strong>Template:</strong> {generatedPrompt.template || 'N/A'}
                        </div>
                        <div className="meta-item">
                          <strong>Category:</strong> {generatedPrompt.category || 'N/A'} {generatedPrompt.subcategory ? `› ${generatedPrompt.subcategory}` : ''}
                        </div>
                        {generatedPrompt.metadata?.isHumanTone && (
                          <div className="meta-item">
                            <strong>Tone:</strong> Human (Natural)
                          </div>
                        )}
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
                              Generating AI Response...
                            </>
                          ) : (
                            <>
                              <Bot size={18} />
                              Get {aiProvider === 'openai' ? 'GPT-4 Turbo' : 'Gemini Pro'} Response
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* AI Response */}
                    {aiContent && (
                      <div className="result-card ai-response">
                        <div className="result-header">
                          <h4>🤖 AI Response</h4>
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
                        
                        <div className="ai-content">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: renderAIContent(aiContent.content) 
                            }} 
                          />
                        </div>

                        <div className="result-meta">
                          <div className="meta-item">
                            <strong>Provider:</strong> {aiContent.provider === 'openai' ? 'GPT-4 Turbo' : 'Gemini Pro'}
                          </div>
                          {aiContent.wordCount && (
                            <div className="meta-item">
                              <strong>Words:</strong> {aiContent.wordCount}
                            </div>
                          )}
                          {aiContent.tokens && (
                            <div className="meta-item">
                              <strong>Tokens:</strong> {aiContent.tokens}
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
                  <Layers size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{templates.length}</div>
                  <div className="stat-label">Total Templates</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Bot size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{apiStatus.openai ? 'Live' : 'Offline'}</div>
                  <div className="stat-label">AI Status</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Zap size={20} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{categories.length}</div>
                  <div className="stat-label">Categories</div>
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
    </div>
  );
}

export default App;
