/* ============================================================
   NAMERA SHAHID — PORTFOLIO 2.0 :: ULTRA BEAST EDITION
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   ~1000+ lines of premium JavaScript — particle physics,
   moisture simulation, typed text engine, 3D parallax,
   canvas effects, animations engine, form validation, 
   intersection observer, testimonials carousel, and more
   ============================================================ */

(function () {
    'use strict';

    // =========================================================
    // 1. LOADING SCREEN
    // =========================================================
    (function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });
        // fallback: hide after 5s regardless
        setTimeout(() => {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
            }
        }, 5000);
    })();

    // =========================================================
    // 2. NAVBAR — SCROLL + ACTIVE LINK
    // =========================================================
    (function initNavbar() {
        const nav = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        const hamburger = document.getElementById('hamburgerBtn');
        const navList = document.getElementById('navLinks');

        // scroll shadow
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            // active link
            let current = '';
            sections.forEach(s => {
                const top = s.offsetTop - 120;
                if (window.scrollY >= top) {
                    current = s.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active-link');
                }
            });
        });

        // hamburger toggle
        if (hamburger && navList) {
            hamburger.addEventListener('click', () => {
                navList.classList.toggle('open');
                hamburger.classList.toggle('open');
            });
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('open');
                    hamburger.classList.remove('open');
                });
            });
        }
    })();

    // =========================================================
    // 3. CUSTOM CURSOR + NEON DRAGON ROTATOR
    // =========================================================
    (function initCursor() {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        const label = document.getElementById('cursor-label');
        const styleName = document.getElementById('cursorStyleName');
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        const speed = 0.15;

        // ---- Neon Dragon cursor styles ----
        const cursorStyles = [
            { name: 'Arrow',       cls: 'cursor-arrow',       icon: '⬆️' },
            { name: 'Link',        cls: 'cursor-link',        icon: '🔗' },
            { name: 'Text',        cls: 'cursor-text',        icon: '📝' },
            { name: 'Move',        cls: 'cursor-move',        icon: '✋' },
            { name: 'Handwriting', cls: 'cursor-handwriting', icon: '✍️' },
            { name: 'Precision',   cls: 'cursor-precision',   icon: '🎯' },
            { name: 'Help',        cls: 'cursor-help',        icon: '❓' },
            { name: 'Busy',        cls: 'cursor-busy',        icon: '⏳' },
            { name: 'Working',     cls: 'cursor-working',     icon: '⚙️' },
            { name: 'Unavailable', cls: 'cursor-unavailable', icon: '🚫' },
            { name: 'Diagonal1',   cls: 'cursor-diagonal1',   icon: '↗️' },
            { name: 'Diagonal2',   cls: 'cursor-diagonal2',   icon: '↘️' },
            { name: 'Horizontal',  cls: 'cursor-horizontal',  icon: '↔️' },
            { name: 'Vertical',    cls: 'cursor-vertical',    icon: '↕️' },
            { name: 'Alternate',   cls: 'cursor-alternate',   icon: '🔄' },
            { name: 'Arrow',       cls: 'cursor-arrow',       icon: '⬆️' }
        ];
        let styleIndex = 0;
        let rotationInterval = null;
        let labelTimeout = null;
        let isTransitioning = false;

        // ---- mouse tracking ----
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // ---- ring smooth follow ----
        function animateRing() {
            ringX += (mouseX - ringX) * speed;
            ringY += (mouseY - ringY) * speed;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // ---- switch to a specific cursor style with smooth morph ----
        function switchCursorStyle(index, animate) {
            if (index >= cursorStyles.length) index = 0;
            if (index < 0) index = cursorStyles.length - 1;
            if (isTransitioning && animate) return;
            styleIndex = index;

            const style = cursorStyles[styleIndex];

            // remove all cursor-* classes
            cursorStyles.forEach(s => ring.classList.remove(s.cls));
            ring.classList.remove('morphing', 'bloom');

            // add new class
            ring.classList.add(style.cls);

            // show the label
            if (label && styleName) {
                styleName.textContent = style.name;
                label.classList.add('visible');
                clearTimeout(labelTimeout);
                labelTimeout = setTimeout(() => {
                    label.classList.remove('visible');
                }, 2000);
            }

            // smooth morph animation
            if (animate) {
                isTransitioning = true;
                ring.classList.add('morphing');
                ring.classList.add('bloom');

                // dot also morphs size
                dot.style.transition = 'all 0.4s ease';
                dot.style.width = '12px';
                dot.style.height = '12px';

                setTimeout(() => {
                    ring.classList.remove('morphing', 'bloom');
                    dot.style.width = '8px';
                    dot.style.height = '8px';
                    setTimeout(() => {
                        dot.style.transition = '';
                        isTransitioning = false;
                    }, 300);
                }, 700);
            }
        }

        // ---- start the rotation cycle ----
        function startCursorRotation() {
            if (rotationInterval) clearInterval(rotationInterval);
            // first switch at 1s
            setTimeout(() => {
                switchCursorStyle(1, true);
            }, 1000);
            // then rotate every 5 seconds
            rotationInterval = setInterval(() => {
                const next = (styleIndex + 1) % cursorStyles.length;
                switchCursorStyle(next, true);
            }, 5000);
        }

        // ---- reset timer on mouse activity ----
        function resetRotationTimer() {
            if (rotationInterval) {
                clearInterval(rotationInterval);
            }
            // next switch after 3s idle
            rotationInterval = setInterval(() => {
                const next = (styleIndex + 1) % cursorStyles.length;
                switchCursorStyle(next, true);
            }, 5000);
        }

        document.addEventListener('mousemove', resetRotationTimer);
        document.addEventListener('click', resetRotationTimer);

        // ---- hover effects (interactive elements) ----
        const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .certificate-card, .blog-card, .contact-card, .filter-btn, input, textarea, select');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                dot.classList.add('hovering');
                ring.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                dot.classList.remove('hovering');
                ring.classList.remove('hovering');
            });
        });

        // ---- start! ----
        startCursorRotation();

        // ---- initial reveal ----
        if (label && styleName) {
            styleName.textContent = 'Arrow';
            setTimeout(() => label.classList.add('visible'), 200);
            setTimeout(() => label.classList.remove('visible'), 2500);
        }

        console.log('🐉 Neon Dragon cursor rotator active — 16 styles cycling every 5s');
    })();

    // =========================================================
    // 4. SCROLL PROGRESS BAR
    // =========================================================
    (function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        });
    })();

    // =========================================================
    // 5. SCROLL TO TOP
    // =========================================================
    (function initScrollTop() {
        const btn = document.getElementById('scrollTopBtn');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

    // =========================================================
    // 6. TYPED TEXT ENGINE
    // =========================================================
    (function initTypedText() {
        const el = document.getElementById('typedText');
        if (!el) return;

        const words = [
            'Software Engineer',
            'Python Developer',
            'AI Enthusiast',
            'Problem Solver',
            'Web Developer',
            'Tech Learner',
            'Future Full-Stack Dev'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 40;
        const pauseTime = 2000;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                el.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, pauseTime);
                return;
            }
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 300);
                return;
            }

            setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        }
        setTimeout(type, 2000);
    })();

    // =========================================================
    // 7. COUNTER ANIMATION (hero stats)
    // =========================================================
    (function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));

        function animateCounter(el, target) {
            let current = 0;
            const step = Math.ceil(target / 60);
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                el.textContent = current;
            }, 25);
        }
    })();

    // =========================================================
    // 8. SKILL BARS ANIMATION
    // =========================================================
    (function initSkillBars() {
        const bars = document.querySelectorAll('.skill-progress');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        bars.forEach(b => observer.observe(b));
    })();

    // =========================================================
    // 9. REVEAL ON SCROLL (Intersection Observer)
    // =========================================================
    (function initReveal() {
        const reveals = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right'
        );
        if (!reveals.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, parseInt(delay));
                    } else {
                        entry.target.classList.add('visible');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(r => observer.observe(r));
    })();

    // =========================================================
    // 10. PROJECT FILTER
    // =========================================================
    (function initProjectFilters() {
        const filters = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.project-card');
        if (!filters.length || !cards.length) return;

        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    })();

    // =========================================================
    // 11. TESTIMONIALS CAROUSEL
    // =========================================================
    (function initTestimonials() {
        const track = document.getElementById('testimonialTrack');
        const prevBtn = document.getElementById('testPrev');
        const nextBtn = document.getElementById('testNext');
        const dots = document.querySelectorAll('.testimonial-dot');
        if (!track || !dots.length) return;

        let current = 0;
        const total = dots.length;

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goTo(i));
        });

        // auto-rotate
        let autoInterval = setInterval(() => goTo(current + 1), 5000);

        // pause on interaction
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
            carousel.addEventListener('mouseleave', () => {
                autoInterval = setInterval(() => goTo(current + 1), 5000);
            });
        }
    })();

    // =========================================================
    // 12. DARK / LIGHT MODE TOGGLE
    // =========================================================
    (function initThemeToggle() {
        const btn = document.getElementById('darkModeBtn');
        if (!btn) return;

        // load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            btn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                btn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    })();

    // =========================================================
    // 13. QUOTE FETCH
    // =========================================================
    (function initQuote() {
        const btn = document.getElementById('quoteBtn');
        const text = document.getElementById('quoteText');
        const category = document.getElementById('quoteCategory');
        if (!btn || !text) return;

        async function fetchQuote(cat) {
            text.textContent = 'Loading...';
            btn.disabled = true;
            try {
                let url = 'https://dummyjson.com/quotes/random';
                if (cat && cat !== 'random') {
                    // DummyJSON doesn't have categories, so we fetch all and filter
                    const allRes = await fetch('https://dummyjson.com/quotes?limit=50');
                    const allData = await allRes.json();
                    const filtered = allData.quotes.filter(q =>
                        q.quote.toLowerCase().includes(cat)
                    );
                    if (filtered.length > 0) {
                        const rand = filtered[Math.floor(Math.random() * filtered.length)];
                        text.textContent = `"${rand.quote}" — ${rand.author}`;
                    } else {
                        // fallback to random
                        const res = await fetch(url);
                        const data = await res.json();
                        text.textContent = `"${data.quote}" — ${data.author}`;
                    }
                } else {
                    const res = await fetch(url);
                    const data = await res.json();
                    text.textContent = `"${data.quote}" — ${data.author}`;
                }
            } catch (err) {
                console.error(err);
                text.textContent = "Couldn't load quote. Try again later.";
            } finally {
                btn.disabled = false;
            }
        }

        btn.addEventListener('click', () => {
            const cat = category ? category.value : 'random';
            fetchQuote(cat);
        });

        if (category) {
            category.addEventListener('change', () => {
                btn.click();
            });
        }
    })();

    // =========================================================
    // 14. CONTACT FORM VALIDATION + SUBMIT
    // =========================================================
    (function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const name = document.getElementById('formName');
        const email = document.getElementById('formEmail');
        const subject = document.getElementById('formSubject');
        const message = document.getElementById('formMessage');
        const submitBtn = document.getElementById('formSubmit');

        function showError(input, msg) {
            const group = input.closest('.form-group');
            if (!group) return;
            const errorEl = group.querySelector('.form-error');
            group.classList.add('error');
            if (errorEl) errorEl.textContent = msg;
        }

        function clearError(input) {
            const group = input.closest('.form-group');
            if (!group) return;
            group.classList.remove('error');
        }

        [name, email, subject, message].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                if (input.value.trim()) clearError(input);
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let valid = true;

            if (!name || !name.value.trim()) {
                showError(name, 'Name is required');
                valid = false;
            }
            if (!email || !email.value.trim()) {
                showError(email, 'Email is required');
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError(email, 'Please enter a valid email');
                valid = false;
            }
            if (!subject || !subject.value.trim()) {
                showError(subject, 'Subject is required');
                valid = false;
            }
            if (!message || !message.value.trim()) {
                showError(message, 'Message is required');
                valid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                valid = false;
            }

            if (!valid) return;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            try {
                // Simulate sending — replace with actual endpoint
                await new Promise(resolve => setTimeout(resolve, 1500));

                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.style.background = '#22c55e';
                }
                form.reset();

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }
                }, 3000);

            } catch (err) {
                console.error(err);
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                    setTimeout(() => {
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            }
        });
    })();

    // =========================================================
    // 15. PARTICLE SYSTEM (DOT SPREAD + FALLING)
    // =========================================================
    (function initParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let W, H;
        let particles = [];
        let mouse = { x: -1000, y: -1000 };
        const PARTICLE_COUNT = 150;
        const CONNECTION_DIST = 120;

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? '#00E5FF' : '#7c3aed';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // mouse interaction — repulsion
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.x += (dx / dist) * force * 2;
                    this.y += (dy / dist) * force * 2;
                    this.opacity = Math.min(0.9, this.opacity + 0.1);
                } else {
                    this.opacity = Math.max(0.2, this.opacity - 0.005);
                }

                // wrap around
                if (this.x < -10) this.x = W + 10;
                if (this.x > W + 10) this.x = -10;
                if (this.y < -10) this.y = H + 10;
                if (this.y > H + 10) this.y = -10;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                // glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity * 0.1;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        document.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = particles[i].color;
                        ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.15;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        function createDotSpread() {
            // spawn burst of dots that spread outward
            const burstCount = 3;
            for (let i = 0; i < burstCount; i++) {
                const p = new Particle();
                p.x = Math.random() * W;
                p.y = Math.random() * H;
                p.speedX = (Math.random() - 0.5) * 4;
                p.speedY = (Math.random() - 0.5) * 4;
                p.size = Math.random() * 2 + 1;
                p.opacity = 0.7;
                particles.push(p);
            }
            // remove excess
            if (particles.length > PARTICLE_COUNT + 20) {
                particles.splice(PARTICLE_COUNT);
            }
        }

        // periodic dot spread bursts
        setInterval(createDotSpread, 3000);

        function animate() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animate);
        }
        animate();
    })();

    // =========================================================
    // 16. MOISTURE / FLUID SIMULATION
    // =========================================================
    (function initMoistureEffect() {
        const canvas = document.getElementById('moistureCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let W, H;
        let drops = [];
        let ripples = [];
        const MAX_DROPS = 30;
        const MAX_RIPPLES = 12;

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Drop {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * W;
                this.y = -20 - Math.random() * 100;
                this.size = Math.random() * 6 + 2;
                this.speedY = Math.random() * 2 + 1.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.tailLength = Math.floor(Math.random() * 8) + 3;
                this.tail = [];
                this.color = Math.random() > 0.5 ? '0, 229, 255' : '124, 58, 237';
            }
            update() {
                // store tail
                this.tail.unshift({ x: this.x, y: this.y });
                if (this.tail.length > this.tailLength) this.tail.pop();

                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY += 0.05; // gravity

                if (this.y > H + 20) {
                    // create ripple
                    ripples.push(new Ripple(this.x, H, this.size * 2, this.color));
                    this.reset();
                }
            }
            draw() {
                // draw tail
                for (let i = 0; i < this.tail.length; i++) {
                    const alpha = (1 - i / this.tail.length) * this.opacity * 0.4;
                    ctx.beginPath();
                    ctx.arc(this.tail[i].x, this.tail[i].y, this.size * (1 - i / this.tail.length) * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
                    ctx.fill();
                }
                // main drop
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
                // glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 0.08})`;
                ctx.fill();
            }
        }

        class Ripple {
            constructor(x, y, size, color) {
                this.x = x;
                this.y = y;
                this.maxRadius = Math.min(size * 10, 80);
                this.radius = 2;
                this.opacity = 0.4;
                this.color = color;
                this.speed = 1;
            }
            update() {
                this.radius += this.speed;
                this.opacity -= 0.01;
                this.speed *= 0.97;
            }
            draw() {
                if (this.opacity <= 0) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                // inner ring
                if (this.radius > 10) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${this.color}, ${this.opacity * 0.5})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
            isDead() {
                return this.opacity <= 0 || this.radius > this.maxRadius;
            }
        }

        // initial drops
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const d = new Drop();
                d.y = -20 - Math.random() * 200;
                drops.push(d);
            }, i * 200);
        }

        // spawn more drops periodically
        setInterval(() => {
            if (drops.length < MAX_DROPS) {
                drops.push(new Drop());
            }
        }, 2000);

        // mouse ripples
        canvas.addEventListener('mousemove', e => {
            if (ripples.length < MAX_RIPPLES) {
                const rand = Math.random();
                if (rand > 0.92) {
                    const color = Math.random() > 0.5 ? '0, 229, 255' : '124, 58, 237';
                    ripples.push(new Ripple(e.clientX, e.clientY, 5, color));
                }
            }
        });

        function animate() {
            ctx.clearRect(0, 0, W, H);
            drops.forEach(d => {
                d.update();
                d.draw();
            });
            ripples.forEach(r => {
                r.update();
                r.draw();
            });
            ripples = ripples.filter(r => !r.isDead());
            requestAnimationFrame(animate);
        }
        animate();
    })();

    // =========================================================
    // 17. PARALLAX ON MOUSE MOVE (hero image)
    // =========================================================
    (function initParallax() {
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (!heroImage) return;

        document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
            const rect = heroImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 30;
            const deltaY = (e.clientY - centerY) / 30;
            heroImage.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        document.querySelector('.hero')?.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'translate(0, 0)';
            heroImage.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                heroImage.style.transition = '';
            }, 500);
        });
    })();

    // =========================================================
    // 18. SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // =========================================================
    (function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    })();

    // =========================================================
    // 19. MOBILE TOUCH DETECTION — disable cursor
    // =========================================================
    (function initTouchDetect() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.style.cursor = 'auto';
            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            const label = document.getElementById('cursor-label');
            if (dot) dot.style.display = 'none';
            if (ring) ring.style.display = 'none';
            if (label) label.style.display = 'none';
        }
    })();

    // =========================================================
    // 20. ACTIVE NAV ON SCROLL (observer version — backup)
    // =========================================================
    (function initSectionObserver() {
        const sections = document.querySelectorAll('.section[id]');
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-link');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

        sections.forEach(s => observer.observe(s));
    })();

    // =========================================================
    // 21. FLOATING DOT SPREAD (CSS-based dot spreader)
    // =========================================================
    (function initCSSDotSpread() {
        const dotContainer = document.createElement('div');
        dotContainer.className = 'dot-container';
        dotContainer.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 0; overflow: hidden;
        `;
        document.body.prepend(dotContainer);

        const colors = ['#00E5FF', '#7c3aed', '#f59e0b', '#22d3ee', '#a78bfa'];

        function createDotBurst() {
            const count = 8;
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                const x = (Math.random() - 0.5) * 600;
                const y = (Math.random() - 0.5) * 600;
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 2;
                const size = 2 + Math.random() * 4;
                dot.style.cssText = `
                    position: absolute;
                    width: ${size}px; height: ${size}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    opacity: 0;
                    top: ${20 + Math.random() * 60}%;
                    left: ${20 + Math.random() * 60}%;
                    --x: ${x}px; --y: ${y}px;
                    --duration: ${duration}s; --delay: ${delay}s;
                    animation: dotSpread ${duration}s ease-out forwards;
                    animation-delay: ${delay}s;
                `;
                dotContainer.appendChild(dot);
                // remove after animation
                setTimeout(() => dot.remove(), (duration + delay) * 1000 + 100);
            }
        }

        // initial burst
        setTimeout(createDotBurst, 500);
        setInterval(createDotBurst, 4000);
    })();

    // =========================================================
    // 22. GRAIN / NOISE OVERLAY
    // =========================================================
    (function initGrain() {
        const grain = document.createElement('div');
        grain.className = 'grain-overlay';
        document.body.prepend(grain);
    })();

    // =========================================================
    // 23. KEYBOARD SHORTCUTS
    // =========================================================
    (function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // 'T' for theme toggle
            if (e.key === 't' || e.key === 'T') {
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                    const btn = document.getElementById('darkModeBtn');
                    if (btn) btn.click();
                }
            }
            // 'H' for home
            if (e.key === 'h' || e.key === 'H') {
                if (!e.ctrlKey && !e.metaKey) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
            // 'Esc' close mobile menu
            if (e.key === 'Escape') {
                const navList = document.getElementById('navLinks');
                const hamburger = document.getElementById('hamburgerBtn');
                if (navList && navList.classList.contains('open')) {
                    navList.classList.remove('open');
                    if (hamburger) hamburger.classList.remove('open');
                }
            }
        });
    })();

    // =========================================================
    // 24. PROJECT DETAIL MODAL (simple expand)
    // =========================================================
    (function initProjectDetails() {
        const detailBtns = document.querySelectorAll('.project-detail-btn:not([href])');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const card = this.closest('.project-card');
                if (!card) return;
                const title = card.querySelector('h3')?.textContent || 'Project';
                const desc = card.querySelector('p')?.textContent || '';
                const techs = Array.from(card.querySelectorAll('.project-tech span')).map(s => s.textContent).join(', ');

                // simple alert for now — replace with a real modal
                alert(`📁 ${title}\n\n${desc}\n\n🛠 Tech: ${techs}\n\n(Full details coming soon!)`);
            });
        });
    })();

    // =========================================================
    // 25. PERFORMANCE MONITOR (console only, dev friendly)
    // =========================================================
    (function initPerfLog() {
        if (window.performance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        const loadTime = perfData.loadEventEnd - perfData.startTime;
                        console.log(`⚡ Portfolio loaded in ${loadTime.toFixed(0)}ms`);
                        console.log(`📦 DOM size: ${document.querySelectorAll('*').length} elements`);
                    }
                }, 0);
            });
        }
    })();

    // =========================================================
    // 26. RESIZE HANDLER — canvas cleanup
    // =========================================================
    (function initResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            document.body.style.transition = 'none';
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.body.style.transition = '';
            }, 200);
        });
    })();

    // =========================================================
    // 27. LAZY LOADING FOR IMAGES (native fallback)
    // =========================================================
    (function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // native lazy loading is already set via loading="lazy" in HTML
            console.log('✅ Native lazy loading supported');
        } else {
            // fallback: load all images immediately
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.src = img.src;
            });
        }
    })();

    // =========================================================
    // 28. WINDOW VH FIX FOR MOBILE
    // =========================================================
    (function initVhFix() {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVh();
        window.addEventListener('resize', setVh);
    })();

    // =========================================================
    // 29. DYNAMIC YEAR IN FOOTER
    // =========================================================
    (function initDynamicYear() {
        const footer = document.querySelector('footer');
        if (!footer) return;
        const yearEl = footer.querySelector('p');
        if (yearEl && yearEl.textContent.includes('2026')) {
            // already has the year, keep as-is
        }
    })();

    // =========================================================
    // 30. CONSOLE EASTER EGG
    // =========================================================
    (function initEasterEgg() {
        console.log('%c🔥 Nameera Shahid — Portfolio 2.0 🔥', 'font-size: 24px; font-weight: 900; color: #00E5FF; text-shadow: 0 0 20px rgba(0,229,255,0.3);');
        console.log('%c🚀 Built with ❤️ + lots of ☕', 'font-size: 14px; color: #94a3b8;');
        console.log('%c📧 parishahid5@gmail.com', 'font-size: 14px; color: #7c3aed;');
        console.log('%c🐙 github.com/Nameera19', 'font-size: 14px; color: #f59e0b;');

        // konami code?
        let konami = '';
        const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
        document.addEventListener('keydown', (e) => {
            konami += e.key;
            if (konami.length > konamiCode.length) {
                konami = konami.slice(-konamiCode.length);
            }
            if (konami === konamiCode) {
                document.body.style.animation = 'rainbow 3s linear infinite';
                console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'font-size: 30px; font-weight: 900; color: #f59e0b;');
            }
        });
    })();

    // =========================================================
    // 31. BLOG READ MORE — smooth scroll
    // =========================================================
    (function initBlogLinks() {
        document.querySelectorAll('.blog-read-more').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const card = link.closest('.blog-card');
                const title = card?.querySelector('h3')?.textContent || 'Post';
                alert(`📖 "${title}"\n\nFull article coming soon! Stay tuned.`);
            });
        });
    })();

    // =========================================================
    // 32. NOTIFICATION SYSTEM (for interactions)
    // =========================================================
    (function initNotifier() {
        window.showNotification = function (message, type) {
            const existing = document.querySelector('.custom-notification');
            if (existing) existing.remove();

            const notif = document.createElement('div');
            notif.className = 'custom-notification';
            const bgColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#00E5FF';
            notif.style.cssText = `
                position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(20px);
                background: ${bgColor}; color: #fff; padding: 14px 28px; border-radius: 10px;
                font-weight: 600; font-size: 15px; z-index: 99999;
                opacity: 0; transition: all 0.4s ease; box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                font-family: 'Inter', sans-serif; pointer-events: none;
            `;
            notif.textContent = message;
            document.body.appendChild(notif);

            requestAnimationFrame(() => {
                notif.style.opacity = '1';
                notif.style.transform = 'translateX(-50%) translateY(0)';
            });

            setTimeout(() => {
                notif.style.opacity = '0';
                notif.style.transform = 'translateX(-50%) translateY(20px)';
                setTimeout(() => notif.remove(), 400);
            }, 3000);
        };
    })();

    // =========================================================
    // 33. HERO TEXT REVEAL ON LOAD
    // =========================================================
    (function initHeroReveal() {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 1500);
        }
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.8)';
            setTimeout(() => {
                heroImage.style.transition = 'all 1s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 1800);
        }
    })();

    // =========================================================
    // 34. TOGGLE HAMBURGER ANIMATION
    // =========================================================
    (function initHamburgerAnim() {
        const btn = document.getElementById('hamburgerBtn');
        if (!btn) return;
        const observer = new MutationObserver(() => {
            const spans = btn.querySelectorAll('span');
            if (btn.classList.contains('open')) {
                spans.forEach((s, i) => {
                    if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (i === 1) s.style.opacity = '0';
                    if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                });
            } else {
                spans.forEach((s, i) => {
                    s.style.transform = '';
                    s.style.opacity = '';
                });
            }
        });
        observer.observe(btn, { attributes: true, attributeFilter: ['class'] });
    })();

    // =========================================================
    // 35. SMOOTH PREFERS-REDUCED-MOTION HANDLING
    // =========================================================
    (function initMotionPref() {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.transition = 'none';
            });
            document.getElementById('particleCanvas')?.remove();
            document.getElementById('moistureCanvas')?.remove();
        }
    })();

    // =========================================================
    // 36. INTERSECTION OBSERVER FOR CERTIFICATE PROGRESS
    // =========================================================
    (function initCertProgress() {
        const certBars = document.querySelectorAll('.certificate-progress-fill');
        if (!certBars.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    requestAnimationFrame(() => {
                        entry.target.style.width = width;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        certBars.forEach(b => observer.observe(b));
    })();

    // =========================================================
    // 37. META THEME COLOR (dynamic based on theme)
    // =========================================================
    (function initMetaTheme() {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        function updateThemeColor() {
            if (document.body.classList.contains('light-mode')) {
                meta.content = '#f8fafc';
            } else {
                meta.content = '#060b18';
            }
        }
        updateThemeColor();
        const observer = new MutationObserver(updateThemeColor);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    })();

    // =========================================================
    // 38. TOUCH SUPPORT FOR TESTIMONIAL SWIPE
    // =========================================================
    (function initTouchSwipe() {
        const carousel = document.querySelector('.testimonials-carousel');
        if (!carousel) return;
        let startX = 0;
        let isDragging = false;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const diff = startX - e.touches[0].clientX;
            if (Math.abs(diff) > 50) {
                isDragging = false;
                const nextBtn = document.getElementById(diff > 0 ? 'testNext' : 'testPrev');
                if (nextBtn) nextBtn.click();
            }
        }, { passive: true });
        carousel.addEventListener('touchend', () => { isDragging = false; }, { passive: true });
    })();

    // =========================================================
    // 39. TOAST NOTIFICATION SYSTEM
    // =========================================================
    (function initToastSystem() {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        window.showToast = function (message, type) {
            type = type || 'info';
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
            toast.innerHTML = `<i class="fas ${iconMap[type] || iconMap.info}"></i> ${message}`;
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('toast-out');
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        };
    })();

    // =========================================================
    // 40. NAV BACKDROP
    // =========================================================
    (function initNavBackdrop() {
        const backdrop = document.getElementById('navBackdrop');
        const navList = document.getElementById('navLinks');
        const hamburger = document.getElementById('hamburgerBtn');
        if (!backdrop || !navList) return;
        backdrop.addEventListener('click', () => {
            navList.classList.remove('open');
            if (hamburger) hamburger.classList.remove('open');
            backdrop.classList.remove('visible');
        });
        // sync backdrop with hamburger
        const observer = new MutationObserver(() => {
            if (navList.classList.contains('open')) {
                backdrop.classList.add('visible');
            } else {
                backdrop.classList.remove('visible');
            }
        });
        observer.observe(navList, { attributes: true, attributeFilter: ['class'] });
    })();

    // =========================================================
    // 41. NETWORK STATUS INDICATOR
    // =========================================================
    (function initNetworkStatus() {
        if (!navigator.onLine) {
            if (window.showNotification) {
                window.showNotification('You are offline — some features may not work', 'error');
            }
        }
        window.addEventListener('online', () => {
            if (window.showNotification) {
                window.showNotification('Back online! 🎉', 'success');
            }
        });
        window.addEventListener('offline', () => {
            if (window.showNotification) {
                window.showNotification('You are offline', 'error');
            }
        });
    })();

    // =========================================================
    // 40. FINAL LOG
    // =========================================================
    console.log('✅ All systems online — Portfolio 2.0 Ultra Beast');
    console.log(`📐 Viewport: ${window.innerWidth}×${window.innerHeight}`);

})();
