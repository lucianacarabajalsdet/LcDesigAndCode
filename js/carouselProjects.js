/**
 * LCDesign & Code - Carrusel Interactivo de Proyectos (Swipe + Flechas + Dots)
 */

export function initCarouselProjects() {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.getElementById('prevProjectBtn');
    const nextBtn = document.getElementById('nextProjectBtn');
    const dotsContainer = document.getElementById('projectDots');

    if (!carousel) return;

    const cards = carousel.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

    // Calcula el ancho de desplazamiento de una tarjeta + su espacio (gap)
    const getScrollAmount = () => {
        if (cards.length < 2) return cards[0].offsetWidth;
        const cardStyle = window.getComputedStyle(carousel);
        const gap = parseFloat(cardStyle.gap) || 20;
        return cards[0].offsetWidth + gap;
    };

    // Actualiza qué dot está activo según la posición de scroll
    let isTicking = false;
    const updateActiveDot = () => {
        const carouselLeft = carousel.getBoundingClientRect().left;
        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
            const cardLeft = card.getBoundingClientRect().left;
            const distance = Math.abs(cardLeft - carouselLeft);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        dots.forEach((dot, index) => {
            const isActive = index === closestIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Actualizar estado de las flechas (deshabilitar en los extremos)
        if (prevBtn) {
            const atStart = carousel.scrollLeft <= 5;
            prevBtn.disabled = atStart;
            prevBtn.classList.toggle('is-disabled', atStart);
        }

        if (nextBtn) {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth - 5;
            const atEnd = carousel.scrollLeft >= maxScroll;
            nextBtn.disabled = atEnd;
            nextBtn.classList.toggle('is-disabled', atEnd);
        }

        isTicking = false;
    };

    carousel.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(updateActiveDot);
            isTicking = true;
        }
    }, { passive: true });

    // Desplazamiento a la siguiente tarjeta
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const amount = getScrollAmount();
            carousel.scrollBy({ left: amount, behavior: 'smooth' });
        });
    }

    // Desplazamiento a la tarjeta anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const amount = getScrollAmount();
            carousel.scrollBy({ left: -amount, behavior: 'smooth' });
        });
    }

    // Navegación por clicks en los dots indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (cards[index]) {
                const cardLeft = cards[index].offsetLeft - carousel.offsetLeft;
                carousel.scrollTo({ left: cardLeft, behavior: 'smooth' });
            }
        });
    });

    // Inicializar estado inicial
    updateActiveDot();
}
