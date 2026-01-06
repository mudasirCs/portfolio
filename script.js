// ===================================
// Portfolio JavaScript - Whimsical Edition
// Inspired by Josh Comeau's delightful interactions
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initActiveSection();
    initThemeToggle();
    initParticles();
    initMagneticButtons();
    initCardTilt();
    initParallaxScroll();
    initTextReveal();
    initConfettiButtons();
    initCursorAwareProfile();
    initRainbowCursor();
    initBouncyElements();
    initSparkleHover();
});

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    const roles = [
        'Full Stack Developer',
        'DevOps Engineer',
        'Backend Developer',
        'ML Enthusiast',
        'Linux Advocate'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll(`
        .skill-card, 
        .timeline-item, 
        .project-card, 
        .contact-card,
        .about-content,
        .section-title,
        .section-subtitle
    `);

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.05}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active Section Highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update particles color
        if (window.particles) {
            window.particles.forEach(p => {
                p.color = newTheme === 'dark'
                    ? `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.1})`
                    : `rgba(184, 134, 11, ${Math.random() * 0.5 + 0.2})`;
            });
        }
    });
}

// Particle System
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            this.color = isDark
                ? `rgba(139, 92, 246, ${this.opacity})`
                : `rgba(184, 134, 11, ${this.opacity * 0.8})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    window.particles = particles;

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                    ctx.strokeStyle = isDark
                        ? `rgba(139, 92, 246, ${opacity})`
                        : `rgba(184, 134, 11, ${opacity * 0.8})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // Mouse interaction
    canvas.style.pointerEvents = 'auto';
    let mouse = { x: null, y: null };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;

        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                p.x -= dx * force * 0.03;
                p.y -= dy * force * 0.03;
            }
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Card Tilt Effect
function initCardTilt() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Parallax Scroll Effect
function initParallaxScroll() {
    const orbs = document.querySelectorAll('.gradient-orb');
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });

        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Text Reveal Animation  
function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    const heroGreeting = document.querySelector('.hero-greeting');
    const heroDescription = document.querySelector('.hero-description');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroGreeting) {
        heroGreeting.style.opacity = '0';
        heroGreeting.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroGreeting.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            heroGreeting.style.opacity = '1';
            heroGreeting.style.transform = 'translateY(0)';
        }, 0);
    }

    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroDescription.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 400);
    }
}

// ===================================
// WHIMSICAL INTERACTIONS
// Inspired by Josh Comeau
// ===================================

// Confetti Burst on Button Click
function initConfettiButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createConfettiBurst(e.clientX, e.clientY);
        });
    });
}

function createConfettiBurst(x, y) {
    const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#22c55e', '#f59e0b', '#ef4444'];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        `;

        document.body.appendChild(confetti);

        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 150;

        animateConfetti(confetti, x, y, vx, vy);
    }
}

function animateConfetti(element, startX, startY, vx, vy) {
    let x = startX;
    let y = startY;
    let rotation = 0;
    let opacity = 1;
    const gravity = 400;
    const friction = 0.98;
    let velocityY = vy;
    let velocityX = vx;
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;

        velocityY += gravity * 0.016;
        velocityX *= friction;
        velocityY *= friction;

        x += velocityX * 0.016;
        y += velocityY * 0.016;
        rotation += velocityX * 0.1;
        opacity -= 0.015;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = `rotate(${rotation}deg)`;
        element.style.opacity = opacity;

        if (opacity > 0 && y < window.innerHeight + 50) {
            requestAnimationFrame(animate);
        } else {
            element.remove();
        }
    }

    requestAnimationFrame(animate);
}

// Cursor-Aware Profile (Googly Eyes Effect)
function initCursorAwareProfile() {
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (!profilePlaceholder) return;

    // Add eyes to the profile
    const eyesContainer = document.createElement('div');
    eyesContainer.className = 'googly-eyes';
    eyesContainer.innerHTML = `
        <div class="eye left-eye">
            <div class="pupil"></div>
        </div>
        <div class="eye right-eye">
            <div class="pupil"></div>
        </div>
    `;
    profilePlaceholder.appendChild(eyesContainer);

    const pupils = eyesContainer.querySelectorAll('.pupil');

    document.addEventListener('mousemove', (e) => {
        const rect = profilePlaceholder.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(8, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 30);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });
}

// Rainbow Cursor Trail
function initRainbowCursor() {
    const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#22c55e', '#f59e0b'];
    let colorIndex = 0;
    let lastTime = 0;
    const throttle = 50;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttle) return;
        lastTime = now;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 12px;
            height: 12px;
            background: ${colors[colorIndex % colors.length]};
            left: ${e.clientX - 6}px;
            top: ${e.clientY - 6}px;
            pointer-events: none;
            z-index: 9998;
            border-radius: 50%;
            opacity: 0.7;
            transform: scale(1);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        document.body.appendChild(trail);
        colorIndex++;

        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        });

        setTimeout(() => trail.remove(), 500);
    });
}

// Bouncy Spring Physics for Elements
function initBouncyElements() {
    const bounceElements = document.querySelectorAll('.skill-card, .project-card, .contact-card');

    bounceElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.transform = 'scale(1.05)';
        });

        el.addEventListener('mouseleave', () => {
            // Bouncy return animation
            el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.transform = 'scale(0.98)';

            setTimeout(() => {
                el.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                el.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add bounce to section titles on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('bounce-in');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
}

// Sparkle Effect on Hover
function initSparkleHover() {
    const sparkleTargets = document.querySelectorAll('.skill-tag, .timeline-tech span, .project-tech span, .highlight-tag');

    sparkleTargets.forEach(target => {
        target.addEventListener('mouseenter', (e) => {
            createSparkles(e.target);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;

    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✦';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                pointer-events: none;
                z-index: 9999;
                font-size: ${Math.random() * 10 + 8}px;
                color: ${['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)]};
                animation: sparkle-float 0.8s ease-out forwards;
            `;

            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }, i * 50);
    }
}

// Add wobble effect to buttons on hover
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'wiggle 0.5s ease-in-out';
        });
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        });
    });
});


// Hide scroll indicator after 5 seconds
setTimeout(() => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.transition = 'opacity 1s ease-out';
        scrollIndicator.style.opacity = '0';
        setTimeout(() => {
            scrollIndicator.style.display = 'none';
        }, 1000);
    }
}, 5000);
