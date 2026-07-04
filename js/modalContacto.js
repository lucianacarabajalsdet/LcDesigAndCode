/**
 * LCDesign & Code - Gestión del Modal e Integración con Google Sheets
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const openModalBtn = document.querySelector('.btn-hero[href="#contacto"]');
    const modalOverlay = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    const prospectForm = document.getElementById('prospectForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    const radioSi = document.getElementById("tieneWebSi");
    const radioNo = document.getElementById("tieneWebNo");
    const urlContainer = document.getElementById("urlWebContainer");
    const urlInput = document.getElementById("formWebUrl");

    // URL QUE GENERE DE APPS SCRIPT
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjQ-GCYIsGMoGL16ZZfn37xRaoLk2VSbkYleq1INBXuy6-xT9U6154SwOK57Bthkvm/exec';

    //  Funciones de Apertura y Cierre
    const openModal = (e) => {
        if (e) e.preventDefault();
        if (modalOverlay) {
            modalOverlay.classList.add('is-active');
            modalOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('is-active');
            modalOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Reseteo  el formulario y mensajes al cerrar
            setTimeout(() => {
                if (prospectForm) prospectForm.style.display = 'block';
                if (successMessage) successMessage.style.display = 'none';
                if (prospectForm) prospectForm.reset();
                if (urlContainer) urlContainer.style.display = 'none'; // Resetea el campo oculto
            }, 300);
        }
    };

    // eventos básicos del modal
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-active')) {
            closeModal();
        }
    });

    //  Lógica del Campo Condicional (Web URL) - validar luego
    function toggleUrlField() {
        if (urlContainer && urlInput) {
            if (radioSi && radioSi.checked) {
                urlContainer.style.display = "flex"; // aca Muestro el el contenedor
                urlInput.setAttribute("required", "true"); // esto lo hace obligatorio
            } else {
                urlContainer.style.display = "none"; // Lo oculta por completamento osea 
                urlInput.removeAttribute("required"); // saco la obligatoriedad
                urlInput.value = "";
            }
        }
    }

    // Escuchamos los cambios en los radio buttons si existen en el DOM
    if (radioSi && radioNo) {
        radioSi.addEventListener("change", toggleUrlField);
        radioNo.addEventListener("change", toggleUrlField);
    }

    
    //  ENVÍO DEL FORMULARIO seria como la Integración Backend
    
    if (prospectForm) {
        prospectForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitamos que la página se recargue

            // Feedback visual: Cambiamos el estado del botón mientras procesa
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Enviando requerimientos... ⏳';
            }

            // Usamos URLSearchParams para empaquetar los datos para el Apps Script
            const formData = new URLSearchParams(new FormData(prospectForm));

            // Hacemos la petición HTTP POST a Google Sheets
            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(data => {
               
                if (data.status === 'success') {
                    // Ocultamos el formulario y mostramos el ok dec 
                    prospectForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                } else {
                    throw new Error(data.message || 'Error desconocido en el servidor.');
                }
            })
            .catch(error => {
                // Captura defensiva de errores
                console.error('Error en el envío del formulario:', error);
                alert('¡Oops! Tuvimos un problema al procesar tus datos. Por favor, reintentá o comunicate por WhatsApp.');
            })
            .finally(() => {
                // Pase lo que pase, restauramos el estado del botón importante repasar !
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Enviar y Cotizar mi Sitio <span class="btnn-icon">➤</span>';
                }
            });
        });
    }
});