// ============================================
// ELEGANT PORTFOLIO APPLICATION - UPGRADED
// ============================================

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEntryButtons();
        this.setupNavigation();
        this.setupRotatingText();
        this.setupScrollReveal();
        this.waitForGSAP();
    }

    // ============================================
    // WAIT FOR GSAP TO LOAD
    // ============================================
    waitForGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            this.setupTimelineAnimation();
            this.setupProjectsHorizontalScroll();
        } else {
            setTimeout(() => this.waitForGSAP(), 100);
        }
    }

    // ============================================
    // ENTRY OVERLAY - BUTTON INTERACTIONS
    // ============================================
    setupEntryButtons() {
        console.log('Setting up buttons...');
        
        const overlay = document.getElementById('entry-overlay');
        const matchOverlay = document.getElementById('match-overlay');
        const mainPortfolio = document.getElementById('main-portfolio');
        const card = overlay.querySelector('.profile-card');
        const rejectBtn = document.getElementById('reject-btn');
        const acceptBtn = document.getElementById('accept-btn');

        console.log('Accept button found:', acceptBtn);
        console.log('Reject button found:', rejectBtn);

        if (!acceptBtn || !rejectBtn) {
            console.error('ERROR: Buttons not found!');
            return;
        }

        // Reject button - shake animation (using onclick for reliability)
        rejectBtn.onclick = function(e) {
            console.log('Reject clicked');
            e.preventDefault();
            card.classList.add('shake');
            setTimeout(() => {
                card.classList.remove('shake');
            }, 500);
        };

        // Accept button - trigger match (using onclick for reliability)
        const self = this;
        acceptBtn.onclick = function(e) {
            console.log('Accept clicked!');
            e.preventDefault();
            self.triggerMatch(overlay, matchOverlay, mainPortfolio);
        };

        console.log('Buttons ready!');
    }

    triggerMatch(overlay, matchOverlay, mainPortfolio) {
    // 1. Hide entry overlay
    overlay.classList.add('matched');
    
    // 2. Show match overlay
    matchOverlay.classList.remove('hidden');
    matchOverlay.classList.add('show');
    
    // 3. Start the sparkle effect
    this.createSparkleEffect();
    
    // 4. Transition to portfolio after 2 seconds
    setTimeout(() => {
        // Fade out match screen
        matchOverlay.classList.remove('show');
        
        setTimeout(() => {
            matchOverlay.classList.add('hidden');
            overlay.style.display = 'none';
            
            // Remove 'hidden' so it takes up space (display: block)
            mainPortfolio.classList.remove('hidden');
            
            // Use requestAnimationFrame to ensure the display change has registered
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mainPortfolio.classList.add('visible');
                    // Ensure GSAP knows the site is now visible and has height
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                });
            });
        }, 400); // Wait for matchOverlay fade out

        // ===== RAG CHATBOT AUTO-POPUP =====
        // Trigger chatbot popup 500ms after portfolio becomes visible
        // setTimeout(() => {
        //     this.initializeRAGChatbot();
        // }, 2500); // 2000 (match delay) + 500 = total 2.5s after accept click
    
    
    }, 2000);
}

    // ============================================
    // MAGIC WAND SPARKLE EFFECT - CANVAS
    // ============================================
    createSparkleEffect() {
        const canvas = document.getElementById('sparkle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 60;
        
        // Create curved path from bottom-left to top-right
        const pathPoints = [];
        const steps = 100;
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            
            // Bezier curve control points
            const startX = canvas.width * 0.1;
            const startY = canvas.height * 0.9;
            const cp1X = canvas.width * 0.3;
            const cp1Y = canvas.height * 0.7;
            const cp2X = canvas.width * 0.7;
            const cp2Y = canvas.height * 0.3;
            const endX = canvas.width * 0.9;
            const endY = canvas.height * 0.1;
            
            // Cubic bezier formula
            const x = Math.pow(1-t, 3) * startX + 
                     3 * Math.pow(1-t, 2) * t * cp1X + 
                     3 * (1-t) * Math.pow(t, 2) * cp2X + 
                     Math.pow(t, 3) * endX;
            
            const y = Math.pow(1-t, 3) * startY + 
                     3 * Math.pow(1-t, 2) * t * cp1Y + 
                     3 * (1-t) * Math.pow(t, 2) * cp2Y + 
                     Math.pow(t, 3) * endY;
            
            pathPoints.push({ x, y });
        }
        
        // Create particles along the path
        for (let i = 0; i < particleCount; i++) {
            const delay = (i / particleCount) * 1000; // Stagger over 1 second
            const pathIndex = Math.floor((i / particleCount) * pathPoints.length);
            const point = pathPoints[pathIndex];
            
            particles.push({
                x: point.x,
                y: point.y,
                size: Math.random() * 4 + 2,
                opacity: 0,
                delay: delay,
                born: Date.now() + delay,
                life: 400
            });
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const now = Date.now();
            let anyAlive = false;
            
            particles.forEach(particle => {
                if (now < particle.born) return;
                
                const age = now - particle.born;
                if (age > particle.life) return;
                
                anyAlive = true;
                
                // Fade in and out
                const progress = age / particle.life;
                if (progress < 0.3) {
                    particle.opacity = progress / 0.3;
                } else if (progress > 0.7) {
                    particle.opacity = 1 - ((progress - 0.7) / 0.3);
                } else {
                    particle.opacity = 1;
                }
                
                // Draw particle with glow
                ctx.save();
                
                // Outer glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, `rgba(139, 92, 246, ${particle.opacity * 0.8})`);
                gradient.addColorStop(0.5, `rgba(139, 92, 246, ${particle.opacity * 0.4})`);
                gradient.addColorStop(1, `rgba(139, 92, 246, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Core particle
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
            
            if (anyAlive) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    // ============================================
    // ROTATING TEXT ANIMATION
    // ============================================
    setupRotatingText() {
        const words = document.querySelectorAll('.rotate-word');
        if (words.length === 0) return;
        
        let currentIndex = 0;
        
        const rotateWords = () => {
            // Remove active from current
            words[currentIndex].classList.remove('active');
            
            // Move to next word
            currentIndex = (currentIndex + 1) % words.length;
            
            // Add active to new word
            words[currentIndex].classList.add('active');
        };
        
        // Rotate every 3 seconds
        setInterval(rotateWords, 3000);
    }

    // ============================================
    // NAVIGATION
    // ============================================
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        // Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const y = window.scrollY + targetSection.getBoundingClientRect().top - 80;
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => {
    let current = '';

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // SCROLL REVEAL - SECTIONS FADE IN
    // ============================================
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections except hero and projects (projects handled by GSAP)
        const sections = document.querySelectorAll('.section:not(.hero-section):not(.projects-section)');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Manually reveal projects section when it enters viewport
        const projectsSection = document.querySelector('.projects-section');
        if (projectsSection) {
            const projectsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        projectsObserver.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            
            projectsObserver.observe(projectsSection);
        }
    }

    // ============================================
    // TIMELINE ANIMATION - GROWING LINE
    // ============================================
    setupTimelineAnimation() {
        const timelineSection = document.querySelector('.timeline-section');
        const timelineLine = document.getElementById('timeline-line');
        const shinePointer = document.getElementById('shine-pointer');
        const timelineEntries = document.querySelectorAll('.timeline-entry');

        if (!timelineSection || !timelineLine) return;

        // Animate timeline line growth
        gsap.to(timelineLine, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: timelineSection,
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });

        // Animate shine pointer movement
        gsap.to(shinePointer, {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: timelineSection,
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });

        // Animate timeline entries
        timelineEntries.forEach((entry, index) => {
            gsap.to(entry, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: entry,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // ============================================
    // PROJECTS HORIZONTAL SCROLL - GSAP PIN
    // ============================================
    setupProjectsHorizontalScroll() {
        const projectsSection = document.querySelector('.projects-section');
        const scrollContainer = document.querySelector('.projects-scroll-container');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!scrollContainer || !projectsSection) return;

        // Wait for window load to ensure images and layout are ready
        const initHorizontalScroll = () => {
            // First, reveal all cards with stagger
            gsap.fromTo(projectCards, 
                {
                    opacity: 0,
                    x: 50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: projectsSection,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    }
                }
            );

//             // Calculate scroll amount - ensure it's a valid number
//             const getScrollAmount = () => {
//                 const containerWidth = scrollContainer.scrollWidth;
//                 const viewportWidth = window.innerWidth;
//                 const scrollDistance = Math.round(containerWidth - viewportWidth) + 100;
                
//                 // Return negative value for leftward scroll, ensure it's not zero
//                 return scrollDistance > 0 ? -scrollDistance : -100;
//             };

//             // Pin section and scroll horizontally
//             gsap.to(scrollContainer, {
//                 x: getScrollAmount,
//                 ease: 'none',
//                 scrollTrigger: {
//                     trigger: projectsSection,
//                     start: 'center center',
//                    end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 0.5}`,

//                     scrub: 1,
// pin: true,
// anticipatePin: 1,
// pinSpacing: true,
// invalidateOnRefresh: true,
//                     onUpdate: (self) => {
//                         // Debug: log scroll progress
//                         // console.log('Scroll progress:', self.progress);
//                     }
//                 }
//             });

// Lock container width and force GPU layer BEFORE pin to prevent reflow during scrub
scrollContainer.style.width = scrollContainer.scrollWidth + 'px';
scrollContainer.style.willChange = 'transform';
scrollContainer.style.backfaceVisibility = 'hidden';

// Cache scroll amount once; invalidateOnRefresh recalculates on resize
let cachedScrollAmount = null;

const getScrollAmount = () => {
    if (cachedScrollAmount !== null) return cachedScrollAmount;
    const containerWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = Math.round(containerWidth - viewportWidth) + 100;
    cachedScrollAmount = scrollDistance > 0 ? -scrollDistance : -100;
    return cachedScrollAmount;
};

// Pin section and scroll horizontally
gsap.to(scrollContainer, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
        trigger: projectsSection,
        start: 'center center',
        end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 0.5}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
       onRefresh: () => {
    cachedScrollAmount = null;
    scrollContainer.style.width = 'max-content';
    requestAnimationFrame(() => {
        scrollContainer.style.width = scrollContainer.scrollWidth + 'px';
    });
}
    }
});

        };

        // Execute after window loads
        if (document.readyState === 'complete') {
            initHorizontalScroll();
        } else {
            window.addEventListener('load', initHorizontalScroll);
        }
    }

    // ============================================
    // RAG CHATBOT INTEGRATION
    // ============================================
