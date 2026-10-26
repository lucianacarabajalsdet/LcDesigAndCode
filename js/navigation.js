/**
 * LCDesign & Code - Control de Navegación y Menú Hamburguesa Mobile
 */

export function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (!menuToggle || !mainNav) return;

    const navLinks = mainNav.querySelectorAll('.nav-link, .header-cta-mobile');

    const openMenu = () => {
        menuToggle.classList.add('is-active');
        mainNav.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menuToggle.classList.remove('is-active');
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        const isOpen = mainNav.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    // Click en el botón hamburguesa
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar automáticamente al hacer click en cualquier enlace interno
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                closeMenu();
            }
        });
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Restaurar si el usuario redimensiona la ventana a escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mainNav.classList.contains('is-open')) {
            closeMenu();
        }
    });
}
