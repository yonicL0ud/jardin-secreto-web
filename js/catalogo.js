let catalogoActual = [...productos];

function renderizarCatalogo(productosArray) {
    const contenedor = document.getElementById('catalogo-container');
    if (!contenedor) return;

    if (productosArray.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="fs-4">🌿 No encontramos plantas con ese filtro</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = productosArray.map(producto => `
        <div class="col">
            <div class="card h-100 shadow-sm card-producto">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-success">${producto.nombre}</h5>
                    <p class="card-text text-muted small">${producto.descripcion}</p>
                    <p class="card-text"><small>🏷️ Cuidado: ${producto.dificultad}</small></p>
                    <p class="card-text fw-bold fs-4 text-success">S/ ${producto.precio}</p>
                    <div class="mt-auto d-flex gap-2">
                        <button class="btn btn-success flex-grow-1 btn-agregar" data-id="${producto.id}">Agregar 🛒</button>
                        <button class="btn btn-outline-success btn-detalle" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver más</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', function() {
            agregarAlCarrito(parseInt(this.dataset.id));
        });
    });

    document.querySelectorAll('.btn-detalle').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) {
                mostrarDetalleModal(producto);
            }
        });
    });
}

function renderizarDestacados() {
    const contenedor = document.getElementById('destacados-container');
    if (!contenedor) return;

    const destacados = productos.slice(0, 4);

    contenedor.innerHTML = destacados.map(producto => `
        <div class="col">
            <div class="card h-100 shadow-sm card-producto">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-success">${producto.nombre}</h5>
                    <p class="card-text text-muted small">${producto.descripcion.substring(0, 40)}...</p>
                    <p class="card-text fw-bold fs-4 text-success">S/ ${producto.precio}</p>
                    <button class="btn btn-success w-100 btn-agregar" data-id="${producto.id}">Agregar 🛒</button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', function() {
            agregarAlCarrito(parseInt(this.dataset.id));
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

    const nuevoBtn = btnAgregar.cloneNode(true);
    btnAgregar.parentNode.replaceChild(nuevoBtn, btnAgregar);

    nuevoBtn.addEventListener('click', function() {
        agregarAlCarrito(parseInt(this.dataset.id));
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalDetalle'));
        if (modal) modal.hide();
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
    const textoBusqueda = termino.toLowerCase().trim();
    if (textoBusqueda === '') {
        catalogoActual = [...productos];
    } else {
        catalogoActual = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            producto.descripcion.toLowerCase().includes(textoBusqueda) ||
            producto.categoria.toLowerCase().includes(textoBusqueda)
        );
    }
    renderizarCatalogo(catalogoActual);
}