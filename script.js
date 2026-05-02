document.addEventListener('DOMContentLoaded', () => {
    // Header background change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.03)';
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer is removed because we use AOS now

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(0,0,0,0.98)';
                nav.style.padding = '40px 20px';
                nav.style.borderBottom = '1px solid var(--color-gold)';
                const ul = nav.querySelector('ul');
                ul.style.display = 'flex';
                ul.style.flexDirection = 'column';
                ul.style.gap = '20px';
                ul.style.textAlign = 'center';
            } else {
                nav.style.display = 'none';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            nav.style.display = 'none';
        }
    });
});
