document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-up animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to about text, portfolio items and gallery items
    const scrollElements = document.querySelectorAll('.about-text p, .portfolio-item, .gallery-item, .internal-hero');
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Observer to trigger hover effect on mobile when scrolling past
    const mobileHoverObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { root: null, rootMargin: '-25% 0px -25% 0px', threshold: 0 });

    document.querySelectorAll('.portfolio-item, .gallery-item').forEach(item => {
        mobileHoverObserver.observe(item);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gentle parallax effect on hero image
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrollPos * 0.1}px) scale(1.05)`;
            }
        });
    }

    // Modal Logic for Privacy & Terms
    const modals = {
        terms: document.getElementById('terms-modal'),
        privacy: document.getElementById('privacy-modal')
    };

    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            if (modals[modalId]) {
                modals[modalId].classList.add('active');
            }
        });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('active');
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        if (!localStorage.getItem('breathefilm_cookies_selection')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000); // Exibe 1 segundo após carregar a página
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('breathefilm_cookies_selection', 'accepted_all');
            cookieBanner.classList.remove('show');
        });

        if (rejectCookiesBtn) {
            rejectCookiesBtn.addEventListener('click', () => {
                localStorage.setItem('breathefilm_cookies_selection', 'necessary_only');
                cookieBanner.classList.remove('show');
            });
        }
    }
});
