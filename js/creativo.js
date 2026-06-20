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

    const ultimaVisita = localStorage.getItem('ultimaBienvenida');
    const hoy = new Date().toDateString();

    if (ultimaVisita !== hoy) {
        const bienvenida = document.createElement('div');
        bienvenida.className = 'bienvenida-flotante';
        bienvenida.innerHTML = `
            <div class="bienvenida-contenido">
                <span class="bienvenida-emoji">${emoji}</span>
                <div class="bienvenida-texto">
                    <strong>${saludo}, amante de las plantas! 🌸</strong>
                    <p>${mensaje}</p>
                </div>
                <button class="bienvenida-cerrar">✖</button>
            </div>
        `;

        const cerrarBtn = bienvenida.querySelector('.bienvenida-cerrar');
        cerrarBtn.addEventListener('click', () => {
            bienvenida.style.opacity = '0';
            bienvenida.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (bienvenida.remove) bienvenida.remove();
            }, 300);
        });

        setTimeout(() => {
            if (bienvenida && bienvenida.remove) {
                bienvenida.style.opacity = '0';
                bienvenida.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (bienvenida.remove) bienvenida.remove();
                }, 300);
            }
        }, 5000);

        document.body.appendChild(bienvenida);
        localStorage.setItem('ultimaBienvenida', hoy);
    }
}