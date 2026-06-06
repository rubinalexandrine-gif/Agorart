
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-picker-toggle');
    const themePanel = document.getElementById('theme-panel');
    const themeOptions = document.querySelectorAll('[data-theme-choice]');
    const accentOptions = document.querySelectorAll('[data-accent-choice]');
    const storedTheme = localStorage.getItem('agorart-theme') || 'auto';
    const storedAccent = localStorage.getItem('agorart-accent') || 'gold';

    function getResolvedTheme(themeChoice) {
        if (themeChoice === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        return themeChoice;
    }

    function applyTheme(themeChoice) {
        document.documentElement.dataset.theme = getResolvedTheme(themeChoice);
        localStorage.setItem('agorart-theme', themeChoice);
        themeOptions.forEach((option) => {
            option.classList.toggle('is-active', option.dataset.themeChoice === themeChoice);
        });
    }

    function applyAccent(accentChoice) {
        document.documentElement.dataset.accent = accentChoice;
        localStorage.setItem('agorart-accent', accentChoice);
        accentOptions.forEach((option) => {
            option.classList.toggle('is-active', option.dataset.accentChoice === accentChoice);
        });
    }

    applyTheme(storedTheme);
    applyAccent(storedAccent);

    if (themeToggle && themePanel) {
        themeToggle.addEventListener('click', () => {
            const isOpen = themePanel.classList.toggle('is-open');
            themeToggle.classList.toggle('is-open', isOpen);
            themeToggle.setAttribute('aria-expanded', String(isOpen));
            themePanel.setAttribute('aria-hidden', String(!isOpen));
        });

        document.addEventListener('click', (event) => {
            if (!themePanel.classList.contains('is-open')) return;
            if (themePanel.contains(event.target) || themeToggle.contains(event.target)) return;

            themePanel.classList.remove('is-open');
            themeToggle.classList.remove('is-open');
            themeToggle.setAttribute('aria-expanded', 'false');
            themePanel.setAttribute('aria-hidden', 'true');
        });
    }

    themeOptions.forEach((option) => {
        option.addEventListener('click', () => {
            applyTheme(option.dataset.themeChoice);
        });
    });

    accentOptions.forEach((option) => {
        option.addEventListener('click', () => {
            applyAccent(option.dataset.accentChoice);
        });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentTheme = localStorage.getItem('agorart-theme') || 'auto';
        if (currentTheme === 'auto') {
            applyTheme('auto');
        }
    });

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 1. EFFET D'ÉCRITURE SUR LE TITRE
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const textContent = heroTitle.innerText;
        heroTitle.innerText = ''; 
        
        let i = 0;
        function typeEffect() {
            if (i < textContent.length) {
                heroTitle.innerHTML += textContent.charAt(i);
                i++;
                setTimeout(typeEffect, 50);
            } else {
                heroTitle.style.borderRight = "none"; // Optionnel : retire le curseur à la fin
            }
        }
        typeEffect();
    }

    // 2. ANIMATION D'APPARITION AU SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // On cible les cartes et les membres de l'équipe
    const items = document.querySelectorAll('.card, .admin-item');
    items.forEach(item => {
        item.classList.add('reveal-element');
        observer.observe(item);
    });

    // 3. EFFET DE PARALLAXE SUR LE LOGO
    window.addEventListener('mousemove', (e) => {
        const logo = document.querySelector('.logo-text');
        if (!logo) return;
        const moveX = (window.innerWidth / 2 - e.pageX) / 50;
        const moveY = (window.innerHeight / 2 - e.pageY) / 50;
        logo.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });

    const allRecipients = document.querySelector('[data-recipient-all]');
    const memberRecipients = document.querySelectorAll('[data-recipient-member]');

    if (allRecipients && memberRecipients.length > 0) {
        allRecipients.addEventListener('change', () => {
            if (allRecipients.checked) {
                memberRecipients.forEach((recipient) => {
                    recipient.checked = false;
                });
            }
        });

        memberRecipients.forEach((recipient) => {
            recipient.addEventListener('change', () => {
                if (recipient.checked) {
                    allRecipients.checked = false;
                }

                const hasSelectedMember = Array.from(memberRecipients).some((item) => item.checked);
                if (!hasSelectedMember) {
                    allRecipients.checked = true;
                }
            });
        });
    }

    const danceStage = document.querySelector('.dance-stage');
    const danceMarkers = document.querySelectorAll('[data-dance-style]');

    if (danceStage && danceMarkers.length > 0) {
        function setDanceStyle(style) {
            danceStage.dataset.activeDance = style;

            danceMarkers.forEach((marker) => {
                const isActive = marker.dataset.danceStyle === style;
                marker.classList.toggle('is-active', isActive);
                marker.setAttribute('aria-pressed', String(isActive));
            });
        }

        danceMarkers.forEach((marker) => {
            marker.addEventListener('click', () => {
                setDanceStyle(marker.dataset.danceStyle);
            });
        });

        setDanceStyle('hiphop');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    
    // On vérifie si "dejaVisite" existe dans la mémoire du navigateur
    if (sessionStorage.getItem('dejaVisite')) {
        // Si oui, on cache le splash immédiatement sans attendre
        if (splash) splash.style.display = 'none';
    } else {
        // Si c'est la première fois, on montre l'animation
        setTimeout(() => {
            if (splash) {
                splash.classList.add('fade-out');
                // On enregistre qu'il a vu l'animation
                sessionStorage.setItem('dejaVisite', 'true');
            }
        }, 3000); // 3 secondes
    }
});

// Fonction pour afficher les infos d'un lieu
function showInfo(titre, texte) {
    const panel = document.getElementById('info-panel');
    const titleElem = document.getElementById('panel-title');
    const descElem = document.getElementById('panel-desc');
    if (!panel || !titleElem || !descElem) return;

    titleElem.innerText = titre;
    descElem.innerText = texte;

    // Affiche le panneau
    panel.classList.remove('hidden');
}

// Fonction pour fermer le panneau
function closeInfo() {
    const panel = document.getElementById('info-panel');
    if (!panel) return;
    panel.classList.add('hidden');
}
