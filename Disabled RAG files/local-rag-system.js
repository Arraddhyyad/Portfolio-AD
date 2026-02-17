// Local RAG System v1.0
// Semantic search with local embeddings (no API required)
// Uses TensorFlow.js Universal Sentence Encoder

class LocalRAGSystem {
    constructor() {
        this.model = null;
        this.chunks = [];
        this.embeddings = [];
        this.initialized = false;
        
        this.initialize();
    }
    
    async initialize() {
        try {
            // Load Universal Sentence Encoder (local, no API)
            await this.loadModel();
            
            // Create semantic chunks from knowledge base
            this.chunks = this.createSemanticChunks();
            
            // Generate embeddings for all chunks
            await this.generateEmbeddings();
            
            this.initialized = true;
            console.log('[RAG] System initialized with', this.chunks.length, 'chunks');
        } catch (error) {
            console.error('[RAG] Initialization failed:', error);
            // Fallback to keyword matching if embeddings fail
            this.initialized = false;
        }
    }
    
    async loadModel() {
        // Load Universal Sentence Encoder from TensorFlow Hub
        // This runs entirely in browser, no API calls
        if (typeof use === 'undefined') {
            console.warn('[RAG] TensorFlow.js USE not loaded, using keyword fallback');
            return;
        }
        
        this.model = await use.load();
        console.log('[RAG] Embedding model loaded');
    }
    
