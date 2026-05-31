function inicializarEventos() {
    // para el formulario de contacto
    console.log("🔄 Inicializando eventos...");
    const formContacto = document.getElementById('contactoForm');
    console.log("Formulario encontrado:", formContacto);
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Formulario enviado");
            
            const nombre = document.getElementById('nombre')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const mensaje = document.getElementById('mensaje')?.value || '';
            
            if (validarFormularioContacto(nombre, email, mensaje)) {
                limpiarFormularioContacto();
            }
        });
        
        // validación en tiempo real
        configurarValidacionTiempoReal();
    }
    
    // vaciar carrito
    const botonVaciar = document.getElementById('vaciar-carrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
                vaciarCarritoCompleto();
            }
        });
    }
    
    // para el icono del carrito en el header
    const carritoIcono = document.querySelector('.carrito-icono');
    if (carritoIcono && !window.location.pathname.includes('carrito.html')) {
        carritoIcono.addEventListener('click', () => {
            window.location.href = 'paginas/carrito.html';
        });
    }
    
    // efecto de scroll 
    configurarScrollSuave();
    
    // cargar vista del carrito si estamos en la página de carrito
    if (document.getElementById('items-carrito')) {
        actualizarVistaCarrito();
    }
}

function vaciarCarritoCompleto() {
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    if (document.getElementById('items-carrito')) {
        actualizarVistaCarrito();
    }
    mostrarNotificacion('Carrito vaciado correctamente', 'info');
}

function actualizarVistaCarrito() {
    const contenedorItems = document.getElementById('items-carrito');
    if (!contenedorItems) return;
    
    if (carrito.length === 0) {
        contenedorItems.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="font-size: 18px; color: var(--texto-oscuro);">🛒 Tu carrito está vacío</p>
                <a href="catalogo.html" class="btn-primario" style="display: inline-block; margin-top: 20px;">
                    Explorar catálogo
                </a>
            </div>
        `;
        actualizarTotales(0);
        return;
    }
    

    let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';
    let subtotal = 0;
    
    carrito.forEach((item, index) => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;
        
        html += `
            <div class="carrito-item" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: white;
                border-radius: 12px;
                padding: 15px;
                box-shadow: var(--sombra);
                transition: var(--transicion);
            ">
                <div style="display: flex; align-items: center; gap: 15px; flex: 2;">
                    <img src="${item.imagen || '../img/placeholder.jpg'}" 
                         alt="${item.nombre}"
                         style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="text-align: left;">
                        <h4 style="margin: 0 0 5px 0; color: var(--verde-primario);">${item.nombre}</h4>
                        <p style="margin: 0; font-weight: bold;">S/ ${item.precio.toFixed(2)}</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button class="btn-cantidad" data-index="${index}" data-accion="disminuir" style="
                        width: 30px;
                        height: 30px;
                        border: 2px solid var(--verde-primario);
                        background-color: white;
                        color: var(--verde-primario);
                        border-radius: 50%;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 18px;
                    ">-</button>
                    
                    <span style="min-width: 40px; text-align: center; font-weight: bold;">
                        ${item.cantidad}
                    </span>
                    
                    <button class="btn-cantidad" data-index="${index}" data-accion="aumentar" style="
                        width: 30px;
                        height: 30px;
                        border: 2px solid var(--verde-primario);
                        background-color: white;
                        color: var(--verde-primario);
                        border-radius: 50%;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 18px;
                    ">+</button>
                </div>
                
                <div style="text-align: right; min-width: 100px;">
                    <p style="margin: 0; font-weight: bold; color: var(--verde-primario); font-size: 18px;">
                        S/ ${totalItem.toFixed(2)}
                    </p>
                </div>
                
                <button class="btn-eliminar" data-index="${index}" style="
                    background-color: transparent;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #e74c3c;
                    padding: 5px 10px;
                ">🗑️</button>
            </div>
        `;
    });
    
    html += '</div>';
    contenedorItems.innerHTML = html;
    actualizarTotales(subtotal);
    
    // Agregar eventos a los botones del carrito
    document.querySelectorAll('.btn-cantidad').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            const accion = btn.getAttribute('data-accion');
            modificarCantidadItem(index, accion);
        });
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            eliminarItemCarrito(index);
        });
    });
}

function modificarCantidadItem(index, accion) {
    if (carrito[index]) {
        if (accion === 'aumentar') {
            carrito[index].cantidad++;
        } else if (accion === 'disminuir') {
            carrito[index].cantidad--;
            if (carrito[index].cantidad <= 0) {
                eliminarItemCarrito(index);
                return;
            }
        }
        guardarCarrito();
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion('Carrito actualizado', 'success');
    }
}

function eliminarItemCarrito(index) {
    if (carrito[index]) {
        const nombreProducto = carrito[index].nombre;
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion(`${nombreProducto} eliminado del carrito`, 'warning');
    }
}

function actualizarTotales(subtotal) {
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');
    
    if (subtotalSpan) {
        subtotalSpan.textContent = `S/ ${subtotal.toFixed(2)}`;
    }
    if (totalSpan) {
        totalSpan.textContent = `S/ ${subtotal.toFixed(2)}`;
    }
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    
    let colorFondo = '#2D6A4F';
    let icono = '✅';
    
    if (tipo === 'warning') {
        colorFondo = '#e67e22';
        icono = '⚠️';
    } else if (tipo === 'error') {
        colorFondo = '#e74c3c';
        icono = '❌';
    } else if (tipo === 'success') {
        icono = '✓';
    }
    
    notificacion.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${colorFondo};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notificacion.innerHTML = `${icono} ${mensaje}`;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion) {
            notificacion.style.opacity = '0';
            setTimeout(() => {
                if (notificacion) notificacion.remove();
            }, 300);
        }
    }, 3000);
}

function configurarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}