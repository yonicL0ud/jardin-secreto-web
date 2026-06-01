function mostrarBienvenida() {
    const hora = new Date().getHours();
    let saludo = '';
    let emoji = '';
    let mensaje = '';
    
    if (hora >= 6 && hora < 12) {
        saludo = 'Buenos días';
        emoji = '☀️';
        mensaje = 'Las plantas también se despiertan. ¡A cuidarlas! 🌱';
    } else if (hora >= 12 && hora < 18) {
        saludo = 'Buenas tardes';
        emoji = '🌤️';
        mensaje = '¿Ya regaste tus plantas hoy? 🪴';
    } else if (hora >= 18 && hora < 22) {
        saludo = 'Buenas noches';
        emoji = '🌙';
        mensaje = 'Un respiro verde antes de dormir 🌿';
    } else {
        saludo = '¡Es hora de dormir!';
        emoji = '💤';
        mensaje = 'Las plantas también descansan. ¡Hasta mañana! 🌸';
    }
    
    // Verificar si ya se mostró hoy
    const ultimaVisita = localStorage.getItem('ultimaBienvenida');
    const hoy = new Date().toDateString();
    
    if (ultimaVisita !== hoy) {
        const bienvenida = document.createElement('div');
        bienvenida.className = 'bienvenida-flotante';
        bienvenida.innerHTML = `
            <div class="bienvenida-contenido">
                <span class="bienvenida-emoji">${emoji}</span>
                <div class="bienvenida-texto">
                    <strong>${saludo}, plant lover! 🌸</strong>
                    <p>${mensaje}</p>
                </div>
                <button class="bienvenida-cerrar">✖</button>
            </div>
        `;
        
        bienvenida.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            padding: 16px 20px;
            z-index: 1000;
            max-width: 320px;
            animation: slideInRight 0.4s ease;
            border-left: 5px solid var(--rosa-flor, #F9A8D4);
        `;
        
        // Evento cerrar
        const cerrarBtn = bienvenida.querySelector('.bienvenida-cerrar');
        cerrarBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            color: #999;
            align-self: flex-start;
        `;
        
        cerrarBtn.addEventListener('click', () => {
            bienvenida.style.animation = 'fadeOutUp 0.3s ease';
            setTimeout(() => bienvenida.remove(), 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (bienvenida && bienvenida.remove) {
                bienvenida.style.animation = 'fadeOutUp 0.3s ease';
                setTimeout(() => bienvenida.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(bienvenida);
        localStorage.setItem('ultimaBienvenida', hoy);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    mostrarBienvenida();
});