    createSemanticChunks() {
        const chunks = [];
        
        // ===== EXPERIENCE CHUNKS =====
        
        // MLFTC Research
        chunks.push({
            id: 'exp_mlftc_1',
            content: `Research Aide at Mary Lou Fulton Teachers College, ASU (October 2024 - January 2026).

This was foundation work — learning to build reliable, reproducible data systems.

She reduced processing time from 8 hours to 45 minutes through systematic optimization.

Built automated analysis infrastructure that established research rigor across 500+ analyses.`,
            metadata: {
                section: 'experience',
                organization: 'MLFTC',
                time_period: '2024-2026',
                technologies: ['Python', 'ML Pipeline', 'Data Infrastructure']
            }
        });
        
        chunks.push({
            id: 'exp_mlftc_2',
            content: `The hardest part at MLFTC wasn't the algorithms — it was learning that research-grade code and production code are two very different things.

Her first pipeline took 8 hours to run. She fixed it through systematic optimization, bringing it down to 45 minutes.

This taught her that elegance isn't just about the model — it's about the entire pipeline.

Where she learned that infrastructure is what makes AI actually work.`,
            metadata: {
                section: 'experience',
                organization: 'MLFTC',
                type: 'growth',
                technologies: ['Pipeline Optimization']
            }
        });
        
        // Sustainify
        chunks.push({
            id: 'exp_sustainify_1',
            content: `Full-Stack Developer at HackPrinceton Spring 2025.

36 hours to build a complete sustainability platform from database schema to deployment.

Built and deployed a complete platform serving 200+ active users.

Full system: React frontend, Django REST backend, PostgreSQL database, Docker deployment.

All in 36 hours.`,
            metadata: {
                section: 'experience',
                organization: 'HackPrinceton',
                time_period: '2025',
                technologies: ['React', 'Django', 'PostgreSQL', 'Docker']
            }
        });
        
        chunks.push({
            id: 'exp_sustainify_2',
            content: `The hardest lesson at Sustainify came at hour 8 when she tried to make the auth system perfect.

Wasted 3 hours.

That's when she learned: ship first, optimize later.

She chose to make the auth system perfect instead of functional. Three hours later, she realized perfectionism is the enemy of delivery.

Shipped a working system. Users didn't care about the auth elegance — they cared that it worked.

Where she learned that trade-offs aren't compromises — they're decisions.`,
            metadata: {
                section: 'experience',
                organization: 'HackPrinceton',
                type: 'lesson',
                technologies: []
            }
        });
        
        // Tech Mahindra
        chunks.push({
            id: 'exp_techmahindra_1',
            content: `AI Intern at Makers Lab, Tech Mahindra (May 2025 - August 2025).

Enterprise-level AI automation running daily workflows — not experimental prototypes.

Architected multi-agent systems processing 1,000+ automated tasks daily.

Built LLM-powered workflows that automated HR email processing with 85% accuracy.`,
            metadata: {
                section: 'experience',
                organization: 'Tech Mahindra',
                time_period: '2025',
                technologies: ['Multi-Agent Systems', 'LLM', 'RAG', 'FAISS']
            }
        });
        
        chunks.push({
            id: 'exp_techmahindra_2',
            content: `The most technically demanding challenge at Tech Mahindra was building the ARC AGI-2 meta-learning system while learning Siamese networks, triplet loss, Bayesian hyperparameter tuning, and MAML from scratch.

It required understanding how models adapt — not just how they train.

Built RAG pipelines using FAISS and embedding retrieval.
Implemented MAML meta-learning for few-shot adaptation.
Used Bayesian optimization to accelerate convergence by 40%.

The infrastructure — prompt chains, context management, error recovery — is what separated demos from production.`,
            metadata: {
                section: 'experience',
                organization: 'Tech Mahindra',
                type: 'technical',
                technologies: ['MAML', 'Siamese Networks', 'FAISS', 'RAG', 'Bayesian Optimization']
            }
        });
        
        chunks.push({
            id: 'exp_techmahindra_3',
            content: `Her 3-agent system crashed right before a major presentation at Tech Mahindra.

Instead of panicking, she debugged calmly and found the issue: expired API tokens.

That moment reinforced something she now believes deeply — calm is a technical skill.

She builds infrastructure around AI — not just prompt wrappers.

Error handling became 70% of her codebase and 90% of what mattered.`,
            metadata: {
                section: 'experience',
                organization: 'Tech Mahindra',
                type: 'failure_story',
                technologies: []
            }
        });
        
        // VR Research
        chunks.push({
            id: 'exp_vr_1',
            content: `VR & AI Research Assistant at Motionverse Lab, ASU (Present).

Human-computer interaction meets machine learning.

She's working on systems that understand when you're cognitively stuck — not just what you're doing, but how you're thinking.

Building VR environments integrated with ML models for cognitive load detection.

The goal: systems that know you're stuck before you do.`,
            metadata: {
                section: 'experience',
                organization: 'Motionverse Lab',
                time_period: 'Present',
                technologies: ['VR', 'Unity', 'ML', 'Cognitive Load Detection']
            }
        });
        
        chunks.push({
            id: 'exp_vr_2',
            content: `The VR research challenge is subtle — distinguishing between focused concentration and cognitive overload.

It requires understanding human behavior patterns, not just performance metrics.

She's interested in AI that enhances human capability — not replaces it.

Building systems that understand humans, not just process data.`,
            metadata: {
                section: 'experience',
                organization: 'Motionverse Lab',
                type: 'philosophy',
                technologies: ['VR', 'ML']
            }
        });
        
        // ===== PROJECT CHUNKS =====
        
        // ARC AGI-2
        chunks.push({
            id: 'proj_arc_1',
            content: `ARC AGI-2 – Meta-Learning System for few-shot reasoning.

ARC AGI-2 is a global reasoning challenge.

Instead of building a narrow solution, she wanted a system that could learn how to learn.

Used MAML (Model-Agnostic Meta-Learning) for few-shot adaptation.

MAML trains a model that can adapt quickly to new problems with minimal data — ideal for few-shot reasoning environments.`,
            metadata: {
                section: 'projects',
                project: 'ARC AGI-2',
                technologies: ['MAML', 'Siamese Networks', 'Triplet Loss', 'Bayesian Optimization']
            }
        });
        
        chunks.push({
            id: 'proj_arc_2',
            content: `ARC AGI-2 technical components:

Siamese network architecture for pattern matching.
Triplet loss for structured representation learning.
Bayesian hyperparameter tuning for optimization.
Automated evaluation framework for continuous testing.

She was new to Siamese architectures and Bayesian optimization.

Learning theory while implementing production-ready systems was her steepest technical growth phase.

Not just training models — training models to adapt.`,
            metadata: {
                section: 'projects',
                project: 'ARC AGI-2',
                type: 'technical',
                technologies: ['Siamese Networks', 'Triplet Loss', 'MAML', 'Bayesian Optimization']
            }
        });
        
        // MCP Server
        chunks.push({
            id: 'proj_mcp_1',
            content: `MCP Server – Multi-Agent Orchestration system.

Multi-agent systems are harder than they look.

Three LLMs working together taught her about coordination, not just capability.

Built a server architecture where three Claude instances collaborate on complex tasks.

One plans, one executes, one validates.

The challenge was coordination — making sure they don't talk past each other.`,
            metadata: {
                section: 'projects',
                project: 'MCP Server',
                technologies: ['Multi-Agent Systems', 'LLM', 'Orchestration']
            }
        });
        
        chunks.push({
            id: 'proj_mcp_2',
            content: `Agent orchestration is like herding very intelligent, stubborn cats.

Each agent has its own context, its own understanding of the task.

Making them work together required careful prompt engineering and state management.

Multi-agent systems force you to think about how intelligence components interact — not just how they perform individually.

Three LLMs, one goal. Harder than it sounds.`,
            metadata: {
                section: 'projects',
                project: 'MCP Server',
                type: 'technical_challenge',
                technologies: ['Multi-Agent Systems']
            }
        });
        
        // Sustainify Project
        chunks.push({
            id: 'proj_sustainify_1',
            content: `Sustainify – Full-Stack Sustainability Platform (HackPrinceton Spring 2025).

36 hours to build something meaningful.

A complete platform connecting users to sustainable consumption choices.

Database schema, API design, frontend, deployment — everything in 36 hours.

PostgreSQL over MongoDB — relational data won.
REST over GraphQL — simpler to debug at 3am.
Docker for deployment — reproducibility mattered.`,
            metadata: {
                section: 'projects',
                project: 'Sustainify',
                technologies: ['React', 'Django', 'PostgreSQL', 'Docker', 'REST']
            }
        });
        
        chunks.push({
            id: 'proj_sustainify_2',
            content: `Every architectural decision at Sustainify was permanent. No time to rebuild.

She had to choose fast and commit.

200+ active users. Complete system. Zero sleep. Worth it.

Where sleep was optional, but deliverables weren't.`,
            metadata: {
                section: 'projects',
                project: 'Sustainify',
                type: 'outcome',
                technologies: []
            }
        });
        
        // MonetizeMe
        chunks.push({
            id: 'proj_monetizeme_1',
            content: `MonetizeMe – AI-Powered Time Optimization (HackPrinceton Fall 2025).

4 external APIs, 36 hours, integration hell.

Orchestrates Calendar, Fitbit, and Knot APIs for intelligent time and energy optimization.

The AI wasn't the hard part — the infrastructure around it was.

Four different auth flows. Four different rate limits. Four different data formats.

OAuth documentation at 2am is its own special kind of meditation.`,
            metadata: {
                section: 'projects',
                project: 'MonetizeMe',
                technologies: ['FastAPI', 'OAuth', 'Multi-API Integration']
            }
        });
        
        chunks.push({
            id: 'proj_monetizeme_2',
            content: `Critical decision for MonetizeMe: FastAPI over Flask — async support was essential for coordinating 4 simultaneous API calls.

Production moment: Assumed all APIs return JSON. Knot returned XML. 4am debugging. Added XML parser. Shipped.

600+ participants across 119 universities.

Demonstrated that multi-API orchestration is harder than people think — and she can do it.

The boring infrastructure is what makes AI actually useful.`,
            metadata: {
                section: 'projects',
                project: 'MonetizeMe',
                type: 'technical_challenge',
                technologies: ['FastAPI', 'Async', 'XML Parsing']
            }
        });
        
        // ===== SKILLS CHUNKS =====
        
        chunks.push({
            id: 'skills_aiml',
            content: `Her AI/ML toolkit includes PyTorch, TensorFlow, LangChain, GPT-4, FAISS, RAG.

She specializes in agentic systems, meta-learning, few-shot learning, and production ML infrastructure.

AI/ML is the capability layer. The interesting part is building systems where intelligence is part of the architecture, not the headline.`,
            metadata: {
                section: 'skills',
                category: 'AI/ML',
                technologies: ['PyTorch', 'TensorFlow', 'LangChain', 'FAISS', 'RAG', 'MAML', 'Multi-Agent Systems']
            }
        });
        
        chunks.push({
            id: 'skills_software',
            content: `On the software engineering side: Python, FastAPI, Django, React, PostgreSQL, Docker, Microservices.

Software engineering is the foundation. Systems thinking is what makes it scalable.`,
            metadata: {
                section: 'skills',
                category: 'Software',
                technologies: ['Python', 'FastAPI', 'Django', 'React', 'PostgreSQL', 'Docker']
            }
        });
        
        chunks.push({
            id: 'skills_data',
            content: `Data infrastructure: pipeline optimization, statistical analysis, ETL, NumPy, Pandas.

Data infrastructure taught her that elegance isn't just the model — it's the entire pipeline.`,
            metadata: {
                section: 'skills',
                category: 'Data',
                technologies: ['NumPy', 'Pandas', 'ETL', 'Pipeline Optimization']
            }
        });
        
        // ===== PHILOSOPHY CHUNKS =====
        
        chunks.push({
            id: 'philosophy_1',
            content: `Aradhya believes AI should enhance human thinking — not replace it.

She finds it frustrating when people outsource creativity entirely to AI.

We're asking AI to write poetry while we wash dishes. That's backwards.

AI should automate repetitive work so humans can think deeper.

The point isn't to let AI think for us. The point is to build tools that make human thinking stronger.`,
            metadata: {
                section: 'philosophy',
                type: 'ai_and_humans',
                technologies: []
            }
        });
        
        chunks.push({
            id: 'philosophy_2',
            content: `Agentic systems interest her because they're not just response generators.

They're systems that can plan, execute, and adapt — closer to how humans actually solve problems.`,
            metadata: {
                section: 'philosophy',
                type: 'agentic_systems',
                technologies: ['Agentic AI', 'Multi-Agent Systems']
            }
        });
        
        // ===== DIFFERENTIATION CHUNKS =====
        
        chunks.push({
            id: 'diff_mindset',
            content: `Aradhya doesn't pretend to know everything.

If she doesn't know something, she admits it — then learns it properly.

She isn't chasing a title.

Her goal is to contribute meaningfully to AI systems that shape the future.

She believes the best way to predict the future is to build it.`,
            metadata: {
                section: 'differentiation',
                type: 'mindset',
                technologies: []
            }
        });
        
        chunks.push({
            id: 'diff_resilience',
            content: `Her 3-agent system crashed right before a major presentation.

Instead of panicking, she debugged calmly and found the issue: expired API tokens.

That moment reinforced something she now believes deeply — calm is a technical skill.`,
            metadata: {
                section: 'differentiation',
                type: 'resilience',
                technologies: []
            }
        });
        
        chunks.push({
            id: 'diff_preference',
            content: `She's drawn to startups — places where innovation moves fast, ownership is real, and new ideas are encouraged.

Seeking Summer 2026 internship focused on intelligent systems, agentic AI, and ML infrastructure.`,
            metadata: {
                section: 'differentiation',
                type: 'company_preference',
                technologies: []
            }
        });
        
        // ===== CORE IDENTITY =====
        
        chunks.push({
            id: 'core_identity',
            content: `Arizona State University, Computer Science.
Junior (Class of December 2026).
GPA: 3.9
Dean's List Fall 2023 - Spring 2025.

She's an engineer who builds scalable systems where intelligence is part of the architecture — not the headline.

Junior year, building depth deliberately. Industry-oriented, contribution-driven.

Seeking Summer 2026 internship focused on intelligent systems, agentic AI, and ML infrastructure.`,
            metadata: {
                section: 'core',
                type: 'education',
                technologies: []
            }
        });
        
        return chunks;
    }
    
