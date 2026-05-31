let carrito = [];

function agregarAlCarrito(id) {

    const producto = productos.find(producto => producto.id === id);

    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {

        itemExistente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
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

    return carrito.reduce((total, item) => {
        return total + (item.precio * item.cantidad);
    }, 0);
}

function calcularTotalItems() {

    return carrito.reduce((total, item) => {
        return total + item.cantidad;
    }, 0);
}

function actualizarContadorCarrito() {

    const contadores = document.querySelectorAll(".contador-carrito");

    contadores.forEach(contador => {
        contador.textContent = calcularTotalItems();
    });
}

function actualizarVistaCarrito() {

    const contenedor = document.getElementById("items-carrito");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    carrito.forEach(item => {

        contenedor.innerHTML += `
            <div class="item-carrito">
                <h3>${item.nombre}</h3>
                <p>Precio: S/ ${item.precio}</p>
                <p>Cantidad: ${item.cantidad}</p>

                <button onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>

                <button onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>

                <button onclick="eliminarDelCarrito(${item.id})">
                    Eliminar
                </button>
            </div>
        `;
    });

    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");

    if (subtotal) {
        subtotal.textContent = `S/ ${calcularTotal()}`;
    }

    if (total) {
        total.textContent = `S/ ${calcularTotal()}`;
    }
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