document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset any previous error states
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
                const existingError = group.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
            });
            
            // Remove any existing success message
            const existingSuccessMessage = document.querySelector('.form-success-message');
            if (existingSuccessMessage) {
                existingSuccessMessage.remove();
            }
            
            // Validate each required field
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your full name');
                isValid = false;
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Program validation
            const programSelect = document.getElementById('program');
            if (!programSelect.value) {
                showError(programSelect, 'Please select a program');
                isValid = false;
            }
            
            // Dates validation
            const datesInput = document.getElementById('dates');
            if (!datesInput.value.trim()) {
                showError(datesInput, 'Please enter your preferred dates');
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // Hide the form
                contactForm.style.display = 'none';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                
                // Get the user's name for personalization
                const userName = nameInput.value.trim().split(' ')[0];
                
                successMessage.innerHTML = `
                    <h3>Thank You, ${userName}!</h3>
                    <p>Your booking request for the ${programSelect.options[programSelect.selectedIndex].text} has been submitted.</p>
                    <p>We will review your request and contact you at ${emailInput.value.trim()} within 24 hours.</p>
                    <p>Have a lovely day and we look forward to diving with you soon!</p>
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                `;
                
                // Insert the success message where the form was
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // In the future, we'll add email functionality here
                // For now, just show the success message
            }
        });
    }
    
    // Helper function to show error message
    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `<i class="fas fa-times-circle"></i> ${message}`;
        
        formGroup.appendChild(errorMessage);
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
