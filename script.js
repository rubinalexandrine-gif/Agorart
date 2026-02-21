
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