// Auth page specific JavaScript (login, register, reset password, etc.)

// Add auth-specific animations
const authStyle = document.createElement('style');
authStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .auth-submit-btn, .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .form-control, .auth-form-control {
        transition: transform 0.2s ease;
    }
    
    /* Loading animation for all auth forms */
    .auth-submit-btn.loading, .submit-btn.loading {
        position: relative;
        pointer-events: none;
        opacity: 0.9;
    }
    
    .auth-submit-btn.loading span, .submit-btn.loading span {
        opacity: 0;
    }
    
    .auth-submit-btn.loading:after, .submit-btn.loading:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(authStyle);

// Auth page DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
    // Add focus animation to form inputs
    const inputs = document.querySelectorAll('.form-control, .auth-form-control');
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
    
    // Add ripple effect to submit buttons
    const submitBtns = document.querySelectorAll('.auth-submit-btn, .submit-btn');
    submitBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
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
    });
    
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
    
    // Add loading state to all auth forms
    const authForms = document.querySelectorAll('.auth-form, .register-form, .reset-form');
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.auth-submit-btn, .submit-btn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.classList.add('loading');
                
                // Store original text
                const originalText = submitBtn.innerHTML;
                submitBtn.setAttribute('data-original-text', originalText);
                
                // Set loading text based on form type
                const isLogin = form.classList.contains('auth-form') || window.location.pathname.includes('login');
                const isRegister = form.classList.contains('register-form') || window.location.pathname.includes('register');
                const isReset = form.classList.contains('reset-form') || window.location.pathname.includes('reset');
                
                if (isLogin) {
                    submitBtn.innerHTML = '<span>Signing In...</span>';
                } else if (isRegister) {
                    submitBtn.innerHTML = '<span>Creating Account...</span>';
                } else if (isReset) {
                    submitBtn.innerHTML = '<span>Sending Reset Link...</span>';
                }
                
                submitBtn.disabled = true;
                
                // Re-enable button after 5 seconds (in case form doesn't submit)
                setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                        const original = submitBtn.getAttribute('data-original-text');
                        if (original) submitBtn.innerHTML = original;
                    }
                }, 5000);
            }
        });
    });
    
    // Password toggle functionality for all auth pages
    function setupPasswordToggle() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            const inputId = toggle.id.replace('-toggle', '-input');
            const input = document.getElementById(inputId);
            
            if (input) {
                toggle.addEventListener('click', function() {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    this.classList.toggle('active');
                    this.innerHTML = type === 'password' ? 
                        '<i class="bi bi-eye"></i>' : 
                        '<i class="bi bi-eye-slash"></i>';
                });
            }
        });
    }
    
    setupPasswordToggle();
    
    // Add auth page class to body for navbar hiding
    const path = window.location.pathname;
    if (path.includes('login') || path.includes('register') || path.includes('reset')) {
        document.body.classList.add('auth-page');
    }
});