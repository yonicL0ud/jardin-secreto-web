document.addEventListener('DOMContentLoaded', function() {

    // Cargar carrito desde localStorage
    if (typeof cargarCarritoStorage === 'function') {
        cargarCarritoStorage();
    }

    // Página: Catálogo
    if (document.getElementById('catalogo-container')) {
        if (typeof renderizarCatalogo === 'function' && typeof productos !== 'undefined') {
            renderizarCatalogo(productos);
        }

        // Filtros
        const botonesFiltro = document.querySelectorAll('.filtro-btn');
        botonesFiltro.forEach(btn => {
            btn.addEventListener('click', function() {
                botonesFiltro.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filtro = this.dataset.filtro;
                if (typeof filtrarPorDificultad === 'function') {
                    filtrarPorDificultad(filtro);
                }
            });
        });

        // Buscador
        const buscador = document.getElementById('buscador');
        if (buscador && typeof buscarProductos === 'function') {
            buscador.addEventListener('input', function(e) {
                buscarProductos(e.target.value);
            });
        }
    }

    // Página: Index (destacados)
    if (document.getElementById('destacados-container')) {
        if (typeof renderizarDestacados === 'function') {
            renderizarDestacados();
        }
    }

    // Página: Carrito
    if (document.getElementById('items-carrito')) {
        if (typeof actualizarVistaCarrito === 'function') {
            actualizarVistaCarrito();
        }
    }

    // Página: Contacto (validaciones)
    if (document.getElementById('contactoForm')) {
        if (typeof inicializarValidaciones === 'function') {
            inicializarValidaciones();
        }
    }

    // Actualizar contador en todas las páginas
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }

    // Bienvenida creativa (solo en index)
    if (document.querySelector('.banner-principal')) {
        if (typeof mostrarBienvenida === 'function') {
            mostrarBienvenida();
        }
    }

    console.log('🌸 Jardín Secreto - Tienda lista para florecer 🌸');
});