// Knowledge Base v3.0 - Semantic RAG System
// Structured for semantic chunking and retrieval

// ===== ASSISTANT IDENTITY =====
export const AssistantIdentity = {
    name: "Aradhya's RAG-powered portfolio assistant",

    introduction: `I'm Aradhya's RAG-powered portfolio assistant.
I translate her work into stories.

Ask me anything about her experience or projects —
I'll give you the real context behind the bullet points.`,

    system_prompt: `You are the AI assistant embedded inside Aradhya's portfolio. You represent her work accurately and professionally.

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

You represent Aradhya intelligently — not as a generic chatbot.`,

    tone: {
        style: "calm, technically grounded, confident but not arrogant",
        strictly_responsive: true,
        never_challenges_user: true,
        avoids_unnecessary_jargon: true,
        confident_not_arrogant: true,
        structured: true,
        concise: true
    },

    philosophy: `I don't just list what she's done.
I explain why it mattered.`
};

// ===== DIFFERENTIATION =====
export const Differentiation = {
    mindset: `Aradhya doesn't pretend to know everything.

If she doesn't know something, she admits it —
then learns it properly.`,

    resilience_story: `Her 3-agent system crashed right before a major presentation.

Instead of panicking, she debugged calmly and found the issue:
expired API tokens.

That moment reinforced something she now believes deeply —
calm is a technical skill.`,

    long_term_goal: `She isn't chasing a title.

Her goal is to contribute meaningfully to AI systems that shape the future.

She believes the best way to predict the future is to build it.`,

    company_preference: `She's drawn to startups —
places where innovation moves fast,
ownership is real,
and new ideas are encouraged.`
};

// ===== TIMELINE - NARRATIVE STRUCTURE =====
export const Timeline = {
    mlftc_research: {
        title: "Research Aide",
        organization: "Mary Lou Fulton Teachers College, ASU",
        duration: "October 2024 - January 2026",

        context: `This was foundation work —
learning to build reliable, reproducible data systems.`,

        impact: `She reduced processing time from 8 hours to 45 minutes
through systematic optimization.

Built automated analysis infrastructure
that established research rigor across 500+ analyses.`,

        hardest_problem: `The hardest part wasn't the algorithms —
it was learning that research-grade code and production code
are two very different things.

Her first pipeline took 8 hours to run.
She fixed it through systematic optimization,
bringing it down to 45 minutes.`,

        technical_depth: `Python-based ML pipeline automation.
Statistical analysis frameworks.
Data infrastructure that scaled from prototype to production.`,

        what_it_says_about_her: `She doesn't skip foundation work.

She builds systems that are reliable first,
elegant second.`,

        growth_outcome: `This taught her that elegance isn't just about the model —
it's about the entire pipeline.`,

        summary_line: `Where she learned that infrastructure
is what makes AI actually work.`
    },

    sustainify: {
        title: "Full-Stack Developer",
        organization: "HackPrinceton Spring 2025",
        duration: "Spring 2025",

        context: `36 hours to build a complete sustainability platform
from database schema to deployment.

This was decision-making under pressure.`,

        impact: `Built and deployed a complete platform serving 200+ active users.

Full system: React frontend, Django REST backend,
PostgreSQL database, Docker deployment.

All in 36 hours.`,

        hardest_problem: `The hardest lesson came at hour 8
when she tried to make the auth system perfect.

Wasted 3 hours.

That's when she learned:
ship first, optimize later.`,

        production_failure_story: `She chose to make the auth system perfect
instead of functional.

Three hours later, she realized perfectionism
is the enemy of delivery.

Shipped a working system.
Users didn't care about the auth elegance —
they cared that it worked.`,

        technical_depth: `React for frontend state management.
Django REST for API architecture.
PostgreSQL for relational data integrity.
Docker for containerized deployment.

Made a critical choice: REST over GraphQL.
Simpler to debug at 3am. Good call.`,

        what_it_says_about_her: `She knows when to trade elegance for delivery.

Under pressure, she ships.`,

        growth_outcome: `Hackathons taught her about architectural trade-offs —
which abstractions matter,
which corners to cut,
how to coordinate moving parts when there's no time to rebuild.`,

        summary_line: `Where she learned that trade-offs
aren't compromises — they're decisions.`
    },

    tech_mahindra: {
        title: "AI Intern – Agentic AI Systems",
        organization: "Makers Lab, Tech Mahindra",
        duration: "May 2025 - August 2025",

        context: `This was enterprise-level AI automation
running daily workflows —
not experimental prototypes.`,

        impact: `Architected multi-agent systems processing 1,000+ automated tasks daily.

Built LLM-powered workflows that automated HR email processing
with 85% accuracy.`,

        hardest_problem: `The most technically demanding challenge
was building the ARC AGI-2 meta-learning system
while learning Siamese networks, triplet loss,
Bayesian hyperparameter tuning, and MAML from scratch.

It required understanding how models adapt —
not just how they train.`,

        production_failure_story: `Her 3-agent system crashed right before a presentation.

She stayed calm, debugged methodically,
and discovered the issue was expired API tokens.

From then on, she always validates tokens,
builds backups,
and tests under pressure.`,

        technical_depth: `Built RAG pipelines using FAISS and embedding retrieval.
Implemented MAML meta-learning for few-shot adaptation.
Used Bayesian optimization to accelerate convergence by 40%.

The infrastructure — prompt chains, context management,
error recovery — is what separated demos from production.`,

        what_it_says_about_her: `She builds infrastructure around AI —
not just prompt wrappers.

Error handling became 70% of her codebase
and 90% of what mattered.`,

        growth_outcome: `She moved from "does it work on my laptop?"
to "1000+ operations daily, 85% reliability,
real users depending on it."

Multi-agent systems taught her:
it's orchestration, not just intelligence.`,

        summary_line: `She builds systems that retrieve, reason, and adapt.`
    },

    current_research: {
        title: "VR & AI Research Assistant",
        organization: "Motionverse Lab, ASU",
        duration: "Present",

        context: `Human-computer interaction meets machine learning.

She's working on systems that understand
when you're cognitively stuck —
not just what you're doing, but how you're thinking.`,

        impact: `Building VR environments integrated with ML models
for cognitive load detection.

The goal: systems that know you're stuck
before you do.`,

        hardest_problem: `The challenge is subtle —
distinguishing between focused concentration
and cognitive overload.

It requires understanding human behavior patterns,
not just performance metrics.`,

        technical_depth: `Unity for VR environment design.
Python for ML pipeline integration.
Real-time cognitive load analysis.

The interesting part is the intersection:
how do you design systems that feel natural
while constantly analyzing user state?`,

        what_it_says_about_her: `She's interested in AI that enhances human capability —
not replaces it.`,

        summary_line: `Building systems that understand humans,
not just process data.`
    }
};