    async generateEmbeddings() {
        if (!this.model) {
            console.warn('[RAG] No embedding model, using keyword fallback');
            return;
        }
        
        try {
            // Generate embeddings for all chunks
            const texts = this.chunks.map(c => c.content);
            const embeddings = await this.model.embed(texts);
            this.embeddings = await embeddings.array();
            
            console.log('[RAG] Generated', this.embeddings.length, 'embeddings');
        } catch (error) {
            console.error('[RAG] Embedding generation failed:', error);
            this.embeddings = [];
        }
    }
    
    async query(userQuery, topK = 3) {
        if (!this.initialized || this.embeddings.length === 0) {
            // Fallback to keyword matching
            return this.keywordFallback(userQuery, topK);
        }
        
        try {
            // Generate query embedding
            const queryEmbedding = await this.model.embed([userQuery]);
            const queryVector = (await queryEmbedding.array())[0];
            
            // Calculate cosine similarities
            const similarities = this.embeddings.map((chunkEmbed, idx) => ({
                index: idx,
                similarity: this.cosineSimilarity(queryVector, chunkEmbed)
            }));
            
            // Sort by similarity
            similarities.sort((a, b) => b.similarity - a.similarity);
            
            // Get top K chunks
            const topChunks = similarities.slice(0, topK).map(s => this.chunks[s.index]);
            
            return {
                hasContext: topChunks.length > 0,
                relevantChunks: topChunks,
                method: 'semantic'
            };
        } catch (error) {
            console.error('[RAG] Query failed:', error);
            return this.keywordFallback(userQuery, topK);
        }
    }
    
    keywordFallback(query, topK = 3) {
        // Simple keyword matching as fallback
        const lower = query.toLowerCase();
        const keywords = lower.split(' ').filter(w => w.length > 3);
        
        const scored = this.chunks.map(chunk => {
            const content = chunk.content.toLowerCase();
            let score = 0;
            
            keywords.forEach(keyword => {
                const count = (content.match(new RegExp(keyword, 'g')) || []).length;
                score += count;
            });
            
            return { chunk, score };
        });
        
        scored.sort((a, b) => b.score - a.score);
        
        const relevant = scored.slice(0, topK).filter(s => s.score > 0).map(s => s.chunk);
        
        return {
            hasContext: relevant.length > 0,
            relevantChunks: relevant,
            method: 'keyword'
        };
    }
    
    cosineSimilarity(a, b) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        
        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
