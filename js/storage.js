function guardarCarrito() {

    localStorage.setItem(
        "jardinSecretoCarrito",
        JSON.stringify(carrito)
    );
}

function cargarCarritoStorage() {

    const datos = localStorage.getItem("jardinSecretoCarrito");

    if (datos) {

        carrito = JSON.parse(datos);

    } else {

        carrito = [];
    }

    actualizarContadorCarrito();

    if (document.getElementById("items-carrito")) {
        actualizarVistaCarrito();
    }
}
