function validarFormularioContacto(nombre, email, mensaje) {
    let esValido = true;
    
    // Validar nombre 
    if (!nombre || nombre.trim().length < 3) {
        mostrarError('error-nombre', 'El nombre debe tener al menos 3 caracteres');
        esValido = false;
    } else if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(nombre)) {
        mostrarError('error-nombre', 'El nombre solo puede contener letras');
        esValido = false;
    } else {
        limpiarError('error-nombre');
    }
    
    // Validar email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        mostrarError('error-email', 'Ingresa un email válido (ejemplo@dominio.com)');
        esValido = false;
    } else {
        limpiarError('error-email');
    }
    
    // Validar mensaje 
    if (!mensaje || mensaje.trim().length < 10) {
        mostrarError('error-mensaje', 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    } else if (mensaje.trim().length > 500) {
        mostrarError('error-mensaje', 'El mensaje no puede exceder los 500 caracteres');
        esValido = false;
    } else {
        limpiarError('error-mensaje');
    }
    
    return esValido;
}

function mostrarError(elementoId, mensaje) {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
      
        const campo = elemento.closest('.campo');
        if (campo) {
            const input = campo.querySelector('input, textarea');
            if (input) {
                input.style.borderColor = '#e74c3c';
            }
        }
    }
}

function limpiarError(elementoId) {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';

        const campo = elemento.closest('.campo');
        if (campo) {
            const input = campo.querySelector('input, textarea');
            if (input) {
                input.style.borderColor = '#ccc';
            }
        }
    }
}

function limpiarFormularioContacto() {
    const form = document.getElementById('contactoForm');
    if (form) {
        form.reset();
        
        // limpiar todos los errores
        limpiarError('error-nombre');
        limpiarError('error-email');
        limpiarError('error-mensaje');
        
        // mostrar mensaje de éxito
        mostrarMensajeExito('¡Mensaje enviado con éxito! Te contactaremos pronto.');
    }
}

function mostrarMensajeExito(mensaje) {
    const form = document.getElementById('contactoForm');
    if (form) {
        // eliminar mensaje de éxito anterior si existe
        const mensajeAnterior = document.querySelector('.mensaje-exito');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
        
        // nuevo mensaje de éxito
        const mensajeExito = document.createElement('div');
        mensajeExito.className = 'mensaje-exito';
        mensajeExito.style.cssText = `
            background-color: var(--verde-primario);
            color: white;
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        `;
        mensajeExito.textContent = mensaje;
        
        form.appendChild(mensajeExito);
        
        // ocultar mensaje después de 5 segundos
        setTimeout(() => {
            if (mensajeExito) {
                mensajeExito.style.opacity = '0';
                setTimeout(() => {
                    if (mensajeExito) mensajeExito.remove();
                }, 300);
            }
        }, 5000);
    }
}

// validación en tiempo real p
function configurarValidacionTiempoReal() {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeTextarea = document.getElementById('mensaje');
    
    if (nombreInput) {
        nombreInput.addEventListener('blur', () => {
            validarNombreTiempoReal(nombreInput.value);
        });
        nombreInput.addEventListener('input', () => {
            if (nombreInput.value.trim().length >= 3) {
                limpiarError('error-nombre');
                nombreInput.style.borderColor = '#ccc';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            validarEmailTiempoReal(emailInput.value);
        });
        emailInput.addEventListener('input', () => {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                limpiarError('error-email');
                emailInput.style.borderColor = '#ccc';
            }
        });
    }
    
    if (mensajeTextarea) {
        mensajeTextarea.addEventListener('blur', () => {
            validarMensajeTiempoReal(mensajeTextarea.value);
        });
        mensajeTextarea.addEventListener('input', () => {
            if (mensajeTextarea.value.trim().length >= 10) {
                limpiarError('error-mensaje');
                mensajeTextarea.style.borderColor = '#ccc';
            }
        });
    }
}

function validarNombreTiempoReal(nombre) {
    if (nombre && (nombre.trim().length < 3 || !/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(nombre))) {
        if (nombre.trim().length < 3 && nombre.trim().length > 0) {
            mostrarError('error-nombre', 'El nombre debe tener al menos 3 caracteres');
        } else if (nombre.trim().length >= 3 && !/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(nombre)) {
            mostrarError('error-nombre', 'El nombre solo puede contener letras');
        }
    } else if (nombre && nombre.trim().length >= 3) {
        limpiarError('error-nombre');
    }
}

function validarEmailTiempoReal(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email) && email.length > 0) {
        mostrarError('error-email', 'Ingresa un email válido');
    } else if (email && emailRegex.test(email)) {
        limpiarError('error-email');
    }
}

function validarMensajeTiempoReal(mensaje) {
    if (mensaje && mensaje.trim().length < 10 && mensaje.trim().length > 0) {
        mostrarError('error-mensaje', 'El mensaje debe tener al menos 10 caracteres');
    } else if (mensaje && mensaje.trim().length >= 10 && mensaje.trim().length <= 500) {
        limpiarError('error-mensaje');
    } else if (mensaje && mensaje.trim().length > 500) {
        mostrarError('error-mensaje', 'El mensaje no puede exceder los 500 caracteres');
    }
}