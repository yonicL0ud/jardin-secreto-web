document.addEventListener('DOMContentLoaded', function() {
    if (typeof cargarCarritoStorage === 'function') {
        cargarCarritoStorage();
    }

    if (document.getElementById('catalogo-container')) {
        if (typeof renderizarCatalogo === 'function' && typeof productos !== 'undefined') {
            renderizarCatalogo(productos);
        }

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

        const buscador = document.getElementById('buscador');
        if (buscador && typeof buscarProductos === 'function') {
            buscador.addEventListener('input', function(e) {
                buscarProductos(e.target.value);
            });
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
        
        const btnVaciar = document.getElementById('vaciar-carrito');
        if (btnVaciar && typeof vaciarCarrito === 'function') {
            btnVaciar.addEventListener('click', function() {
                if (confirm('¿Seguro que quieres vaciar el carrito?')) {
                    vaciarCarrito();
                    if (typeof mostrarNotificacion === 'function') {
                        mostrarNotificacion('Carrito vaciado');
                    }
                }
            });
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

    if (document.querySelector('.banner-principal')) {
        if (typeof mostrarBienvenida === 'function') {
            mostrarBienvenida();
        }
    }

    console.log('🌸 Jardín Secreto - Tienda lista para florecer 🌸');
});