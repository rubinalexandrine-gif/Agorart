
document.addEventListener('DOMContentLoaded', () => {

    // 1. EFFET D'ÉCRITURE SUR LE TITRE
    const heroTitle = document.querySelector('.hero h2');
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
        const moveX = (window.innerWidth / 2 - e.pageX) / 50;
        const moveY = (window.innerHeight / 2 - e.pageY) / 50;
        logo.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
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