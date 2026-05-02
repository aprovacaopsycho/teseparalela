document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('mobileOverlay');
    let isMenuOpen = false;

    // ===== HEADER SCROLL EFFECT =====
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    // Initial check
    handleHeaderScroll();

    // ===== MOBILE MENU =====
    function openMenu() {
        isMenuOpen = true;
        nav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate nav in
        nav.style.display = 'block';
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.right = '-100%';
        nav.style.width = '300px';
        nav.style.height = '100vh';
        nav.style.background = 'rgba(0, 0, 0, 0.98)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.borderLeft = '1px solid rgba(197, 160, 89, 0.2)';
        nav.style.padding = '100px 40px 40px';
        nav.style.zIndex = '1000';
        nav.style.transition = 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        // Force reflow then animate
        requestAnimationFrame(() => {
            nav.style.right = '0';
        });

        const ul = nav.querySelector('ul');
        ul.style.display = 'flex';
        ul.style.flexDirection = 'column';
        ul.style.gap = '25px';
        ul.style.textAlign = 'left';

        // Change icon
        const icon = mobileBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'x');
        lucide.createIcons();
    }

    function closeMenu() {
        isMenuOpen = false;
        nav.style.right = '-100%';
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            nav.classList.remove('active');
            nav.style.display = 'none';
        }, 300);

        // Change icon back
        const icon = mobileBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== COUNTER ANIMATION =====
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.textContent.includes('%') ? '%' : '';
        const prefix = element.textContent.startsWith('+') ? '+' : '';
        let current = 0;
        const increment = target > 50 ? Math.ceil(target / 60) : 1;
        const duration = 2000; // 2 seconds
        const stepTime = Math.floor(duration / target);

        function updateCounter() {
            current += increment;
            if (current >= target) {
                current = target;
                element.textContent = prefix + current + suffix;
                return;
            }
            element.textContent = prefix + current + suffix;
            setTimeout(updateCounter, stepTime);
        }

        updateCounter();
    }

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===== PARALLAX EFFECT ON HERO (subtle) =====
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.backgroundPositionY = `calc(50% - ${rate}px)`;
        }, { passive: true });
    }
});
