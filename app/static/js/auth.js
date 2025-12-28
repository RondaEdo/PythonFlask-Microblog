// Auth page specific JavaScript (login, register, etc.)

// Add auth-specific animations
const authStyle = document.createElement('style');
authStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .auth-submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .form-control {
        transition: transform 0.2s ease;
    }
`;

document.head.appendChild(authStyle);

// Auth page DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
    // Add focus animation to form inputs
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-1px)';
            if (this.parentElement) {
                this.parentElement.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
            if (this.parentElement) {
                this.parentElement.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add ripple effect to submit button
    const submitBtn = document.querySelector('.auth-submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode === this) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    }
    
    // Add animation to create account button
    const createAccountBtn = document.querySelector('.create-account-btn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        createAccountBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Add login page class to body for navbar hiding
    document.body.classList.add('login-page');
});