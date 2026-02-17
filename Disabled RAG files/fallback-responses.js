// Fallback Response System v3.0
// Calm, precise responses that redirect gracefully

const FallbackResponses = {
    // ===== PRIMARY FALLBACKS =====
    general: `I don't have documented information about that in her portfolio.

If you're curious about her AI systems, research work, or projects —
I can walk you through those.`,

    personal: `I focus on her professional journey and technical work.

If you'd like to know what drives her or what she's building next,
I can help with that.`,

    confidential: `That's proprietary work. I stay in my lane.

The public projects speak for themselves though —
want to hear about those?`,

    speculative: `I deal in what's built, not what might be.

Want to know about the systems that exist?
I can tell you about those.`,

    // ===== CONTEXT-AWARE REDIRECTS =====
    redirects: {
        to_projects: [
            "Her ARC AGI work is where meta-learning got interesting.",
            "The multi-agent MCP server is worth exploring. Three LLMs coordinating — harder than it sounds.",
            "Sustainify was built in 36 hours. The story behind that is worth telling.",
            "MonetizeMe taught her about integration hell. 4 APIs, 4 auth flows, one weekend."
        ],

        to_experience: [
            "Her work at Tech Mahindra is where production complexity hit. Want that story?",
            "The VR research she's doing now is fascinating. Systems that understand when you're cognitively stuck.",
            "Her MLFTC research taught her that infrastructure is what makes AI work. Want details?"
        ],

        to_philosophy: [
            "She has strong opinions about AI replacing human creativity. Want to hear them?",
            "Her approach to building systems is deliberate. I can explain why that matters.",
            "She believes calm is a technical skill. There's a story behind that."
        ]
    },

    // ===== SOFT ACKNOWLEDGMENTS =====
    curious_acknowledgment: [
        "That's a good question — and not one I want to answer lazily.",
        "Interesting angle. I'd rather point you in the right direction than speculate.",
        "That's worth exploring properly, not rushing an answer."
    ],

    // ===== HUMBLE RESPONSES =====
    humble: [
        "I'm smart about some things, deliberately vague about others.",
        "Built for context, not omniscience. Ask me about what's here.",
        "My knowledge ends somewhere between 'everything on this site' and 'the meaning of life.'"
    ],

    // ===== TOPIC-SPECIFIC RESPONSES =====
    topic_specific: {
        about_tech_mahindra: `Tech Mahindra was where she learned production complexity.

Multi-agent systems processing 1000+ tasks daily.
RAG pipelines with FAISS.
Meta-learning systems.

And a critical failure moment that taught her
calm is a technical skill.

Want the full story?`,

        about_arc_agi: `The ARC AGI project was her steepest learning curve.

Building meta-learning systems while learning
Siamese networks, triplet loss, and MAML from scratch.

Not just training models — training them to adapt.

Want technical details or the growth story?`,

        about_vr_research: `She's working on VR systems that understand
when you're cognitively stuck —
not just what you're doing, but how you're thinking.

It's human-computer interaction meets ML.

Interested in the technical approach?`,

        about_philosophy: `She believes AI should enhance human thinking, not replace it.

We're asking AI to write poetry while we wash dishes.
That's backwards.

AI should automate repetitive work
so humans can think deeper.`,

        about_differentiation: `Three things set her apart:

She doesn't pretend to know everything.
She stays calm when systems crash.
She's not chasing titles — she's building meaningful capability.

Want details on any of these?`
    },

    // ===== RESPONSE BUILDER =====
    build: function(type = 'general', includeRedirect = true, includeSuggestion = false) {
        let response = '';

        // Select primary fallback based on type
        switch(type) {
            case 'personal':
                response = this.personal;
                break;
            case 'confidential':
                response = this.confidential;
                break;
            case 'speculative':
                response = this.speculative;
                break;
            case 'curious':
                response = this.randomFrom(this.curious_acknowledgment);
                break;
            case 'humble':
                response = this.randomFrom(this.humble);
                break;
            case 'outOfScope':
                response = this.general;
                if (includeSuggestion) {
                    response += '\n\n' + this.randomFrom([
                        ...this.redirects.to_projects,
                        ...this.redirects.to_experience,
                        ...this.redirects.to_philosophy
                    ]);
                }
                return response;
            default:
                response = this.general;
        }

        // Add contextual redirect if requested
        if (includeRedirect && type !== 'outOfScope') {
            const allRedirects = [
                ...this.redirects.to_projects,
                ...this.redirects.to_experience,
                ...this.redirects.to_philosophy
            ];
            response += '\n\n' + this.randomFrom(allRedirects);
        }

        return response;
    },

    // Helper: Random selection
    randomFrom: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Helper: Get topic-specific response
    getTopic: function(topic) {
        return this.topic_specific[topic] || this.general;
    }
};

// Export for use in assistant
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FallbackResponses;
}
