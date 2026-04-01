document.addEventListener('DOMContentLoaded', () => {
    // Generate Table of Contents
    const sections = document.querySelectorAll('.term-section');
    const tocList = document.getElementById('toc-list');
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent;
        const id = section.id;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = `#${id}`;
        a.textContent = title;
        
        // Smooth scrolling for anchor links
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById(id);
            const headerOffset = 100; // Account for fixed header
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
        
        li.appendChild(a);
        tocList.appendChild(li);
    });

    // Intersection Observer for scroll animations (reveal effect)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Hide/Show Header on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.glass-header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header logic
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        
        // Back to top logic
        if (currentScroll > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });

    // Back to top action
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
