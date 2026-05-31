function inicializarEfectosCreativos() {
    agregarEfectoTarjetas();
    agregarAnimacionCarga();
    agregarEfectoParallax();
    inicializarContadorVisitas();
    efectoEscrituraBanner();
    inicializarModoOscuro();
    configurarDelegacionEventosDetalle();
}

function agregarEfectoTarjetas() {
    const estilo = document.createElement('style');
    estilo.textContent = `
        .producto-tarjeta {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .producto-tarjeta::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 30%,
                rgba(255, 255, 255, 0.1) 50%,
                transparent 70%
            );
            transform: rotate(45deg);
            transition: all 0.5s ease;
            opacity: 0;
        }
        
        .producto-tarjeta:hover::before {
            opacity: 1;
            transform: rotate(45deg) translate(50%, 50%);
        }
        
        .btn-agregar {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .btn-agregar:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(estilo);
}

function agregarAnimacionCarga() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--crema);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s ease;
        pointer-events: none;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid var(--verde-claro);
                border-top-color: var(--verde-primario);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <p style="color: var(--verde-primario); font-weight: bold;">Cargando Jardín Secreto...</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    const estiloSpin = document.createElement('style');
    estiloSpin.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(estiloSpin);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay) overlay.remove();
            }, 500);
        }, 500);
    });
}

function agregarEfectoParallax() {
    const banner = document.querySelector('.banner-principal');
    if (banner) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            banner.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
}

function inicializarContadorVisitas() {
    let visitas = localStorage.getItem('jardinSecretoVisitas');
    if (visitas) {
        visitas = parseInt(visitas) + 1;
    } else {
        visitas = 1;
    }
    localStorage.setItem('jardinSecretoVisitas', visitas);
    console.log(`🌱 Visitas totales: ${visitas}`);
}

function efectoEscrituraBanner() {
    const tituloBanner = document.querySelector('.banner-principal h2');
    if (tituloBanner && !window.efectoEscrituraAplicado) {
        const textoOriginal = tituloBanner.textContent;
        tituloBanner.textContent = '';
        
        let i = 0;
        const escribir = () => {
            if (i < textoOriginal.length) {
                tituloBanner.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(escribir, 50);
            }
        };
        
        escribir();
        window.efectoEscrituraAplicado = true;
    }
}

function inicializarModoOscuro() {
    const modoOscuroBtn = document.createElement('button');
    modoOscuroBtn.innerHTML = '🌙';
    modoOscuroBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: var(--verde-primario);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    modoOscuroBtn.addEventListener('mouseenter', () => {
        modoOscuroBtn.style.transform = 'scale(1.1)';
    });
    
    modoOscuroBtn.addEventListener('mouseleave', () => {
        modoOscuroBtn.style.transform = 'scale(1)';
    });
    
    modoOscuroBtn.addEventListener('click', () => {
        document.body.classList.toggle('modo-oscuro');
        const esModoOscuro = document.body.classList.contains('modo-oscuro');
        modoOscuroBtn.innerHTML = esModoOscuro ? '☀️' : '🌙';
        localStorage.setItem('jardinSecretoModoOscuro', esModoOscuro);
    });
    
    const modoOscuroGuardado = localStorage.getItem('jardinSecretoModoOscuro');
    if (modoOscuroGuardado === 'true') {
        document.body.classList.add('modo-oscuro');
        modoOscuroBtn.innerHTML = '☀️';
    }
    
    document.body.appendChild(modoOscuroBtn);
    
    const estilosModoOscuro = document.createElement('style');
    estilosModoOscuro.textContent = `
        body.modo-oscuro {
            background-color: #1a1a2e;
            color: #eee;
        }
        
        body.modo-oscuro .producto-tarjeta,
        body.modo-oscuro .resumen-carrito,
        body.modo-oscuro .carrito-item,
        body.modo-oscuro #contactoForm {
            background-color: #16213e;
            color: #eee;
        }
        
        body.modo-oscuro .btn-secundario,
        body.modo-oscuro .btn-primario {
            background-color: #0f3460;
            color: #eee;
            border-color: #0f3460;
        }
        
        body.modo-oscuro .btn-secundario:hover,
        body.modo-oscuro .btn-primario:hover {
            background-color: #1a1a2e;
        }
        
        body.modo-oscuro input,
        body.modo-oscuro textarea {
            background-color: #0f3460;
            color: #eee;
            border-color: #16213e;
        }
        
        body.modo-oscuro .filtro-btn {
            border-color: #0f3460;
            color: #eee;
        }
        
        body.modo-oscuro .filtro-btn.activo,
        body.modo-oscuro .filtro-btn:hover {
            background-color: #0f3460;
            color: #eee;
        }
    `;
    document.head.appendChild(estilosModoOscuro);
}

function configurarDelegacionEventosDetalle() {
    document.body.addEventListener('click', (e) => {
        const btnDetalle = e.target.closest('.btn-detalle');
        const imagenProducto = e.target.closest('.producto-tarjeta img');
        
        if (btnDetalle) {
            const id = parseInt(btnDetalle.getAttribute('data-id'));
            const producto = productos.find(p => p.id === id);
            if (producto) {
                abrirModalDetalle(producto);
            }
        } else if (imagenProducto) {
            const tarjeta = imagenProducto.closest('.producto-tarjeta');
            const btn = tarjeta?.querySelector('.btn-detalle');
            if (btn) {
                const id = parseInt(btn.getAttribute('data-id'));
                const producto = productos.find(p => p.id === id);
                if (producto) {
                    abrirModalDetalle(producto);
                }
            }
        }
    });
}

function abrirModalDetalle(producto) {
    const modalExistente = document.querySelector('.modal-detalle');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-detalle';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.85);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeInUp 0.3s ease;
        cursor: pointer;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: var(--crema);
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        position: relative;
        animation: fadeInUp 0.3s ease;
        cursor: default;
    `;
    
    const dificultadIcono = producto.dificultad === 'facil' ? '🌱' : '🪴';
    const dificultadTexto = producto.dificultad === 'facil' ? 'Cuidado fácil' : 'Cuidado moderado';
    const dificultadColor = producto.dificultad === 'facil' ? '#40916C' : '#D4A373';
    
    modalContent.innerHTML = `
        <button class="modal-cerrar" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--verde-primario);
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.2s ease;
            z-index: 10;
        ">✕</button>
        
        <div style="padding: 25px;">
            <img src="${producto.imagen || producto.imagenHome}" 
                 alt="${producto.nombre}"
                 style="width: 100%; height: 250px; object-fit: cover; border-radius: 16px; margin-bottom: 20px;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h2 style="color: var(--verde-primario); margin: 0; font-size: 24px;">${producto.nombre}</h2>
                <span style="background-color: ${dificultadColor}; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                    ${dificultadIcono} ${dificultadTexto}
                </span>
            </div>
            
            <p style="color: var(--texto-oscuro); line-height: 1.6; margin-bottom: 20px;">
                ${producto.descripcion}
            </p>
            
            <div style="background-color: white; border-radius: 12px; padding: 15px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <p style="margin: 0; color: #666; font-size: 14px;">Precio</p>
                        <p style="margin: 5px 0 0 0; font-size: 28px; font-weight: bold; color: var(--verde-primario);">
                            S/ ${producto.precio.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p style="margin: 0; color: #666; font-size: 14px;">Stock</p>
                        <p style="margin: 5px 0 0 0; font-size: 16px; color: var(--verde-primario);">
                            ✅ Disponible
                        </p>
                    </div>
                    <div>
                        <p style="margin: 0; color: #666; font-size: 14px;">Envío</p>
                        <p style="margin: 5px 0 0 0; font-size: 16px; color: var(--verde-primario);">
                            🚚 A domicilio
                        </p>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button class="btn-agregar-modal" data-id="${producto.id}" style="
                    flex: 2;
                    background-color: var(--verde-primario);
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 12px;
                    font-weight: bold;
                    font-size: 16px;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                ">🛒 Agregar al carrito</button>
                
                <button class="btn-cerrar-modal" style="
                    flex: 1;
                    background-color: transparent;
                    color: var(--verde-primario);
                    border: 2px solid var(--verde-primario);
                    padding: 14px;
                    border-radius: 12px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Seguir comprando</button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    const cerrarBtn = modalContent.querySelector('.modal-cerrar');
    const cerrarModalBtn = modalContent.querySelector('.btn-cerrar-modal');
    const agregarBtn = modalContent.querySelector('.btn-agregar-modal');
    
    const cerrarModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    cerrarBtn.addEventListener('click', cerrarModal);
    cerrarModalBtn.addEventListener('click', cerrarModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });
    
    if (agregarBtn) {
        agregarBtn.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
            cerrarModal();
        });
    }
    
    const botones = modalContent.querySelectorAll('button');
    botones.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.02)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
}

function abrirModalImagen(src, alt) {
    const producto = productos.find(p => p.imagen === src || p.imagenHome === src);
    if (producto) {
        abrirModalDetalle(producto);
    } else {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            animation: fadeInUp 0.3s ease;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        modal.appendChild(img);
        modal.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });
        
        document.body.appendChild(modal);
    }
}

function mostrarConfeti() {
    const colores = ['#2D6A4F', '#40916C', '#F9A8D4', '#D4A373', '#F4E4CD'];
    
    for (let i = 0; i < 50; i++) {
        const confeti = document.createElement('div');
        confeti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${colores[Math.floor(Math.random() * colores.length)]};
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 9999;
            animation: caerConfeti ${2 + Math.random() * 2}s linear forwards;
        `;
        
        document.body.appendChild(confeti);
        
        setTimeout(() => {
            if (confeti) confeti.remove();
        }, 4000);
    }
    
    if (!document.querySelector('#estilos-confeti')) {
        const estilosConfeti = document.createElement('style');
        estilosConfeti.id = 'estilos-confeti';
        estilosConfeti.textContent = `
            @keyframes caerConfeti {
                to {
                    transform: translateY(${window.innerHeight + 10}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(estilosConfeti);
    }
}

const agregarAlCarritoOriginal = window.agregarAlCarrito;
window.agregarAlCarrito = function(id) {
    if (agregarAlCarritoOriginal) {
        agregarAlCarritoOriginal(id);
        mostrarConfeti();
        mostrarNotificacion('✨ ¡Producto agregado al carrito! ✨', 'success');
    }
};