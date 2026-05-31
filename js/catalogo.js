document.addEventListener("DOMContentLoaded", () => {
    inicializarPagina();
});

function inicializarPagina() {
    const contenedorDestacados = document.getElementById("destacados-container");
    if (contenedorDestacados) {
        renderizarDestacados(productos, contenedorDestacados);
    }

    const contenedorCatalogo = document.getElementById("catalogo-container");
    if (contenedorCatalogo) {
        renderizarCatalogo(productos, contenedorCatalogo);
        configurarFiltrosYBusqueda(contenedorCatalogo);
    }
}

function renderizarDestacados(listaProductos, contenedor) {
    contenedor.innerHTML = ""; 
    
    const destacados = listaProductos.slice(0, 4);

    destacados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-tarjeta"); 
        
        tarjeta.innerHTML = `
            <img src="${producto.imagenHome}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div style="margin-top: 15px; font-weight: bold; color: var(--verde-primario);">
                S/ ${producto.precio.toFixed(2)}
            </div>
            <button class="btn-agregar" data-id="${producto.id}" style="margin-top: 10px; width: 100%;">
                Agregar al carrito
            </button>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    agregarEventosBotones();
}

function renderizarCatalogo(listaProductos, contenedor) {
    contenedor.innerHTML = ""; 

    if (listaProductos.length === 0) {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--texto-oscuro);">
                <p>No se encontraron plantas que coincidan con tu búsqueda.</p>
            </div>
        `;
        return;
    }

    listaProductos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-tarjeta");
        
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${producto.dificultad === 'facil' ? '#40916C' : '#D4A373'}">
                Cuidado: ${producto.dificultad}
            </span>
            <h3 style="margin: 10px 0;">${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div style="margin-top: 15px; font-weight: bold; color: var(--verde-primario); font-size: 18px;">
                S/ ${producto.precio.toFixed(2)}
            </div>
            <button class="btn-agregar" data-id="${producto.id}" style="margin-top: 10px; width: 100%;">
                Agregar al carrito
            </button>
        `;
        contenedor.appendChild(tarjeta);
    });
    
    agregarEventosBotones();
}

function agregarEventosBotones() {
    const botones = document.querySelectorAll('.btn-agregar');
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    }
}

function configurarFiltrosYBusqueda(contenedorCatalogo) {
    const buscador = document.getElementById("buscador");
    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    
    let filtroActivo = "todos";
    let textoBusqueda = "";

    if (buscador) {
        buscador.addEventListener("input", (e) => {
            textoBusqueda = e.target.value.toLowerCase().trim();
            filtrarYBuscarProductos();
        });
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            e.target.classList.add("activo");
            filtroActivo = e.target.getAttribute("data-filtro");
            filtrarYBuscarProductos();
        });
    });

    function filtrarYBuscarProductos() {
        let resultado = productos;

        if (filtroActivo !== "todos") {
            resultado = resultado.filter(p => p.dificultad === filtroActivo);
        }

        if (textoBusqueda !== "") {
            resultado = resultado.filter(p => 
                p.nombre.toLowerCase().includes(textoBusqueda) || 
                p.descripcion.toLowerCase().includes(textoBusqueda)
            );
        }

        renderizarCatalogo(resultado, contenedorCatalogo);
    }
}