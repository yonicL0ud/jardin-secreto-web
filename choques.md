# Choques CSS detectados - Jardín Secreto

## Fecha: [PONER FECHA ACTUAL]

## Integrantes del equipo
- [Nombre 1] - Integrador
- [Nombre 2] - Navegante  
- [Nombre 3] - Maquetador
- [Nombre 4] - Formularista
- [Nombre 5] - Auditor

---

### Diferencia 1: Tipografía general
- **S13 (CSS puro)**: Fuente Quicksand en todo el sitio
- **S14 (con Bootstrap)**: Bootstrap aplicó su fuente system-ui
- **Decisión**: Aceptamos el cambio porque nuestro `@import` de Quicksand está después de Bootstrap y gana por cascada. La fuente sigue siendo Quicksand.

### Diferencia 2: Botones
- **S13**: Botones verdes (#2D6A4F) con bordes redondeados (border-radius: 8px)
- **S14**: Bootstrap cambió los botones a color primario azul, con bordes diferentes
- **Decisión**: Sobrescribimos usando `.btn-success` en lugar de `.btn-primary` y agregamos nuestras propias clases

### Diferencia 3: Márgenes del header
- **S13**: Header pegado al top, sin espacios
- **S14**: Bootstrap navbar tiene padding interno
- **Decisión**: Aceptamos el estilo de Bootstrap porque mejora la legibilidad

### Diferencia 4: Listas de navegación
- **S13**: Sin viñetas, display flex
- **S14**: Bootstrap aplica sus estilos de lista
- **Decisión**: Bootstrap se encarga completamente de la navbar, no necesitamos nuestro CSS anterior

### Diferencia 5: Tarjetas de productos
- **S13**: CSS Grid propio (grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)))
- **S14**: Grid de Bootstrap con columnas explícitas
- **Decisión**: Migramos completamente al grid de Bootstrap para mantener consistencia

---

## Resumen de decisiones
- **Aceptadas**: Tipografía, márgenes, navbar
- **Sobrescritas**: Botones (usamos clase btn-success de Bootstrap)
- **Eliminadas (comentadas)**: CSS artesanal del header (~40 líneas)

## Nota adicional
El orden de los `<link>` en el `<head>` es: Bootstrap PRIMERO, luego nuestro CSS. Esto permite que nuestro CSS pueda sobrescribir a Bootstrap cuando sea necesario.