// FLOR DEL DÍA, según fecha
function obtenerFlorDelDia() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const flores = [
        { nombre: "Rosa", emoji: "🌹", mensaje: "El amor florece donde pones atención" },
        { nombre: "Girasol", emoji: "🌻", mensaje: "Siempre busca la luz" },
        { nombre: "Loto", emoji: "🪷", mensaje: "La pureza crece desde el barro" },
        { nombre: "Orquídea", emoji: "🌺", mensaje: "Elegante y resistente" },
        { nombre: "Margarita", emoji: "🌼", mensaje: "La sencillez es hermosa" },
        { nombre: "Lavanda", emoji: "💜", mensaje: "Calma y serenidad" },
        { nombre: "Jazmín", emoji: "🤍", mensaje: "Fragancia que enamora" }
    ];
    
    const indice = dia % flores.length;
    return flores[indice];
}

function crearWidgetFlor() {
    // Solo crear si no existe en la página
    if (document.querySelector('.widget-flor')) return;
    
    const flor = obtenerFlorDelDia();
    
    const widget = document.createElement('aside');
    widget.className = 'widget-flor';
    widget.innerHTML = `
        <div class="flor-contenido">
            <span class="flor-emoji">${flor.emoji}</span>
            <div class="flor-info">
                <strong>🌸 Flor del día: ${flor.nombre}</strong>
                <p>${flor.mensaje}</p>
            </div>
            <button class="flor-cerrar">✖</button>
        </div>
    `;
    
    widget.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        padding: 12px 16px;
        z-index: 999;
        max-width: 260px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-left: 5px solid var(--rosa-flor, #F9A8D4);
        animation: slideInRight 0.5s ease;
    `;
    
    widget.querySelector('.flor-cerrar').addEventListener('click', (e) => {
        e.stopPropagation();
        widget.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => widget.remove(), 300);
    });
    
    widget.addEventListener('click', (e) => {
        if (!e.target.classList.contains('flor-cerrar')) {
            mostrarNotificacion(`🌼 ${flor.nombre}: ${flor.mensaje}`);
        }
    });
    
    document.body.appendChild(widget);
}

// ANIMACIÓN DE "REGAU, efecto creativo
function crearEfectoRiego(event) {
    // Crear elemento de gota
    const gota = document.createElement('div');
    gota.className = 'gota-agua';
    gota.innerHTML = '💧';
    gota.style.cssText = `
        position: absolute;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 24px;
        pointer-events: none;
        z-index: 9999;
        animation: gotaCaer 0.8s ease forwards;
    `;
    document.body.appendChild(gota);
    
    setTimeout(() => gota.remove(), 800);
}

function inicializarEfectoRiego() {
    // Al hacer clic sostenido en cualquier tarjeta de producto
    document.body.addEventListener('contextmenu', (e) => {
        const tarjeta = e.target.closest('.tarjeta-producto');
        if (tarjeta) {
            e.preventDefault();
            crearEfectoRiego(e);
            mostrarNotificacion('💧 ¡Has regado tu planta! Sigue cuidándola 🌱');
        }
    });
}

// MENSAJE SORPRESA, cada 5 visitas al carrito
let contadorVisitasCarrito = parseInt(localStorage.getItem('visitasCarrito') || '0');

function contarVisitaCarrito() {
    if (window.location.pathname.includes('carrito.html')) {
        contadorVisitasCarrito++;
        localStorage.setItem('visitasCarrito', contadorVisitasCarrito);
        
        if (contadorVisitasCarrito % 5 === 0) {
            setTimeout(() => {
                mostrarMensajeSorprendente();
            }, 500);
        }
    }
}

function mostrarMensajeSorprendente() {
    const mensajes = [
        { texto: "🌿 ¡Eres un cliente frecuente! Toma 10% de descuento en tu próxima compra", emoji: "🎁" },
        { texto: "🌸 ¡Gracias por visitarnos! Las plantas te aman", emoji: "💚" },
        { texto: "🪴 ¿Sabías que las plantas purifican el aire? ¡Llévate una hoy!", emoji: "✨" }
    ];
    const aleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
    
    const modal = document.createElement('div');
    modal.className = 'modal-sorpresa';
    modal.innerHTML = `
        <div class="modal-contenido">
            <span class="modal-emoji">${aleatorio.emoji}</span>
            <p>${aleatorio.texto}</p>
            <button class="modal-cerrar">¡Qué lindo! 🌸</button>
        </div>
    `;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.querySelector('.modal-cerrar').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    document.body.appendChild(modal);
}

// PARA INICIALIZAR ELEMENTOS CREATIVOS
function inicializarCreativos() {
    crearWidgetFlor();
    inicializarEfectoRiego();
    contarVisitaCarrito();
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarCreativos();
});

// Agregar keyframes al documento si no existen
if (!document.querySelector('#animaciones-creativas')) {
    const style = document.createElement('style');
    style.id = 'animaciones-creativas';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
        @keyframes gotaCaer {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(80px) scale(0.5); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .widget-flor:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        }
        .mensaje-exito {
            background: linear-gradient(135deg, #2D6A4F, #40916C);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            animation: slideInRight 0.5s ease;
            text-align: center;
        }
        .exito-icono {
            font-size: 2rem;
            display: block;
        }
    `;
    document.head.appendChild(style);
}