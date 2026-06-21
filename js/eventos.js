function inicializarEventosGlobales() {
    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres vaciar todo el carrito? 🌸')) {
                vaciarCarrito();
                mostrarNotificacion('Carrito vaciado');
            }
        });
    }
    
    const carritoIcono = document.querySelector('.carrito-icono');
    if (carritoIcono) {
        carritoIcono.addEventListener('click', () => {
            window.location.href = 'paginas/carrito.html';
        });
    }
    
    inicializarFiltros();
    
    inicializarBuscador();
}

function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('[data-filtro]');
    if (botonesFiltro.length === 0) return;
    
    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
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

document.addEventListener('DOMContentLoaded', () => {
    inicializarValidaciones();
    inicializarEventosGlobales();
    
    if (typeof cargarCarritoStorage === 'function') {
        cargarCarritoStorage();
    }
    
    if (document.getElementById('catalogo-container')) {
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo(productos);
        }
    }
    
    if (document.getElementById('destacados-container')) {
        if (typeof renderizarDestacados === 'function') {
            renderizarDestacados();
        }
    }
    
    if (document.getElementById('items-carrito')) {
        if (typeof actualizarVistaCarrito === 'function') {
            actualizarVistaCarrito();
        }
    }
});