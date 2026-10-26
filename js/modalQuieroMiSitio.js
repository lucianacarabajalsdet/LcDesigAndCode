/**
 * LCDesign & Code - Control del Modal "Quiero mi sitio"
 */

export function initModalQuieroMiSitio(onCloseCallback) {
    const modalOverlay = document.getElementById('modalQuieroMiSitio');
    const closeModalBtn = document.getElementById('closeModalQuieroMiSitio');
    const openModalButtons = document.querySelectorAll('.js-open-quiero-mi-sitio');

    if (!modalOverlay) return;

    let previousActiveElement = null;

    const openModal = (e) => {
        if (e) e.preventDefault();
        previousActiveElement = document.activeElement;
        
        modalOverlay.classList.add('is-active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Poner foco en el primer campo interactivo o botón de cerrar
        const firstFocusable = modalOverlay.querySelector('input, select, textarea, button');
        if (firstFocusable) firstFocusable.focus();
    };

    const closeModal = () => {
        modalOverlay.classList.remove('is-active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
            previousActiveElement.focus();
        }

        if (typeof onCloseCallback === 'function') {
            onCloseCallback();
        }
    };

    // Vincular todos los botones que abran este modal (header desktop y mobile)
    openModalButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Cierre por botón cruz
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Cierre por click en el overlay oscuro
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Cierre por tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
            closeModal();
        }
    });

    return {
        openModal,
        closeModal
    };
}