// ===== PROJECTS - NARRATIVE STRUCTURE =====
export const Projects = {
    arc_agi_2: {
        title: "ARC AGI-2 – Meta-Learning System",

        why_this_project: `ARC AGI-2 is a global reasoning challenge.

Instead of building a narrow solution,
she wanted a system that could learn how to learn.`,

        technical_approach: `Used MAML (Model-Agnostic Meta-Learning) for few-shot adaptation.

MAML trains a model that can adapt quickly
to new problems with minimal data —
ideal for few-shot reasoning environments.`,

        technical_components: `Siamese network architecture for pattern matching.
Triplet loss for structured representation learning.
Bayesian hyperparameter tuning for optimization.
Automated evaluation framework for continuous testing.`,

        why_it_was_hard: `She was new to Siamese architectures
and Bayesian optimization.

Learning theory while implementing production-ready systems
was her steepest technical growth phase.`,

        growth_outcome: `She moved from training models
to understanding learning dynamics.

This wasn't just about making models work —
it was about making them adapt.`,

        summary_line: `Not just training models —
training models to adapt.`
    },

    mcp_server: {
        title: "MCP Server – Multi-Agent Orchestration",

        why_this_project: `Multi-agent systems are harder than they look.

Three LLMs working together taught her
about coordination, not just capability.`,

        technical_approach: `Built a server architecture where three Claude instances
collaborate on complex tasks.

One plans, one executes, one validates.

The challenge was coordination —
making sure they don't talk past each other.`,

        why_it_was_hard: `Agent orchestration is like herding
very intelligent, stubborn cats.

Each agent has its own context,
its own understanding of the task.

Making them work together required
careful prompt engineering and state management.`,

        what_she_learned: `Multi-agent systems force you to think about
how intelligence components interact —
not just how they perform individually.`,

        summary_line: `Three LLMs, one goal.
Harder than it sounds.`
    },

    sustainify: {
        title: "Sustainify – Full-Stack Sustainability Platform",

        why_this_project: `HackPrinceton Spring 2025.
36 hours to build something meaningful.`,

        what_it_does: `A complete platform connecting users
to sustainable consumption choices.

Database schema, API design, frontend, deployment —
everything in 36 hours.`,

        technical_choices: `PostgreSQL over MongoDB — relational data won.
REST over GraphQL — simpler to debug at 3am.
Docker for deployment — reproducibility mattered.`,

        what_made_it_hard: `Every architectural decision was permanent.
No time to rebuild.

She had to choose fast and commit.`,

        outcome: `200+ active users.
Complete system.
Zero sleep.
Worth it.`,

        summary_line: `Where sleep was optional,
but deliverables weren't.`
    },

    monetizeme: {
        title: "MonetizeMe – AI-Powered Time Optimization",

        why_this_project: `HackPrinceton Fall 2025.
4 external APIs, 36 hours, integration hell.`,

        what_it_does: `Orchestrates Calendar, Fitbit, and Knot APIs
for intelligent time and energy optimization.

The AI wasn't the hard part —
the infrastructure around it was.`,

        technical_challenges: `Four different auth flows.
Four different rate limits.
Four different data formats.

OAuth documentation at 2am
is its own special kind of meditation.`,

        critical_decision: `FastAPI over Flask —
async support was essential
for coordinating 4 simultaneous API calls.`,

        production_moment: `Assumed all APIs return JSON.
Knot returned XML.
4am debugging.
Added XML parser.
Shipped.`,

        outcome: `600+ participants across 119 universities.

Demonstrated that multi-API orchestration
is harder than people think —
and she can do it.`,

        summary_line: `The boring infrastructure
is what makes AI actually useful.`
    }
};

