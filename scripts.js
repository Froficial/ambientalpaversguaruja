// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon based on menu state
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validate phone number format
            const phoneField = contactForm.querySelector('input[name="telefone"]');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^(\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/;
                if (!phonePattern.test(phoneField.value)) {
                    phoneField.classList.add('error');
                    valid = false;
                }
            }
            
            // Validate email format if provided
            const emailField = contactForm.querySelector('input[name="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    emailField.classList.add('error');
                    valid = false;
                }
            }
            
            if (!valid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            } else {
                // Track form submission for analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form'
                    });
                }
            }
        });
    }
    
    // Lead Popup
    const leadPopup = document.getElementById('leadPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const leadForm = document.getElementById('leadForm');
    
    if (leadPopup && closePopupBtn) {
        // Show popup after delay
        setTimeout(function() {
            if (!sessionStorage.getItem('popupShown')) {
                leadPopup.style.display = 'block';
            }
        }, 10000);
        
        // Close popup
        closePopupBtn.addEventListener('click', function() {
            leadPopup.style.display = 'none';
            sessionStorage.setItem('popupShown', 'true');
        });
        
        // Handle form submission
        if (leadForm) {
            leadForm.addEventListener('submit', function(e) {
                const nameField = leadForm.querySelector('input[name="nome"]');
                const emailField = leadForm.querySelector('input[name="email"]');
                
                let valid = true;
                
                if (!nameField.value.trim()) {
                    nameField.classList.add('error');
                    valid = false;
                } else {
                    nameField.classList.remove('error');
                }
                
                if (!emailField.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                    emailField.classList.add('error');
                    valid = false;
                } else {
                    emailField.classList.remove('error');
                }
                
                if (!valid) {
                    e.preventDefault();
                    alert('Por favor, preencha todos os campos corretamente.');
                } else {
                    // Track popup form submission
                    if (typeof gtag === 'function') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Lead',
                            'event_label': 'Popup Form'
                        });
                    }
                    
                    // Close popup after successful submission
                    setTimeout(function() {
                        leadPopup.style.display = 'none';
                        sessionStorage.setItem('popupShown', 'true');
                    }, 3000);
                }
            });
        }
    }
    
    // Countdown Timer for Limited Offer
    const countdownElements = document.querySelectorAll('.countdown');
    if (countdownElements.length > 0) {
        countdownElements.forEach(element => {
            // Get days from content or default to 7
            let days = parseInt(element.textContent.trim()) || 7;
            
            // Update countdown every day
            updateCountdown();
            
            // Set to update daily
            setInterval(updateCountdown, 86400000); // 24 hours
            
            function updateCountdown() {
                element.textContent = days + (days === 1 ? ' dia' : ' dias');
                
                // Decrease countdown
                if (days > 1) {
                    days--;
                } else {
                    // Reset to 7 when reaches 0
                    days = 7;
                }
                
                // Create urgency with color changes
                if (days <= 3) {
                    element.style.color = '#ff0000';
                    element.style.fontWeight = 'bold';
                }
            }
        });
    }
    
    // Highlight active menu based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Show Back-to-Top button on scroll
    const scrollThreshold = 300;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            if (!document.querySelector('.back-to-top')) {
                const backToTopBtn = document.createElement('a');
                backToTopBtn.className = 'back-to-top';
                backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                backToTopBtn.href = '#';
                backToTopBtn.style.position = 'fixed';
                backToTopBtn.style.bottom = '80px';
                backToTopBtn.style.right = '20px';
                backToTopBtn.style.backgroundColor = 'var(--primary)';
                backToTopBtn.style.color = 'white';
                backToTopBtn.style.width = '40px';
                backToTopBtn.style.height = '40px';
                backToTopBtn.style.borderRadius = '50%';
                backToTopBtn.style.display = 'flex';
                backToTopBtn.style.justifyContent = 'center';
                backToTopBtn.style.alignItems = 'center';
                backToTopBtn.style.textDecoration = 'none';
                backToTopBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                backToTopBtn.style.zIndex = '99';
                backToTopBtn.style.transition = 'all 0.3s ease';
                
                backToTopBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                
                document.body.appendChild(backToTopBtn);
            }
        } else {
            const backToTopBtn = document.querySelector('.back-to-top');
            if (backToTopBtn) {
                backToTopBtn.remove();
            }
        }
    });
});
