let carrito = [];

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    alert(producto.nombre + " agregado al carrito");
}

function actualizarContadorCarrito() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].cantidad;
    }
    const contadores = document.querySelectorAll(".contador-carrito");
    for (let i = 0; i < contadores.length; i++) {
        contadores[i].textContent = total;
    }
}

function guardarCarrito() {
    localStorage.setItem('jardinSecretoCarrito', JSON.stringify(carrito));
}

function cargarCarritoStorage() {
    const guardado = localStorage.getItem('jardinSecretoCarrito');
    if (guardado) {
        carrito = JSON.parse(guardado);
        actualizarContadorCarrito();
    }
}