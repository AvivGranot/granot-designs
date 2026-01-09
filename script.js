// JavaScript for Two-View System (Hero <-> Main Content)

document.addEventListener('DOMContentLoaded', function() {
    // Two-view system is handled by React components
    // Static file navigation toggle disabled to prevent conflicts

    // Keep existing overlay functionality for legacy support
    const navOverlay = document.getElementById('navOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const backToMenuBtn = document.getElementById('backToMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const headerElement = document.querySelector('.site-header');
    
    // Track the previously focused element for accessibility
    let previouslyFocusedElement = null;
    
    // Focusable elements within the overlay for focus trap
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Carousel elements
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    
    // Function to open the navigation overlay
    function openNavOverlay() {
        // Store the currently focused element
        previouslyFocusedElement = document.activeElement;
        
        navOverlay.style.display = 'block';
        // Small delay to ensure display is set before opacity transition
        setTimeout(() => {
            navOverlay.classList.add('active');
            // Focus the first navigation item for accessibility
            const firstNavItem = navItems[0];
            if (firstNavItem) {
                firstNavItem.focus();
            }
        }, 10);
        
        // Prevent body scrolling when overlay is open
        document.body.style.overflow = 'hidden';
        
        // Show navigation menu by default (hide all sections)
        hideAllSections();
        showNavigationMenu();
        
        // Add aria-hidden to main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }
    }
    
    // Function to close the navigation overlay
    function closeNavOverlay() {
        navOverlay.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            navOverlay.style.display = 'none';
        }, 300);
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Remove aria-hidden from main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.removeAttribute('aria-hidden');
        }
        
        // Return focus to the previously focused element
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
            previouslyFocusedElement = null;
        }
    }
    
    // Function to show navigation menu
    function showNavigationMenu() {
        if (navMenu) {
            navMenu.style.display = 'block';
        }
        if (backToMenuBtn) {
            backToMenuBtn.style.display = 'none';
        }
    }
    
    // Function to hide navigation menu
    function hideNavigationMenu() {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
        if (backToMenuBtn) {
            backToMenuBtn.style.display = 'flex';
        }
    }
    
    // Function to hide all sections
    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
    }
    
    // Function to show specific section
    function showSection(sectionId) {
        hideAllSections();
        hideNavigationMenu();
        
        const targetSection = document.getElementById(sectionId + 'Section');
        if (targetSection) {
            targetSection.style.display = 'flex';
            targetSection.classList.add('active');
            
            // If it's portfolio section, initialize carousel
            if (sectionId === 'portfolio') {
                initializeCarousel();
            }
        }
    }
    
    // Carousel functionality
    function initializeCarousel() {
        showSlide(currentSlide);
    }
    
    function showSlide(index) {
        // Hide all slides
        carouselSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        if (carouselSlides[index]) {
            carouselSlides[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    // Scroll transitions removed for two-view system
    
    // Event listeners
    
    // Legacy overlay toggle (not used in two-view system)
    // Navigation toggle is now handled by React for two-view system
    
    // Close button click event
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeNavOverlay();
        });
    }
    
    // Back to menu button click event
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideAllSections();
            showNavigationMenu();
            // Focus the first navigation item
            const firstNavItem = navItems[0];
            if (firstNavItem) {
                firstNavItem.focus();
            }
        });
    }
    
    // Navigation items click events
    navItems.forEach((item, index) => {
        // Click event
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const section = this.dataset.section;
            if (section) {
                showSection(section);
            }
        });
        
        // Keyboard navigation for menu items
        item.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.click();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (index + 1) % navItems.length;
                    navItems[nextIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = (index - 1 + navItems.length) % navItems.length;
                    navItems[prevIndex].focus();
                    break;
            }
        });
    });
    
    // Carousel navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
    }
    
    // Close overlay when clicking on dark background (not on content)
    navOverlay.addEventListener('click', function(e) {
        if (e.target === navOverlay) {
            closeNavOverlay();
        }
    });
    
    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            closeNavOverlay();
        }
    });
    
    // Auto-advance carousel (optional)
    let carouselInterval;
    
    function startCarouselAutoplay() {
        // Only start autoplay if user hasn't indicated preference for reduced motion
        if (!prefersReducedMotion) {
            carouselInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    function stopCarouselAutoplay() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }
    
    // Enhanced hover effects for navigation items
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.style.textShadow = 'none';
        });
    });
    
    // Enhanced hover effects for carousel buttons
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    carouselButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Header scroll behavior (hide/show on scroll)
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        // Only apply scroll behavior when overlay is not active
        if (!navOverlay.classList.contains('active')) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }
    });
    
    // Add smooth transition to header
    header.style.transition = 'transform 0.3s ease';
    
    // Contact item click functionality
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            if (text.includes('@')) {
                // Email
                window.location.href = `mailto:${text}`;
            } else if (text.match(/[\d-]/)) {
                // Phone
                window.location.href = `tel:${text.replace(/[^+\\d]/g, '')}`;
            }
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1)';
            }
        });
    });
    
    // Focus trap for accessibility
    function trapFocus(e) {
        if (!navOverlay.classList.contains('active')) return;
        
        const focusableElements = navOverlay.querySelectorAll(focusableSelectors);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
    
    // Enhanced keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (navOverlay.classList.contains('active')) {
            // Focus trap
            trapFocus(e);
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (document.getElementById('portfolioSection')?.classList.contains('active')) {
                        e.preventDefault();
                        prevSlide();
                    }
                    break;
                case 'ArrowRight':
                    if (document.getElementById('portfolioSection')?.classList.contains('active')) {
                        e.preventDefault();
                        nextSlide();
                    }
                    break;
                case '1':
                    e.preventDefault();
                    showSection('portfolio');
                    break;
                case '2':
                    e.preventDefault();
                    showSection('services');
                    break;
                case '3':
                    e.preventDefault();
                    showSection('about');
                    break;
                case '4':
                    e.preventDefault();
                    showSection('contact');
                    break;
                case '0':
                    e.preventDefault();
                    hideAllSections();
                    showNavigationMenu();
                    // Focus the first navigation item
                    const firstNavItem = navItems[0];
                    if (firstNavItem) {
                        firstNavItem.focus();
                    }
                    break;
            }
        }
    });
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Preload carousel images for better performance
    function preloadImages() {
        const imageUrls = [
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            'https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Initialize portfolio section event listeners
    const portfolioSectionElement = document.getElementById('portfolioSection');
    if (portfolioSectionElement) {
        // Set up autoplay control via MutationObserver
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (portfolioSectionElement.classList.contains('active')) {
                        startCarouselAutoplay();
                    } else {
                        stopCarouselAutoplay();
                    }
                }
            });
        });
        
        observer.observe(portfolioSectionElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Pause carousel autoplay on hover/focus if not reduced motion
        if (!prefersReducedMotion) {
            portfolioSectionElement.addEventListener('mouseenter', stopCarouselAutoplay);
            portfolioSectionElement.addEventListener('mouseleave', function() {
                if (portfolioSectionElement.classList.contains('active')) {
                    startCarouselAutoplay();
                }
            });
            portfolioSectionElement.addEventListener('focusin', stopCarouselAutoplay);
            portfolioSectionElement.addEventListener('focusout', function() {
                if (portfolioSectionElement.classList.contains('active')) {
                    startCarouselAutoplay();
                }
            });
        }
    }
    
    // Initialize
    preloadImages();
    
    // Add loading class to body
    document.body.classList.add('loaded');
    
    console.log('Minale + Mann navigation system initialized successfully!');
});

// Utility functions for smooth animations
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function smoothTransition(element, property, startValue, endValue, duration = 300) {
    const startTime = performance.now();
    const changeInValue = endValue - startValue;
    
    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easedProgress = easeOutCubic(progress);
        const currentValue = startValue + (changeInValue * easedProgress);
        
        element.style[property] = currentValue + (property === 'opacity' ? '' : 'px');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Performance optimization
window.addEventListener('load', function() {
    // Add any additional load optimizations here
    document.body.style.opacity = '1';
});