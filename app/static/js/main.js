// Global JavaScript for the entire app

// Add global animations
const globalStyle = document.createElement('style');
globalStyle.textContent = `
    @keyframes pulse {
        from { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4); }
        to { box-shadow: 0 0 0 6px rgba(220, 53, 69, 0); }
    }
`;

document.head.appendChild(globalStyle);

// Main DOMContentLoaded function for global elements
document.addEventListener('DOMContentLoaded', function() {
    // === Global template animations ===
    // Navbar link hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Fade-in animation for flash messages
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
    
    // Pulse animation for error messages
    const errorMessages = document.querySelectorAll('.message-item.error');
    errorMessages.forEach((msg, index) => {
        msg.style.animation = 'pulse 1.5s infinite alternate';
    });
});