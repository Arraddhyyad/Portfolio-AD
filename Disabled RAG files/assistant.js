// Enhanced AI Assistant v3.0 - Local RAG Implementation
// Semantic retrieval with FAISS embeddings (no API required)

class EnhancedAssistant {
    constructor() {
        // DOM elements
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.toggleBtn = document.getElementById('toggle-assistant');
        this.assistant = document.getElementById('ai-assistant');
        this.dock = document.getElementById('assistant-dock');
        
        // Context bubble for hover insights
        this.contextBubble = this.createContextBubble();
        
        // State
        this.isExpanded = true;
        this.currentSection = 'home';
        this.hasGreeted = false;
        this.isTyping = false;
        
        // Conversational memory
        this.memory = {
            topics: new Set(),
            lastTopic: null,
            questionCount: 0,
            userInterests: []
        };
        
        // Initialize RAG system
        this.ragSystem = new LocalRAGSystem();
        
        // Initialize
        this.setupEventListeners();
        this.setupHoverInsights();
        this.initializeGreeting();
    }
    
    // ===== SYSTEM PROMPT =====
    get SYSTEM_PROMPT() {
        return `You are the AI assistant embedded inside Aradhya's portfolio. You represent her work accurately and professionally.

You are precise, calm, technically grounded, and forward-looking.

You do not exaggerate achievements.
You do not hallucinate missing details.
You answer clearly and concisely.

If information is not present in the retrieved context, you explicitly say so.

Tone requirements:
- Prefer short structured answers
- Use bullet points when appropriate
- Avoid long paragraphs
- Avoid buzzwords and fluff
- Avoid dramatic phrasing
- Avoid emojis
- Never use "As an AI language model..."

Response structure:
- Start directly with substance
- No unnecessary intro phrases
- If multiple areas referenced, use short sections
- Synthesize information, don't copy verbatim

Hallucination guardrails:
- Only use information from retrieved context
- If answer not supported by context, say you do not have that information
- Do not fabricate details

You represent Aradhya intelligently — not as a generic chatbot.`;
    }
    
    // ===== INITIALIZATION =====
    
