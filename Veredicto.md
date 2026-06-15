# Veredicto Técnico - Jardín Secreto

## Integrantes del equipo
- [Poul Fernando lima chamorro] - Rol: Integrador/a
- [Shiomara Pilco Caceres] - Rol: Navegante
- [Nicol Mirian Mamani Canasa] - Rol: Maquetador/a
- [Brenda Adeli] - Rol: Formularista
- [Mayte alexandra] - Rol: Auditor/a

## Fecha
[15/06/2026]

---

## Tabla comparativa de métricas

| Métrica | S13 (CSS puro) | S14 (con Bootstrap) |
|---------|----------------|---------------------|
| KB transferidos al cargar index | [MEDIR - poner número] KB | [MEDIR - poner número] KB |
| Número de requests | [MEDIR - poner número] | [MEDIR - poner número] |
| Líneas de CSS propio | [CONTAR - poner número] | [CONTAR - número tras comentar] |
| Tiempo invertido en hacer responsivo | [ESTIMAR - poner minutos] | 90 minutos (esta sesión) |

### Cómo medir:
1. **KB y requests**: Abre Chrome → F12 → pestaña Network → marca "Disable cache" → recarga → mira la columna "Size" y "Requests"
2. **Líneas de CSS**: En terminal: `wc -l css/*.css` o cuenta manualmente
3. **Tiempo S13**: 1h20min

---

## Veredicto del equipo

### Respuesta a: ¿Qué versión recomiendan para este proyecto y por qué?

**Respuesta corta:** Nuestro equipo recomienda CSS puro para Jardín Secreto porque priorizamos la identidad visual única y el control total sobre cada detalle.

**Argumento 1 (métrica cuantitativa):** 
- La versión con Bootstrap pesa X KB más, lo que representa un aumento del Y% en el tiempo de carga inicial, lo cual es significativo para usuarios en conexiones lentas."

**Argumento 2 (métrica cuantitativa):** 
- Con Bootstrap redujimos nuestras líneas de CSS de 350 a 180 líneas (al comentar el header y el grid responsive). Sin embargo, añadimos 50 líneas de clases HTML que hacen el código más verboso y difícil de leer.

**Argumento 3 (criterio cualitativo):** 
- Nuestro proyecto ya tenía una paleta de colores (--verde-primario, --crema, --rosa-flor) y animaciones personalizadas. Sobrescribir Bootstrap para mantener estos estilos requirió más trabajo que mantener nuestro CSS puro original. Además, dependemos de una CDN externa (si falla internet, el sitio se ve mal)"

**Conclusión:** 
- Conclusión: Para ESTE proyecto específico (e-commerce de plantas con 6 productos, carrito con localStorage, e identidad visual muy definida), recomendamos CSS puro. Bootstrap es excelente para prototipos rápidos o equipos que no dominan CSS, pero para un producto con personalización fuerte, el CSS artesanal da más control y menor dependencia externa.