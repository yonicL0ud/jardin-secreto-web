document.addEventListener('DOMContentLoaded', () => {
    if (typeof cargarCarritoStorage === 'function') {
        cargarCarritoStorage();
    }
    
    if (document.getElementById('catalogo-container')) {
        if (typeof renderizarCatalogo === 'function' && typeof productos !== 'undefined') {
            renderizarCatalogo(productos);
            
            const botonesFiltro = document.querySelectorAll('.filtro-btn');
            botonesFiltro.forEach(btn => {
                btn.addEventListener('click', () => {
                    botonesFiltro.forEach(b => b.classList.remove('activo'));
                    btn.classList.add('activo');
                    const filtro = btn.dataset.filtro;
                    if (typeof filtrarPorDificultad === 'function') {
                        filtrarPorDificultad(filtro);
                    }
                });
            });
            
            const buscador = document.getElementById('buscador');
            if (buscador && typeof buscarProductos === 'function') {
                buscador.addEventListener('input', (e) => {
                    buscarProductos(e.target.value);
                });
            }
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
    
    if (document.getElementById('contactoForm')) {
        if (typeof inicializarValidaciones === 'function') {
            inicializarValidaciones();
        }
    }
    
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }
    
    console.log('🌸 Jardín Secreto - Tienda lista para florecer 🌸');
});