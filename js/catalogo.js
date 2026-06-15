let catalogoActual = [...productos];

function renderizarCatalogo(productosArray) {
    const contenedor = document.getElementById('catalogo-container');
    if (!contenedor) return;
    
    if (productosArray.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados text-center p-4">🌿 No encontramos plantas con ese filtro</p>';
        return;
    }
    
    contenedor.innerHTML = productosArray.map(producto => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="tarjeta-producto h-100">
                <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}" style="height: 200px; object-fit: cover; width: 100%;">
                <div class="p-3">
                    <h3>${producto.nombre}</h3>
                    <p class="descripcion text-muted small">${producto.descripcion}</p>
                    <p class="dificultad">🏷️ Cuidado: ${producto.dificultad}</p>
                    <p class="precio text-success fw-bold fs-4">S/ ${producto.precio}</p>
                    <button class="btn btn-success w-100 btn-agregar" data-id="${producto.id}">Agregar al carrito 🛒</button>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', () => {
            agregarAlCarrito(parseInt(btn.dataset.id));
        });
    });
}

function renderizarDestacados() {
    const contenedor = document.getElementById('destacados-container');
    if (!contenedor) return;
    
    const destacados = productos.slice(0, 4);
    
    contenedor.innerHTML = destacados.map(producto => `
        <article class="tarjeta-producto">
            <img src="${producto.imagenHome}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">S/ ${producto.precio}</p>
            <button class="btn-agregar" data-id="${producto.id}">Agregar 🛒</button>
        </article>
    `).join('');
    
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', () => {
            agregarAlCarrito(parseInt(btn.dataset.id));
        });
    });
}

function filtrarPorDificultad(dificultad) {
    if (dificultad === 'todos') {
        catalogoActual = [...productos];
    } else {
        catalogoActual = productos.filter(p => p.dificultad === dificultad);
    }
    renderizarCatalogo(catalogoActual);
}

function buscarProductos(termino) {
    const textoBusqueda = termino.toLowerCase();
    catalogoActual = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBusqueda) ||
        producto.descripcion.toLowerCase().includes(textoBusqueda) ||
        producto.categoria.toLowerCase().includes(textoBusqueda)
    );
    renderizarCatalogo(catalogoActual);
}