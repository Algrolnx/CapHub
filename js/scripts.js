const contactForm = document.getElementById('contact-form');

function setupEventListeners() {
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    setupSmoothScrolling();
}

function handleContactForm(e) {
    e.preventDefault();
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
    contactForm.reset();
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', initializeApp);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

}


