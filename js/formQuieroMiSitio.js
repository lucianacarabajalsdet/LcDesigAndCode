/**
 * LCDesign & Code - Lógica del Formulario "Quiero mi sitio" (Integración Apps Script)
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjQ-GCYIsGMoGL16ZZfn37xRaoLk2VSbkYleq1INBXuy6-xT9U6154SwOK57Bthkvm/exec';

export function initFormQuieroMiSitio() {
    const prospectForm = document.getElementById('formQuieroMiSitio');
    const submitBtn = document.getElementById('submitBtnQuieroMiSitio');
    const successMessage = document.getElementById('successQuieroMiSitio');

    const radioSi = document.getElementById('tieneWebSi');
    const radioNo = document.getElementById('tieneWebNo');
    const urlContainer = document.getElementById('urlWebContainer');
    const urlInput = document.getElementById('formWebUrl');

    if (!prospectForm) return;

    // --- Campo Condicional de URL Web ---
    const toggleUrlField = () => {
        if (!urlContainer || !urlInput) return;

        if (radioSi && radioSi.checked) {
            urlContainer.classList.remove('u-hidden');
            urlInput.setAttribute('required', 'true');
        } else {
            urlContainer.classList.add('u-hidden');
            urlInput.removeAttribute('required');
            urlInput.value = '';
        }
    };

    if (radioSi && radioNo) {
        radioSi.addEventListener('change', toggleUrlField);
        radioNo.addEventListener('change', toggleUrlField);
    }

    // --- Envío del Formulario (HTTP POST a Google Apps Script) ---
    prospectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Feedback visual inmediato
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando requerimientos... ⏳';
        }

        // Empaquetar los datos del formulario (conserva exactamente los atributos name)
        const formData = new URLSearchParams(new FormData(prospectForm));

        fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                prospectForm.classList.add('u-hidden');
                if (successMessage) {
                    successMessage.classList.remove('u-hidden');
                }
            } else {
                throw new Error(data.message || 'Error desconocido en el servidor.');
            }
        })
        .catch(error => {
            console.error('Error en el envío del formulario Quiero mi sitio:', error);
            alert('¡Oops! Tuvimos un problema al procesar tus datos. Por favor, reintentá o comunicate vía WhatsApp.');
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Enviar y Cotizar mi Sitio <span class="btn-icon">➤</span>';
            }
        });
    });

    // Función para resetear el estado visual del formulario cuando se cierra el modal
    const resetFormState = () => {
        setTimeout(() => {
            prospectForm.reset();
            prospectForm.classList.remove('u-hidden');
            if (successMessage) successMessage.classList.add('u-hidden');
            if (urlContainer) urlContainer.classList.add('u-hidden');
            if (urlInput) urlInput.removeAttribute('required');
        }, 300);
    };

    return {
        resetFormState
    };
}