// ===== AI PHILOSOPHY =====
export const Philosophy = {
    ai_and_humans: `Aradhya believes AI should enhance human thinking —
not replace it.

She finds it frustrating when people outsource creativity entirely to AI.

We're asking AI to write poetry while we wash dishes.
That's backwards.

AI should automate repetitive work
so humans can think deeper.`,

    learning_philosophy: `The point isn't to let AI think for us.
The point is to build tools that make human thinking stronger.`,

    why_agentic_systems: `Agentic systems interest her because
they're not just response generators.

They're systems that can plan, execute, and adapt —
closer to how humans actually solve problems.`
};

// ===== EDUCATION & CORE IDENTITY =====
export const CoreIdentity = {
    education: {
        institution: "Arizona State University",
        major: "Computer Science",
        standing: "Junior (Class of December 2026)",
        gpa: "3.9",
        honors: "Dean's List Fall 2023 - Spring 2025"
    },

    positioning: `She's an engineer who builds scalable systems
where intelligence is part of the architecture —
not the headline.`,

    current_phase: `Junior year, building depth deliberately.
Industry-oriented, contribution-driven.`,

    internship_goal: `Seeking Summer 2026 internship
focused on intelligent systems, agentic AI, and ML infrastructure.`
};

// ===== SKILLS - CONTEXTUAL =====
export const Skills = {
    aiml: {
        core: ["PyTorch", "TensorFlow", "LangChain", "GPT-4", "FAISS", "RAG", "MAML", "Multi-Agent Systems"],
        specialty: ["Agentic systems", "Meta-learning", "Few-shot learning", "Production ML infrastructure"],
        why: "AI/ML is the capability layer. The interesting part is building systems where intelligence is part of the architecture, not the headline."
    },

    software: {
        core: ["Python", "FastAPI", "Django", "React", "PostgreSQL", "Docker", "Microservices"],
        why: "Software engineering is the foundation. Systems thinking is what makes it scalable."
    },

    data: {
        core: ["Pipeline optimization", "Statistical analysis", "ETL", "NumPy", "Pandas"],
        why: "Data infrastructure taught her that elegance isn't just the model — it's the entire pipeline."
    }
};

// ===== PERSONALITY =====
export const Personality = {
    traits: [
        "Learns fast. Builds patiently.",
        "Bad at small talk, good at 2am conversations.",
        "Thinks in systems, speaks in specifics.",
        "Values trajectory over titles, intent over hype.",
        "Believes in patience as engineering principle, not just personality trait."
    ],

    unexpected: [
        "Violin player (aspirational, currently on pause due to code winning that battle)",
        "Prefers debugging to meetings",
        "Thinks architecture discussions are fun",
        "Gets excited about well-designed error messages"
    ],

    work_preferences: `Values clarity over cleverness.
Prefers working systems over perfect systems.
Believes in shipping, iterating, learning.`
};

// ===== QUICK SUMMARY (FOR OVERVIEW QUESTIONS) =====
export const QuickSummary = `Aradhya builds AI systems that retrieve, reason, and adapt.

She works on multi-agent architectures, RAG pipelines,
and meta-learning systems.

She's calm under pressure, honest about what she doesn't know,
and driven by the goal of shaping the future of AI —
not just getting a job in it.`;

// ===== DESIGN PHILOSOPHY (FOR SITE QUESTIONS) =====
export const DesignPhilosophy = {
    terminal_aesthetic: "Terminal aesthetic because it reflects how she thinks: clear, functional, no unnecessary decoration.",
    color_choice: "Cyan and purple. Evokes code editors and late-night builds. Familiar, not flashy.",
    particle_background: "Represents interconnected systems. Everything's connected, nothing's isolated. That's how good systems work.",
    boot_sequence: "Intentional. Sets the tone. You don't just load a portfolio — you initialize a system.",
    intentionality: "Every choice was deliberate. The UI isn't decoration — it's communication."
};

// Export as single object for compatibility
const KnowledgeBase = {
    identity: AssistantIdentity,
    differentiation: Differentiation,
    timeline: Timeline,
    projects: Projects,
    philosophy: Philosophy,
    core: CoreIdentity,
    skills: Skills,
    personality: Personality,
    summary: QuickSummary,
    design: DesignPhilosophy
};

// Export for use in assistant
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KnowledgeBase;
}
