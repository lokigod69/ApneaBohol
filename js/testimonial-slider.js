document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.testimonial-slider');
    
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    const autoSlideDelay = 8000; // 8 seconds between auto-slides
    let isTransitioning = false;
    
    // Preload all images to prevent layout shifts
    function preloadImages() {
        const imageUrls = Array.from(slides).map(slide => {
            const img = slide.querySelector('img');
            return img ? img.src : null;
        }).filter(url => url !== null);
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Initialize the slider
    function initSlider() {
        // Preload images first
        preloadImages();
        
        // Set the first slide as active
        showSlide(0);
        
        // Start auto-sliding
        startAutoSlide();
        
        // Add event listeners
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);
        
        // Touch events for mobile
        sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Pause auto-slide on hover or touch
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        sliderContainer.addEventListener('touchstart', pauseAutoSlide, { passive: true });
        sliderContainer.addEventListener('touchend', startAutoSlide, { passive: true });
    }
    
    // Show a specific slide
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Handle index bounds
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        slides[index].classList.add('active');
        currentSlide = index;
        
        // Reset transition state after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 600); // Match this with CSS transition time
    }
    
    // Show the previous slide
    function showPrevSlide() {
        pauseAutoSlide();
        showSlide(currentSlide - 1);
        // Restart auto-slide after user interaction
        setTimeout(startAutoSlide, 2000);
    }
    
    // Show the next slide
    function showNextSlide() {
        pauseAutoSlide();
        showSlide(currentSlide + 1);
        // Restart auto-slide after user interaction
        setTimeout(startAutoSlide, 2000);
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        // Clear any existing interval
        pauseAutoSlide();
        
        // Set new interval
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, autoSlideDelay);
    }
    
    // Pause auto-sliding
    function pauseAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Handle touch start
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    // Handle touch end
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    // Handle swipe gesture
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to be considered a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next slide
            showNextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous slide
            showPrevSlide();
        }
    }
    
    // Initialize the slider
    if (slides.length > 0) {
        initSlider();
    }
});
