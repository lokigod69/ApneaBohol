document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-nav .prev');
    const nextButton = document.querySelector('.testimonial-nav .next');
    
    if (!track || !slides.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // 100% width
    const slideCount = slides.length;
    
    // Initialize the track width
    track.style.width = `${slideCount * 100}%`;
    
    // Set equal width for each slide
    slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
    });
    
    // Function to update the slider position
    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
    
    // Event listener for the previous button
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
    });
    
    // Event listener for the next button
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
    });
    
    // Add touch swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            nextButton.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            prevButton.click();
        }
    }
    
    // Auto-advance the slider every 5 seconds
    let autoSlideInterval = setInterval(function() {
        nextButton.click();
    }, 5000);
    
    // Pause auto-advance when user interacts with the slider
    const sliderContainer = document.querySelector('.testimonial-container');
    
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        autoSlideInterval = setInterval(function() {
            nextButton.click();
        }, 5000);
    });
    
    // Initial position
    updateSliderPosition();
});
