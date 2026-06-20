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
                    <div class="d-flex gap-2">
                        <button class="btn btn-success w-50 btn-agregar" data-id="${producto.id}">Agregar 🛒</button>
                        <button class="btn btn-outline-success w-50 btn-detalle" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver más</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Evento agregar al carrito
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', () => {
            agregarAlCarrito(parseInt(btn.dataset.id));
        });
    });
    
    // Evento ver detalle (abre modal)
    document.querySelectorAll('.btn-detalle').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) {
                mostrarDetalleModal(producto);
            }
        });
    });
}

function mostrarDetalleModal(producto) {
    document.getElementById('modalImagen').src = producto.imagen;
    document.getElementById('modalImagen').alt = producto.nombre;
    document.getElementById('modalNombre').textContent = producto.nombre;
    document.getElementById('modalDescripcion').textContent = producto.descripcion;
    document.getElementById('modalCategoria').textContent = `Categoría: ${producto.categoria}`;
    document.getElementById('modalDificultad').textContent = `Cuidado: ${producto.dificultad}`;
    document.getElementById('modalPrecio').textContent = `S/ ${producto.precio}`;
    
    const btnAgregar = document.getElementById('modalAgregar');
    btnAgregar.dataset.id = producto.id;
    
    // Remover eventos anteriores para evitar duplicados
    const nuevoBtn = btnAgregar.cloneNode(true);
    btnAgregar.parentNode.replaceChild(nuevoBtn, btnAgregar);
    
    nuevoBtn.addEventListener('click', () => {
        agregarAlCarrito(parseInt(nuevoBtn.dataset.id));
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalDetalle'));
        if (modal) modal.hide();
    });
}

function renderizarDestacados() {
    const contenedor = document.getElementById('destacados-container');
    if (!contenedor) return;
    
    const destacados = productos.slice(0, 4);
    
    contenedor.innerHTML = destacados.map(producto => `
        <article class="tarjeta-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion.substring(0, 40)}...</p>
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