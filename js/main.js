document.addEventListener('DOMContentLoaded', function() {
    // Set initial navigation state based on screen size
    const setNavigationState = () => {
        const isMobile = window.innerWidth <= 768;
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        // Reset any mobile-specific states on desktop
        if (!isMobile) {
            if (navLinks) {
                navLinks.classList.remove('active');
                navLinks.style.right = '';
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            // Remove menu-open class from body when in desktop view
            document.body.classList.remove('menu-open');
        }
    };
    
    // Run on page load
    setNavigationState();
    
    // Run on window resize
    window.addEventListener('resize', setNavigationState);
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                
                // Create or toggle menu overlay
                let overlay = document.querySelector('.menu-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'menu-overlay';
                    document.body.appendChild(overlay);
                    
                    // Add click event to close menu when overlay is clicked
                    overlay.addEventListener('click', function() {
                        mobileMenuBtn.classList.remove('active');
                        navLinks.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        overlay.classList.remove('active');
                    });
                }
                overlay.classList.toggle('active');
            }
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // Only add click event on mobile
        if (window.innerWidth <= 768 && link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-nav .prev');
    const nextBtn = document.querySelector('.testimonial-nav .next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (testimonials.length > 0) {
        // Initialize
        showTestimonial(currentIndex);
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        // Auto slide
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scroll event for header
    const header = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Sticky header
    const announcementBar = document.querySelector('.announcement-bar');
    let announcementHeight = announcementBar ? announcementBar.offsetHeight : 0;
    
    function updateHeaderOnScroll() {
        if (window.scrollY > announcementHeight) {
            announcementBar.style.display = 'none';
            header.classList.add('sticky');
        } else {
            announcementBar.style.display = 'block';
            header.classList.remove('sticky');
        }
    }
    
    if (header && announcementBar) {
        window.addEventListener('scroll', updateHeaderOnScroll);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    if (animateElements.length > 0) {
        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Check on load
    }
    
    // Add scroll reveal animation for education feature sections
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        const featureSections = document.querySelectorAll('.education-feature, .blog-feature');
        
        featureSections.forEach((section, index) => {
            if (isInViewport(section)) {
                // Add a slight delay based on index for cascading effect
                setTimeout(() => {
                    section.classList.add('visible');
                }, index * 150);
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
});
