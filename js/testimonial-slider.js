document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-nav .prev');
    const nextButton = document.querySelector('.testimonial-nav .next');
    
    if (!track || !slides.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // 100% width
    const slideCount = slides.length;
    let isTransitioning = false;
    let autoSlideInterval;
    const isMobile = window.innerWidth < 768;
    
    // Initialize the track width
    track.style.width = `${slideCount * 100}%`;
    
    // Set equal width for each slide
    slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
    });
    
    // Function to update the slider position with transition
    function updateSliderPosition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Event listener for the previous button
    prevButton.addEventListener('click', function() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
    });
    
    // Event listener for the next button
    nextButton.addEventListener('click', function() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
    });
    
    // Add touch swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        pauseAutoSlide();
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        if (isTransitioning) return;
        
        const swipeThreshold = 50; // Minimum distance required for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            currentIndex = (currentIndex + 1) % slideCount;
            updateSliderPosition();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSliderPosition();
        }
    }
    
    // Function to start auto-slide
    function startAutoSlide() {
        // Use a longer interval on mobile devices
        const interval = isMobile ? 7000 : 5000;
        
        // Clear any existing interval
        clearInterval(autoSlideInterval);
        
        // Set new interval
        autoSlideInterval = setInterval(function() {
            if (!document.hidden && !isTransitioning) {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSliderPosition();
            }
        }, interval);
    }
    
    // Function to pause auto-slide
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Pause auto-advance when user interacts with the slider
    const sliderContainer = document.querySelector('.testimonial-container');
    
    sliderContainer.addEventListener('mouseenter', function() {
        pauseAutoSlide();
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
    
    // Pause when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        const newIsMobile = window.innerWidth < 768;
        
        // If mobile state changed, restart the auto-slide with appropriate timing
        if (wasMobile !== newIsMobile) {
            startAutoSlide();
        }
    });
    
    // Initial position
    updateSliderPosition();
    
    // Start auto-slide
    startAutoSlide();
});
