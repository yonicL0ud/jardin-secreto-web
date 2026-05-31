// Entrada 
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌿 Jardín Secreto - Inicializando aplicación...');
    
    cargarCarritoStorage();
    inicializarPagina();
    inicializarEventos();
    inicializarEfectosCreativos();
    actualizarContadorCarrito();
    manejarParametrosURL();
    
    console.log('✅ Jardín Secreto - Aplicación inicializada correctamente');
});

function manejarParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const accion = urlParams.get('accion');
    
    if (accion === 'verCarrito') {
        if (!window.location.pathname.includes('carrito.html')) {
            mostrarNotificacion('Redirigiendo al carrito...', 'info');
            setTimeout(() => {
                window.location.href = 'paginas/carrito.html';
            }, 1000);
        }
    }
}

function formatearPrecio(precio) {
    return `S/ ${precio.toFixed(2)}`;
}

function obtenerTotalProductos() {
    return productos.length;
}

function obtenerPrecioPromedio() {
    if (productos.length === 0) return 0;
    const suma = productos.reduce((total, producto) => total + producto.precio, 0);
    return suma / productos.length;
}

window.jardinSecreto = {
    productos: productos,
    carrito: carrito,
    formatearPrecio: formatearPrecio,
    obtenerTotalProductos: obtenerTotalProductos,
    obtenerPrecioPromedio: obtenerPrecioPromedio,
    version: '1.0.0'
};

console.log('🌱 Jardín Secreto v1.0.0');
console.log(`📦 Total de productos disponibles: ${obtenerTotalProductos()}`);
console.log(`💰 Precio promedio: ${formatearPrecio(obtenerPrecioPromedio())}`);
console.log('💡 Para ver más opciones, escribe: window.jardinSecreto');