    setupEventListeners() {
        // Chat input
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });
        
        // Toggle assistant
        this.toggleBtn.addEventListener('click', () => this.toggleAssistant());
        this.dock.addEventListener('click', () => this.expandAssistant());
        
        // Section navigation tracking
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                this.currentSection = e.target.dataset.section;
                if (this.isExpanded) {
                    this.minimizeAssistant();
                }
            });
        });
    }
    
    createContextBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'context-bubble hidden';
        bubble.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 30px;
            background: rgba(0, 15, 25, 0.95);
            border: 1px solid var(--accent-cyan);
            border-radius: 8px;
            padding: 12px 16px;
            max-width: 300px;
            color: var(--text-secondary);
            font-size: 0.85rem;
            font-family: 'JetBrains Mono', monospace;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(bubble);
        return bubble;
    }
    
    setupHoverInsights() {
        // Project cards
        document.querySelectorAll('.project-card').forEach(card => {
            const projectKey = card.dataset.project;
            const insights = {
                'arc-agi': "Not just training models — training them to adapt.",
                'mcp-server': "Three LLMs working together. Harder than it sounds.",
                'sustainify': "36 hours. Zero sleep. Complete system.",
                'monetizeme': "4 APIs, 4 auth flows, one weekend."
            };
            
            const insight = insights[projectKey];
            if (insight) {
                card.addEventListener('mouseenter', () => this.showContextBubble(insight));
                card.addEventListener('mouseleave', () => this.hideContextBubble());
            }
        });
        
        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            const year = item.dataset.year;
            let insight = null;
            
            if (year && year.includes('Oct 2024')) insight = "Where infrastructure became more important than algorithms.";
            else if (year && year.includes('Spring 2025')) insight = "Trade-offs aren't compromises — they're decisions.";
            else if (year && year.includes('Summer 2025')) insight = "Where calm became a technical skill.";
            else if (year && year.includes('Fall 2025')) insight = "Integration hell. Worth it.";
            else if (year === 'Present') insight = "Building systems that understand humans.";
            
            if (insight) {
                item.addEventListener('mouseenter', () => this.showContextBubble(insight));
                item.addEventListener('mouseleave', () => this.hideContextBubble());
            }
        });
    }
    
    showContextBubble(text) {
        this.contextBubble.textContent = text;
        this.contextBubble.classList.remove('hidden');
        setTimeout(() => {
            this.contextBubble.style.opacity = '1';
        }, 10);
    }
    
    hideContextBubble() {
        this.contextBubble.style.opacity = '0';
        setTimeout(() => {
            this.contextBubble.classList.add('hidden');
        }, 300);
    }
    
    // ===== GREETING SYSTEM =====
    
    async initializeGreeting() {
        if (this.hasGreeted) return;
        
        await this.delay(800);
        
        const introLines = [
            "I'm Aradhya's RAG-powered portfolio assistant.",
            "I translate her work into stories.",
            "Ask me anything about her experience or projects — I'll give you the real context behind the bullet points."
        ];
        
        for (let i = 0; i < introLines.length; i++) {
            await this.addMessage(introLines[i], 'assistant');
            await this.delay(i === 0 ? 1200 : 1800);
        }
        
        this.hasGreeted = true;
    }
    
    // ===== MESSAGE HANDLING =====
    
    async handleUserMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Track in memory
        this.memory.questionCount++;
        
        // Show typing indicator
        this.isTyping = true;
        const typingId = this.showTypingIndicator();
        
        // Simulate thinking delay
        await this.delay(600 + Math.random() * 400);
        
        // Generate response using RAG
        const response = await this.generateResponse(message);
        
        // Remove typing indicator
        this.removeTypingIndicator(typingId);
        this.isTyping = false;
        
        // Add response
        await this.addMessage(response, 'assistant');
    }
    
    // ===== CORE RAG RESPONSE GENERATION =====
    
    async generateResponse(query) {
        const lower = query.toLowerCase();
        
        // Handle greetings directly
        if (this.isGreeting(lower)) {
            return this.buildGreetingResponse();
        }
        
        // Handle identity questions directly
        if (this.matchesAny(lower, ['who are you', 'what are you', 'your role'])) {
            return `I'm Aradhya's RAG-powered portfolio assistant.

I translate her work into stories.

Ask me anything about her experience or projects —
I'll give you the real context behind the bullet points.`;
        }
        
        // Use RAG for substantive queries
        const ragResponse = await this.ragSystem.query(query);
        
        if (ragResponse && ragResponse.hasContext) {
            return this.synthesizeResponse(ragResponse);
        }
        
        // Fallback if no relevant context found
        return this.buildFallbackResponse(query);
    }
    
    synthesizeResponse(ragResponse) {
        // Synthesize retrieved chunks into coherent response
        // Do not copy verbatim - synthesize
        
        const chunks = ragResponse.relevantChunks;
        
        if (chunks.length === 0) {
            return "I don't have documented information about that in her portfolio.";
        }
        
        // Group chunks by section
        const bySection = {};
        chunks.forEach(chunk => {
            const section = chunk.metadata.section || 'general';
            if (!bySection[section]) bySection[section] = [];
            bySection[section].push(chunk);
        });
        
        // Build structured response
        let response = '';
        
        // Prioritize most relevant section
        const sections = Object.keys(bySection);
        const primarySection = sections[0];
        
        if (sections.length === 1) {
            // Single section - direct synthesis
            response = this.synthesizeSection(bySection[primarySection]);
        } else {
            // Multiple sections - structured synthesis
            sections.forEach((section, idx) => {
                if (idx > 0) response += '\n\n';
                response += this.synthesizeSection(bySection[section]);
            });
        }
        
        return response;
    }
    
    synthesizeSection(chunks) {
        // Combine chunk content intelligently
        // Remove redundancy, maintain narrative flow
        
        const contents = chunks.map(c => c.content).join('\n\n');
        
        // Simple synthesis: combine and clean
        // In production, this would use an LLM for better synthesis
        return contents;
    }
    
    buildGreetingResponse() {
        const greetings = [
            "Hey there.",
            "Hi.",
            "Hello.",
            "Hey."
        ];
        return this.randomFrom(greetings);
    }
    
    buildFallbackResponse(query) {
        const lower = query.toLowerCase();
        
        // Determine fallback type
        let type = 'general';
        
        if (this.matchesAny(lower, ['personal', 'family', 'relationship', 'private'])) {
            type = 'personal';
        } else if (this.matchesAny(lower, ['confidential', 'proprietary', 'secret'])) {
            type = 'confidential';
        } else if (this.matchesAny(lower, ['will', 'going to', 'might', 'future predictions'])) {
            type = 'speculative';
        } else {
            type = 'outOfScope';
        }
        
        return FallbackResponses.build(type, true, type === 'outOfScope');
    }
    
    // ===== UI METHODS =====
    
    async addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'assistant') {
            // Typing effect for assistant
            contentDiv.textContent = '';
            messageDiv.appendChild(contentDiv);
            this.chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
            
            await this.typeMessage(contentDiv, text);
        } else {
            // Instant for user
            contentDiv.textContent = text;
            messageDiv.appendChild(contentDiv);
            this.chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }
    
    async typeMessage(element, text, speed = 20) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            this.scrollToBottom();
            await this.delay(speed);
        }
    }
    
    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message assistant typing-indicator';
        indicator.innerHTML = '<div class="message-content"><span></span><span></span><span></span></div>';
        indicator.id = 'typing-' + Date.now();
        this.chatMessages.appendChild(indicator);
        this.scrollToBottom();
        return indicator.id;
    }
    
    removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) indicator.remove();
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    // ===== TOGGLE & MINIMIZE =====
    
    toggleAssistant() {
        if (this.isExpanded) {
            this.minimizeAssistant();
        } else {
            this.expandAssistant();
        }
    }
    
    minimizeAssistant() {
        this.assistant.classList.remove('expanded');
        this.assistant.classList.add('minimizing');
        
        setTimeout(() => {
            this.assistant.classList.add('hidden');
            this.assistant.classList.remove('minimizing');
            this.dock.classList.remove('hidden');
            this.isExpanded = false;
        }, 400);
    }
    
    expandAssistant() {
        this.dock.classList.add('hidden');
        this.assistant.classList.remove('hidden');
        this.assistant.classList.add('expanding');
        
        setTimeout(() => {
            this.assistant.classList.add('expanded');
            this.assistant.classList.remove('expanding');
            this.isExpanded = true;
        }, 10);
    }
    
    // ===== UTILITIES =====
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    matchesAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    isGreeting(text) {
        const greetings = ['hi', 'hello', 'hey', 'sup', 'yo', 'hi there', 'hello there'];
        return greetings.some(g => text === g || text === g + '.' || text === g + '!');
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EnhancedAssistant());
} else {
    new EnhancedAssistant();
}
