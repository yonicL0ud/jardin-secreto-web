function renderizarCatalogo(productosArray) {
    const contenedor = document.getElementById('catalogo-container');
    if (!contenedor) return;
    
    if (productosArray.length === 0) {
        contenedor.innerHTML = '<p>No hay productos</p>';
        return;
    }
    
    contenedor.innerHTML = "";
    for (let i = 0; i < productosArray.length; i++) {
        const p = productosArray[i];
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto-tarjeta';
        tarjeta.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p class="precio">S/ ${p.precio}</p>
            <button class="btn-agregar" data-id="${p.id}">Agregar 🛒</button>
        `;
        contenedor.appendChild(tarjeta);
    }
    
    const botones = document.querySelectorAll('.btn-agregar');
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    }
}

function renderizarDestacados() {
    const contenedor = document.getElementById('destacados-container');
    if (!contenedor) return;
    
    const destacados = productos.slice(0, 4);
    contenedor.innerHTML = "";
    for (let i = 0; i < destacados.length; i++) {
        const p = destacados[i];
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto-tarjeta';
        tarjeta.innerHTML = `
            <img src="${p.imagenHome}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p class="precio">S/ ${p.precio}</p>
            <button class="btn-agregar" data-id="${p.id}">Agregar 🛒</button>
        `;
        contenedor.appendChild(tarjeta);
    }
    
    const botones = document.querySelectorAll('.btn-agregar');
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    }
}

function filtrarPorDificultad(dificultad) {
    if (dificultad === 'todos') {
        renderizarCatalogo(productos);
    } else {
        const filtrados = [];
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].dificultad === dificultad) {
                filtrados.push(productos[i]);
            }
        }
        renderizarCatalogo(filtrados);
    }
}

function buscarProductos(texto) {
    if (texto === "") {
        renderizarCatalogo(productos);
    } else {
        const filtrados = [];
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre.toLowerCase().includes(texto.toLowerCase())) {
                filtrados.push(productos[i]);
            }
        }
        renderizarCatalogo(filtrados);
    }
}