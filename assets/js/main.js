        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Particles effect
        function createParticles() {
            const particles = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 5 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = 'rgba(124, 58, 237, ' + Math.random() * 0.3 + ')';
                particle.style.borderRadius = '50%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animation = 'float ' + (Math.random() * 10 + 5) + 's ease-in-out infinite';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particles.appendChild(particle);
            }
        }
        createParticles();

        // Progress bar for steps
        function updateProgress(width) {
            document.getElementById('progressFill').style.width = width + '%';
        }

        // Pricing data
        const pricingPlans = {
            monthly: [
                {
                    name: 'Starter',
                    price: '9,999',
                    description: 'Perfect for small meetups and workshops',
                    features: [
                        '500 prospects/month',
                        'Basic LinkedIn prospecting',
                        'Email outreach templates',
                        'Basic analytics',
                        'Email support',
                        '1 user'
                    ],
                    notIncluded: [
                        'Multi-channel outreach',
                        'AI personalization',
                        'Revenue attribution',
                        'Priority support'
                    ],
                    cta: 'Start Free Trial',
                    popular: false
                },
                {
                    name: 'Professional',
                    price: '24,999',
                    description: 'Ideal for growing event businesses',
                    features: [
                        '2,000 prospects/month',
                        'Advanced LinkedIn + Web research',
                        'AI-personalized outreach',
                        'Multi-channel (LinkedIn + Email)',
                        'Revenue attribution',
                        'Priority support',
                        '5 users',
                        'Custom reporting'
                    ],
                    notIncluded: [],
                    cta: 'Start Free Trial',
                    popular: true
                },
                {
                    name: 'Enterprise',
                    price: 'Custom',
                    description: 'For large-scale event organizers',
                    features: [
                        'Unlimited prospects',
                        'Full AI customization',
                        'API access',
                        'Dedicated account manager',
                        'Custom integrations',
                        'SLA guarantee',
                        'Unlimited users',
                        'White-label option'
                    ],
                    notIncluded: [],
                    cta: 'Contact Sales',
                    popular: false
                }
            ],
            annual: [
                {
                    name: 'Starter',
                    price: '7,999',
                    description: 'Perfect for small meetups and workshops',
                    features: [
                        '500 prospects/month',
                        'Basic LinkedIn prospecting',
                        'Email outreach templates',
                        'Basic analytics',
                        'Email support',
                        '1 user'
                    ],
                    notIncluded: [
                        'Multi-channel outreach',
                        'AI personalization',
                        'Revenue attribution',
                        'Priority support'
                    ],
                    cta: 'Start Free Trial',
                    popular: false
                },
                {
                    name: 'Professional',
                    price: '19,999',
                    description: 'Ideal for growing event businesses',
                    features: [
                        '2,000 prospects/month',
                        'Advanced LinkedIn + Web research',
                        'AI-personalized outreach',
                        'Multi-channel (LinkedIn + Email)',
                        'Revenue attribution',
                        'Priority support',
                        '5 users',
                        'Custom reporting'
                    ],
                    notIncluded: [],
                    cta: 'Start Free Trial',
                    popular: true
                },
                {
                    name: 'Enterprise',
                    price: 'Custom',
                    description: 'For large-scale event organizers',
                    features: [
                        'Unlimited prospects',
                        'Full AI customization',
                        'API access',
                        'Dedicated account manager',
                        'Custom integrations',
                        'SLA guarantee',
                        'Unlimited users',
                        'White-label option'
                    ],
                    notIncluded: [],
                    cta: 'Contact Sales',
                    popular: false
                }
            ]
        };

        // Render pricing cards
        function renderPricing(isAnnual) {
            const plans = isAnnual ? pricingPlans.annual : pricingPlans.monthly;
            const pricingGrid = document.getElementById('pricingGrid');
            
            pricingGrid.innerHTML = plans.map(plan => `
                <div class="pricing-card ${plan.popular ? 'popular' : ''}">
                    ${plan.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
                    <div class="pricing-header">
                        <div class="pricing-name">${plan.name}</div>
                        <div class="pricing-price">
                            ${plan.price === 'Custom' ? 'Custom' : '₹' + plan.price}<span>${plan.price !== 'Custom' ? '/mo' : ''}</span>
                        </div>
                        <div class="pricing-description">${plan.description}</div>
                    </div>
                    <ul class="pricing-features">
                        ${plan.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                        ${plan.notIncluded.map(f => `<li class="not-included"><i class="fas fa-times"></i> ${f}</li>`).join('')}
                    </ul>
                    <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} pricing-cta">${plan.cta}</button>
                </div>
            `).join('');
        }

        // Initialize pricing
        renderPricing(false);

        // Pricing toggle
        const monthlyToggle = document.getElementById('monthlyToggle');
        const annualToggle = document.getElementById('annualToggle');
        const pricingToggle = document.getElementById('pricingToggle');

        monthlyToggle.addEventListener('click', function() {
            monthlyToggle.classList.add('active');
            annualToggle.classList.remove('active');
            pricingToggle.classList.remove('annual');
            renderPricing(false);
        });

        annualToggle.addEventListener('click', function() {
            annualToggle.classList.add('active');
            monthlyToggle.classList.remove('active');
            pricingToggle.classList.add('annual');
            renderPricing(true);
        });

        pricingToggle.addEventListener('click', function() {
            if (pricingToggle.classList.contains('annual')) {
                monthlyToggle.click();
            } else {
                annualToggle.click();
            }
        });

        // Testimonials slider
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.slider-dot');

        function showSlide(index) {
            const track = document.getElementById('testimonialsTrack');
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            
            track.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlideIndex = index;
        }

        function currentSlide(index) {
            showSlide(index);
        }

        // Auto-advance testimonials
        setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 5000);

        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const item = this.parentElement;
                item.classList.toggle('active');
                
                const icon = this.querySelector('i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });

        // Smooth scroll for anchor links
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

        // Animate on scroll (simple version)
        function animateOnScroll() {
            const elements = document.querySelectorAll('.problem-card, .feature-card, .step, .pricing-card, .case-study-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Set initial styles for animation
        document.querySelectorAll('.problem-card, .feature-card, .step, .pricing-card, .case-study-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Counter animation for stats
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Trigger counter animation when stats are in view
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;

        window.addEventListener('scroll', function() {
            if (!animated) {
                const statsSection = document.querySelector('.hero-stats');
                if (statsSection.getBoundingClientRect().top < window.innerHeight) {
                    statNumbers.forEach((stat, index) => {
                        const value = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
                        animateValue(stat, 0, value, 2000);
                    });
                    animated = true;
                }
            }
        });