//     initializeRAGChatbot() {
//         const assistant = document.getElementById('ai-assistant');
//         const dock = document.getElementById('assistant-dock');
        
//         if (!assistant || !dock) {
//             console.warn('RAG chatbot elements not found');
//             return;
//         }
        
//         // Chatbot starts expanded, dock starts hidden (already set in HTML)
//         // Setup scroll listener to auto-minimize on scroll
//         let scrollTimeout;
//         let hasMinimized = false;
        
//         window.addEventListener('scroll', () => {
//             // Only auto-minimize once, on first scroll
//             if (!hasMinimized && window.scrollY > 50) {
//                 clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     if (!assistant.classList.contains('hidden')) {
//                         this.minimizeRAGChatbot();
//                         hasMinimized = true;
//                     }
//                 }, 150); // Debounce scroll events
//             }
//         });
//     }
    
//     minimizeRAGChatbot() {
//         const assistant = document.getElementById('ai-assistant');
//         const dock = document.getElementById('assistant-dock');
        
//         if (!assistant || !dock) return;
        
//         assistant.classList.remove('expanded');
//         assistant.classList.add('minimizing');
        
//         setTimeout(() => {
//             assistant.classList.add('hidden');
//             assistant.classList.remove('minimizing');
//             dock.classList.remove('hidden');
//         }, 400);
//     }
// }
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Refresh ScrollTrigger on window load to ensure proper calculations
window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// ============================================
// ADDITIONAL UTILITIES
// ============================================

// Prevent horizontal scroll on body
document.body.style.overflowX = 'hidden';

// Smooth scroll polyfill check
if (!('scrollBehavior' in document.documentElement.style)) {
    console.warn('Smooth scroll not supported. Consider adding a polyfill.');
}
