// ========================================
// INTRO OVERLAY & ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('intro-overlay');
    const skipBtn = document.getElementById('skip-intro');
    const mainHeader = document.getElementById('main-header');
    
    // Hide header initially
    mainHeader.style.opacity = '0';
    
    // Skip intro button
    skipBtn.addEventListener('click', hideOverlay);
    
    // Auto-hide overlay after animation completes (5 seconds)
    setTimeout(hideOverlay, 5000);
    
    function hideOverlay() {
        overlay.classList.add('hidden');
        mainHeader.style.opacity = '1';
        // Enable scrolling
        document.body.style.overflow = 'auto';
    }
    
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';
});

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .hero-buttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const mobileToggle = document.getElementById('mobile-menu-toggle');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// ========================================
// WHY APA FLIP CARDS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const whyCards = document.querySelectorAll('.why-card');
    
    whyCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
});

// ========================================
// PACKAGE DETAIL PANEL INTERACTION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('package-overlay');
    const viewDetailsButtons = document.querySelectorAll('.btn-view-details');
    const closeButtons = document.querySelectorAll('.panel-close-btn, .btn-close-panel');
    const panelContents = document.querySelectorAll('.panel-content');
    
    // Open panel when clicking "View Full Details"
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            const targetPanel = document.getElementById('panel-' + panelId);
            
            if (targetPanel) {
                // Hide all panel contents
                panelContents.forEach(panel => panel.classList.remove('active'));
                
                // Show target panel
                targetPanel.classList.add('active');
                
                // Show overlay
                overlay.classList.add('active');
                
                // Prevent background scrolling
                document.body.style.overflow = 'hidden';
                
                // Scroll overlay to top
                overlay.scrollTop = 0;
            }
        });
    });
    
    // Close panel when clicking close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closePanel();
        });
    });
    
    // Close panel when clicking outside the panel
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePanel();
        }
    });
    
    // Close panel on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePanel();
        }
    });
    
    function closePanel() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Hide all panel contents after animation
        setTimeout(() => {
            panelContents.forEach(panel => panel.classList.remove('active'));
        }, 400);
    }
});

// ========================================
// ENHANCEMENT ROWS EXPAND INTERACTION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.enhancement-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.closest('.enhancement-content');
            const details = content.querySelector('.enhancement-details');
            
            // Toggle expanded state
            this.classList.toggle('expanded');
            details.classList.toggle('expanded');
        });
    });
});

// ========================================
// FAQ ACCORDION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
});

// ========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll('.why-card, .package-card, .enhancement-row, .timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                // Trigger animation
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.borderBottomColor = 'transparent';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.borderBottomColor = 'var(--color-accent)';
            }
        });
    });
});
