// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    const mainNav = document.querySelector('.main-nav');

    // Set active class on current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else if (currentPage.includes('blog-post') && href === 'blog.html') {
            // Handle blog post pages - highlight the Blog nav item
            item.classList.add('active');
        } else if (currentPage.includes('wave') && href === 'education.html') {
            // Handle wave pages - highlight the Education nav item
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Toggle menu when hamburger icon is clicked
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Announce menu state for accessibility
            const isOpen = navLinks.classList.contains('active');
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.classList.add('sr-only');
            announcement.textContent = isOpen ? 'Menu opened' : 'Menu closed';
            document.body.appendChild(announcement);
            
            // Remove announcement after it's read by screen readers
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        });
    }

    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside the menu
    document.addEventListener('click', function(e) {
        if (body.classList.contains('menu-open') && !navLinks.contains(e.target) && e.target !== mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Prevent clicks inside the menu from closing it
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Add touch event handling for better mobile experience
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Detect swipe to close menu
    navLinks.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    navLinks.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - close menu
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    // Scroll behavior for header
    function handleScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize scroll state on page load
    handleScroll();
});
