document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoStorage();
    renderizarDestacados();
    
    if (document.getElementById('catalogo-container')) {
        renderizarCatalogo(productos);
    }
    
    // Eventos del buscador y filtros
    const buscador = document.getElementById('buscador');
    if (buscador) {
        buscador.addEventListener('input', function(e) {
            buscarProductos(e.target.value);
        });
    }
    
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    for (let i = 0; i < botonesFiltro.length; i++) {
        botonesFiltro[i].addEventListener('click', function() {
            for (let j = 0; j < botonesFiltro.length; j++) {
                botonesFiltro[j].classList.remove('activo');
            }
            this.classList.add('activo');
            filtrarPorDificultad(this.getAttribute('data-filtro'));
        });
    }
    
    // Vaciar carrito
    const vaciarBtn = document.getElementById('vaciar-carrito');
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', function() {
            vaciarCarrito();
        });
    }
    
    // Formulario de contacto
    const formulario = document.getElementById('contactoForm');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            // validaciones aquí
        });
    }
});