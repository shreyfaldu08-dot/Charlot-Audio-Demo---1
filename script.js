document.addEventListener('DOMContentLoaded', () => {
    // Only register ScrollTrigger if gsap is loaded and we need it
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Check if prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Navigation Smart Hide & Hover Reveal
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled background state if needed
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            nav.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // Reveal header if mouse approaches the top of the screen
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 80) {
            nav.classList.remove('nav-hidden');
        }
    });

    if (!prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
        // 3. Theme Transition (Dark to Light to Dark)
        const themeTriggers = document.querySelectorAll('.theme-trigger');
        themeTriggers.forEach(trigger => {
            ScrollTrigger.create({
                trigger: trigger,
                start: "top center",
                onEnter: () => document.body.classList.add('theme-light'),
                onLeaveBack: () => document.body.classList.remove('theme-light')
            });
        });
        
        const darkTriggers = document.querySelectorAll('.theme-trigger-dark');
        darkTriggers.forEach(trigger => {
            ScrollTrigger.create({
                trigger: trigger,
                start: "top center",
                onEnter: () => document.body.classList.remove('theme-light'),
                onLeaveBack: () => document.body.classList.add('theme-light')
            });
        });

        // 4. Our Approach (Sticky scroll)
        const stages = document.querySelectorAll('.approach-stage');
        const visuals = document.querySelectorAll('.a-visuals img');
        
        if (stages.length > 0 && visuals.length > 0) {
            stages.forEach((stage, index) => {
                ScrollTrigger.create({
                    trigger: stage,
                    start: "top center",
                    end: "bottom center",
                    onToggle: self => {
                        if (self.isActive) {
                            stages.forEach(s => s.classList.remove('active'));
                            stage.classList.add('active');
                            
                            visuals.forEach(v => v.classList.remove('active'));
                            if(visuals[index]) visuals[index].classList.add('active');
                        }
                    }
                });
            });
        }
    }

    // 6. Event Discovery Interactive Panels
    const panels = document.querySelectorAll('.d-panel');
    panels.forEach(panel => {
        const activate = () => {
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        };
        panel.addEventListener('mouseenter', activate);
        panel.addEventListener('focus', activate);
        panel.addEventListener('click', activate);
    });

    // 7. Packages Tabs
    const tabs = document.querySelectorAll('.pkg-tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }
});
