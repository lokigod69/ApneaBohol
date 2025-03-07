// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    const mainNav = document.querySelector('.main-nav');
    let menuOpen = false;
    
    // Create menu overlay if it doesn't exist
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.classList.add('menu-overlay');
        body.appendChild(menuOverlay);
    }

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

    // Function to toggle menu state
    function toggleMenu(e) {
        if (e) {
            e.stopPropagation();
        }
        
        menuOpen = !menuOpen;
        mobileMenuBtn.classList.toggle('active', menuOpen);
        navLinks.classList.toggle('active', menuOpen);
        body.classList.toggle('menu-open', menuOpen);
        menuOverlay.classList.toggle('active', menuOpen);
        
        // Announce menu state for accessibility
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = menuOpen ? 'Menu opened' : 'Menu closed';
        document.body.appendChild(announcement);
        
        // Remove announcement after it's read by screen readers
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    // Function to close menu
    function closeMenu() {
        if (menuOpen) {
            menuOpen = false;
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            menuOverlay.classList.remove('active');
        }
    }

    // Toggle menu when hamburger icon is clicked
    if (mobileMenuBtn) {
        // Remove any existing event listeners
        mobileMenuBtn.removeEventListener('click', toggleMenu);
        // Add new event listener
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        // Remove any existing event listeners
        item.removeEventListener('click', closeMenu);
        // Add new event listener
        item.addEventListener('click', closeMenu);
    });

    // Close menu when clicking on the overlay
    menuOverlay.addEventListener('click', closeMenu);

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
            closeMenu();
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
    
    // Handle window resize - close menu if window is resized to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && menuOpen) {
            closeMenu();
        }
    });
});
