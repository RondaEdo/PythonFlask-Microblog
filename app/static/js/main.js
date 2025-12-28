
    // Combined JavaScript for both base and login functionality
    
    // Add pulse animation for error messages
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        @keyframes pulse {
            from { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4); }
            to { box-shadow: 0 0 0 6px rgba(220, 53, 69, 0); }
        }
        
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
    `;
    document.head.appendChild(errorStyle);
    
    // Main DOMContentLoaded function
    document.addEventListener('DOMContentLoaded', function() {
        // === Base template animations ===
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add fade-in animation for messages
        const messages = document.querySelectorAll('.message-item');
        messages.forEach((msg, index) => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(10px)';
            setTimeout(() => {
                msg.style.transition = 'all 0.4s ease';
                msg.style.opacity = '1';
                msg.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Add special animation for error messages
        const errorMessages = document.querySelectorAll('.message-item.error');
        errorMessages.forEach((msg, index) => {
            msg.style.animation = 'pulse 1.5s infinite alternate';
        });
        
        // === Login page specific animations ===
        // Add focus animation to form inputs
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
        
        // Add ripple effect to submit button (only if button exists)
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
                    ripple.remove();
                }, 600);
            });
        }
    });