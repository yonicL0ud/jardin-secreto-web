// Eventos globales de la página
function inicializarEventosGlobales() {
    // Evento para el botón de vaciar carrito
    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres vaciar todo el carrito? 🌸')) {
                vaciarCarrito();
                mostrarNotificacion('Carrito vaciado');
            }
        });
    }
    
    // Evento para el icono del carrito en header (redirigir a carrito.html)
    const carritoIcono = document.querySelector('.carrito-icono');
    if (carritoIcono) {
        carritoIcono.addEventListener('click', () => {
            window.location.href = 'pages/carrito.html';
        });
    }
    
    // Eventos para filtros en catálogo
    inicializarFiltros();
    
    // Evento para buscador en tiempo real
    inicializarBuscador();
}

function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('[data-filtro]');
    if (botonesFiltro.length === 0) return;
    
    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Quitar clase activa de todos
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            // Agregar clase activa al clickeado
            btn.classList.add('activo');
            
            const filtro = btn.dataset.filtro;
            if (typeof filtrarPorDificultad === 'function') {
                filtrarPorDificultad(filtro);
            }
        });
    });
}

function inicializarBuscador() {
    const buscador = document.getElementById('buscador');
    if (!buscador) return;
    
    buscador.addEventListener('input', (e) => {
        const termino = e.target.value;
        if (typeof buscarProductos === 'function') {
            buscarProductos(termino);
        }
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarValidaciones();
    inicializarEventosGlobales();
    
    // Cargar carrito desde storage
    if (typeof cargarCarritoStorage === 'function') {
        cargarCarritoStorage();
    }
    
    // Renderizar catálogo si estamos en esa página
    if (document.getElementById('catalogo-container')) {
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo(productos);
        }
    }
    
    // Renderizar destacados si estamos en index
    if (document.getElementById('destacados-container')) {
        if (typeof renderizarDestacados === 'function') {
            renderizarDestacados();
        }
    }
    
    // Actualizar vista del carrito si estamos en esa página
    if (document.getElementById('items-carrito')) {
        if (typeof actualizarVistaCarrito === 'function') {
            actualizarVistaCarrito();
        }
    }
});