
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

    const campusMap = document.querySelector('[data-campus-map]');
    const campusItems = document.querySelectorAll('[data-campus-zone]');
    const campusFilters = document.querySelectorAll('[data-campus-filter]');
    const campusTourButton = document.querySelector('[data-campus-tour]');
    const campusZoomButton = document.querySelector('[data-campus-zoom]');
    const campusCounter = document.getElementById('campus-counter');
    const panelTitle = document.getElementById('panel-title');
    const panelDesc = document.getElementById('panel-desc');
    const panelType = document.getElementById('panel-type');
    const panelTags = document.getElementById('panel-tags');
    const panelLink = document.getElementById('panel-link');

    const campusZones = {
        north: {
            title: 'Bloc Nord',
            desc: 'Les salles de classe principales sont regroupées dans cette aile, pensée pour les parcours quotidiens les plus fréquents.',
            type: 'Apprendre',
            tags: 'Cours, circulation, étage',
            link: 'contact.html'
        },
        west: {
            title: 'Aile Ouest',
            desc: 'Cette aile regroupe les salles de classe des élèves du primaire et du préscolaire.',
            type: 'Primaire et préscolaire',
            tags: 'Salles de classe, jeunes élèves, encadrement',
            link: 'contact.html'
        },
        south: {
            title: 'Bloc Sud',
            desc: 'Le bloc sud rassemble les deux laboratoires, chimie et physique, ainsi que la grande salle.',
            type: 'Sciences et rassemblements',
            tags: 'Labo chimie, labo physique, grande salle',
            link: 'contact.html'
        },
        east: {
            title: 'Aile Est',
            desc: 'Cette aile correspond à la partie secondaire et regroupe aussi le bar, l’infirmerie et la salle informatique.',
            type: 'Secondaire et services',
            tags: 'Secondaire, bar, infirmerie, salle informatique',
            link: 'contact.html'
        },
        courtyard: {
            title: 'Cour centrale',
            desc: 'Le cœur ouvert du bâtiment, utile pour les rassemblements, les transitions et les temps informels.',
            type: 'Vie scolaire',
            tags: 'Rassemblement, circulation, plein air',
            link: 'contact.html'
        },
        entry: {
            title: 'Entrée principale',
            desc: 'Le repère d’arrivée pour les élèves, les familles et les visiteurs avant de rejoindre l’accueil.',
            type: 'Accès',
            tags: 'Arrivée, contrôle, orientation',
            link: 'contact.html'
        },
        library: {
            title: 'Bibliothèque',
            desc: 'Un espace calme pour lire, rechercher, travailler en autonomie ou préparer un projet.',
            type: 'Apprendre',
            tags: 'Lecture, recherche, silence',
            link: 'talent-litterature.html'
        },
        lab: {
            title: 'Laboratoire',
            desc: 'Un lieu d’expérimentation où les cours deviennent plus pratiques et visuels.',
            type: 'Apprendre',
            tags: 'Sciences, expériences, sécurité',
            link: 'contact.html'
        },
        sanitary: {
            title: 'Sanitaires',
            desc: 'Un repère pratique à identifier rapidement dans les déplacements quotidiens.',
            type: 'Vie scolaire',
            tags: 'Service, proximité, quotidien',
            link: 'contact.html'
        }
    };

    if (campusMap && campusItems.length > 0) {
        let activeFilter = 'all';
        let tourTimer = null;
        const tourOrder = ['entry', 'west', 'north', 'library', 'courtyard', 'east', 'lab', 'south', 'sanitary'];

        function updateCampusPanel(zoneKey) {
            const zone = campusZones[zoneKey];
            if (!zone || !panelTitle || !panelDesc) return;

            panelTitle.innerText = zone.title;
            panelDesc.innerText = zone.desc;

            if (panelType) panelType.innerText = zone.type;
            if (panelTags) panelTags.innerText = zone.tags;
            if (panelLink) panelLink.setAttribute('href', zone.link);
        }

        function stopCampusTour() {
            if (tourTimer) {
                clearInterval(tourTimer);
                tourTimer = null;
            }

            campusTourButton?.classList.remove('is-active');
            campusTourButton?.setAttribute('aria-pressed', 'false');
            campusItems.forEach((item) => item.classList.remove('is-tour-step'));
        }

        function selectCampusZone(zoneKey, options = {}) {
            const selectedItem = Array.from(campusItems).find((item) => item.dataset.campusZone === zoneKey);
            if (!selectedItem) return;

            campusItems.forEach((item) => {
                const isActive = item.dataset.campusZone === zoneKey;
                item.classList.toggle('is-active', isActive);
                item.classList.toggle('is-tour-step', Boolean(options.tour) && isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            updateCampusPanel(zoneKey);

            if (!options.keepTour) {
                stopCampusTour();
            }
        }

        function applyCampusFilter(filter) {
            activeFilter = filter;

            campusFilters.forEach((button) => {
                const isActive = button.dataset.campusFilter === filter;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            let visibleCount = 0;
            campusItems.forEach((item) => {
                const isVisible = filter === 'all' || item.dataset.campusKind === filter;
                item.classList.toggle('is-muted', !isVisible);
                if (isVisible) visibleCount++;
            });

            if (campusCounter) {
                const suffix = filter === 'all' ? 'zones disponibles.' : 'zones dans ce filtre.';
                campusCounter.innerText = `${visibleCount} ${suffix}`;
            }
        }

        campusItems.forEach((item) => {
            item.addEventListener('click', () => {
                selectCampusZone(item.dataset.campusZone);
            });
        });

        campusFilters.forEach((button) => {
            button.addEventListener('click', () => {
                stopCampusTour();
                applyCampusFilter(button.dataset.campusFilter);
            });
        });

        campusTourButton?.setAttribute('aria-pressed', 'false');
        campusTourButton?.addEventListener('click', () => {
            if (tourTimer) {
                stopCampusTour();
                return;
            }

            let index = 0;
            campusTourButton.classList.add('is-active');
            campusTourButton.setAttribute('aria-pressed', 'true');
            applyCampusFilter('all');
            selectCampusZone(tourOrder[index], { tour: true, keepTour: true });

            tourTimer = setInterval(() => {
                index = (index + 1) % tourOrder.length;
                selectCampusZone(tourOrder[index], { tour: true, keepTour: true });
            }, 2200);
        });

        campusZoomButton?.setAttribute('aria-pressed', 'false');
        campusZoomButton?.addEventListener('click', () => {
            const isZoomed = campusMap.dataset.campusZoomed === 'true';
            campusMap.dataset.campusZoomed = String(!isZoomed);
            campusZoomButton.classList.toggle('is-active', !isZoomed);
            campusZoomButton.setAttribute('aria-pressed', String(!isZoomed));
        });

        campusMap.addEventListener('keydown', (event) => {
            const activeElement = document.activeElement;
            if (!activeElement?.matches('[data-campus-zone]')) return;
            if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;

            event.preventDefault();
            const visibleItems = Array.from(campusItems).filter((item) => {
                return activeFilter === 'all' || item.dataset.campusKind === activeFilter;
            });
            const currentIndex = visibleItems.indexOf(activeElement);
            const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
            const nextIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
            visibleItems[nextIndex].focus();
            selectCampusZone(visibleItems[nextIndex].dataset.campusZone);
        });

        applyCampusFilter('all');
        selectCampusZone('north');
    }

    document.querySelectorAll('[data-talent-board]').forEach((board) => {
        const cards = board.querySelectorAll('[data-talent-card]');
        const panels = board.querySelectorAll('[data-talent-panel]');

        function selectTalentCard(targetKey) {
            cards.forEach((card) => {
                const isActive = card.dataset.talentCard === targetKey;
                card.classList.toggle('is-active', isActive);
                card.setAttribute('aria-pressed', String(isActive));
            });

            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.dataset.talentPanel === targetKey);
            });
        }

        cards.forEach((card) => {
            card.addEventListener('click', () => {
                selectTalentCard(card.dataset.talentCard);
            });
        });

        if (cards.length > 0) {
            selectTalentCard(cards[0].dataset.talentCard);
        }
    });
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
