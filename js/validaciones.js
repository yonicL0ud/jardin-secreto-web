function inicializarValidaciones() {
    const form = document.getElementById('contactoForm');
    if (!form) return;
    
    form.addEventListener('submit', validarFormulario);
    
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeTextarea = document.getElementById('mensaje');
    
    if (nombreInput) {
        nombreInput.addEventListener('input', () => validarCampo('nombre'));
        nombreInput.addEventListener('blur', () => validarCampo('nombre'));
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => validarCampo('email'));
        emailInput.addEventListener('blur', () => validarCampo('email'));
    }
    
    if (mensajeTextarea) {
        mensajeTextarea.addEventListener('input', () => validarCampo('mensaje'));
        mensajeTextarea.addEventListener('blur', () => validarCampo('mensaje'));
    }
}

function validarFormulario(event) {
    event.preventDefault();
    
    const esNombreValido = validarCampo('nombre');
    const esEmailValido = validarCampo('email');
    const esMensajeValido = validarCampo('mensaje');
    
    if (esNombreValido && esEmailValido && esMensajeValido) {
        mostrarExitoFormulario();
        document.getElementById('contactoForm').reset();
        limpiarErrores();
    }
}

function validarCampo(campoId) {
    const campo = document.getElementById(campoId);
    const errorSpan = document.getElementById(`error-${campoId}`);
    
    if (!campo || !errorSpan) return false;
    
    let esValido = true;
    let mensajeError = '';
    const valor = campo.value.trim();
    
    switch(campoId) {
        case 'nombre':
            if (valor === '') {
                mensajeError = '🌿 El nombre es obligatorio';
                esValido = false;
            } else if (valor.length < 2) {
                mensajeError = '🌿 El nombre debe tener al menos 2 caracteres';
                esValido = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor === '') {
                mensajeError = '📧 El email es obligatorio';
                esValido = false;
            } else if (!emailRegex.test(valor)) {
                mensajeError = '📧 Ingresa un email válido (ejemplo@correo.com)';
                esValido = false;
            }
            break;
            
        case 'mensaje':
            if (valor === '') {
                mensajeError = '💬 El mensaje es obligatorio';
                esValido = false;
            } else if (valor.length < 10) {
                mensajeError = '💬 El mensaje debe tener al menos 10 caracteres';
                esValido = false;
            }
            break;
    }
    
    if (!esValido) {
        errorSpan.textContent = mensajeError;
        campo.style.borderColor = '#e74c3c';
    } else {
        errorSpan.textContent = '';
        campo.style.borderColor = '#27ae60';
    }
    
    return esValido;
}

function limpiarErrores() {
    const campos = ['nombre', 'email', 'mensaje'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        const errorSpan = document.getElementById(`error-${campoId}`);
        if (campo) campo.style.borderColor = '';
        if (errorSpan) errorSpan.textContent = '';
    });
}

function mostrarExitoFormulario() {
    const mensajeExito = document.createElement('div');
    mensajeExito.className = 'mensaje-exito';
    mensajeExito.innerHTML = `
        <div class="exito-contenido">
            <span class="exito-icono">🌿✨</span>
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>Gracias por contactarte con Jardín Secreto. Te responderemos pronto.</p>
        </div>
    `;
    
    const formContainer = document.querySelector('.formulario-contacto');
    const form = document.getElementById('contactoForm');
    
    if (formContainer && form) {
        formContainer.insertBefore(mensajeExito, form);
        setTimeout(() => {
            mensajeExito.style.opacity = '0';
            setTimeout(() => mensajeExito.remove(), 500);
        }, 4000);
    }
}