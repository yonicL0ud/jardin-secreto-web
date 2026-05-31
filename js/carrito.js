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
    actualizarVistaCarrito();
    alert(producto.nombre + " agregado al carrito");
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

function actualizarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad = nuevaCantidad;
    }
    guardarCarrito();
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + (carrito[i].precio * carrito[i].cantidad);
    }
    return total;
}

function calcularTotalItems() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].cantidad;
    }
    return total;
}

function actualizarContadorCarrito() {
    const contadores = document.querySelectorAll(".contador-carrito");
    for (let i = 0; i < contadores.length; i++) {
        contadores[i].textContent = calcularTotalItems();
    }
}

function actualizarVistaCarrito() {
    const contenedor = document.getElementById("items-carrito");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>🌸 Tu carrito está vacío</p>';
        const subtotal = document.getElementById("subtotal");
        const total = document.getElementById("total");
        if (subtotal) subtotal.textContent = "S/ 0.00";
        if (total) total.textContent = "S/ 0.00";
        return;
    }

    contenedor.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        contenedor.innerHTML += `
            <div class="item-carrito">
                <h3>${item.nombre}</h3>
                <p>Precio: S/ ${item.precio.toFixed(2)}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <button onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                <button onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
    }

    const totalCalculado = calcularTotal();
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");
    if (subtotal) subtotal.textContent = "S/ " + totalCalculado.toFixed(2);
    if (total) total.textContent = "S/ " + totalCalculado.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

function guardarCarrito() {
    localStorage.setItem('jardinSecretoCarrito', JSON.stringify(carrito));
}

function cargarCarritoStorage() {
    const guardado = localStorage.getItem('jardinSecretoCarrito');
    if (guardado) {
        carrito = JSON.parse(guardado);
        actualizarContadorCarrito();
        actualizarVistaCarrito();
    }
}