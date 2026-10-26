/**
 * LCDesign & Code - Inicializador Principal
 */

import { initNavigation } from './navigation.js';
import { initModalQuieroMiSitio } from './modalQuieroMiSitio.js';
import { initFormQuieroMiSitio } from './formQuieroMiSitio.js';
import { initCarouselProjects } from './carouselProjects.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar navegación y menú hamburguesa
    initNavigation();

    // 2. Inicializar carrusel interactivo de proyectos (swipe, flechas y dots)
    initCarouselProjects();

    // 3. Inicializar lógica del formulario de cotización
    const formController = initFormQuieroMiSitio();

    // 4. Inicializar modal con callback de reseteo al cerrar
    initModalQuieroMiSitio(() => {
        if (formController && typeof formController.resetFormState === 'function') {
            formController.resetFormState();
        }
    });
});
