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
            imagen: producto.imagenHome || producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    actualizarVistaCarrito();
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
    const totalItems = calcularTotalItems();
    for (let i = 0; i < contadores.length; i++) {
        contadores[i].textContent = totalItems;
    }
}

function actualizarVistaCarrito() {
    const contenedor = document.getElementById("items-carrito");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; padding:40px;">🌸 Tu carrito está vacío</p>';
        const subtotal = document.getElementById("subtotal");
        const total = document.getElementById("total");
        if (subtotal) subtotal.textContent = "S/ 0.00";
        if (total) total.textContent = "S/ 0.00";
        return;
    }

    contenedor.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const precioTotal = item.precio * item.cantidad;
        contenedor.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 15px; margin-bottom: 10px; border-radius: 12px;">
                <div style="flex:2;">
                    <h3 style="margin:0;">${item.nombre}</h3>
                    <p style="margin:5px 0;">S/ ${item.precio.toFixed(2)} c/u</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})" style="background: #2D6A4F; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                    <span style="font-weight: bold; min-width: 30px; text-align: center;">${item.cantidad}</span>
                    <button onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})" style="background: #2D6A4F; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">+</button>
                </div>
                <div style="min-width: 100px; text-align: right;">
                    <p style="margin:0; font-weight: bold;">S/ ${precioTotal.toFixed(2)}</p>
                </div>
                <button onclick="eliminarDelCarrito(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer; margin-left: 10px;">Eliminar</button>
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
    } else {
        carrito = [];
    }
}