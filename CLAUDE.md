# CLAUDE.md — Sitio Web SINTRAPETROCOL

## Proyecto
Sitio web estático de una sola página para **SINTRAPETROCOL** (Sindicato de Trabajadores de MEXICHEM RESINAS COLOMBIA S.A.S), con sede en Cartagena, Bolívar, Colombia.

## Archivos
```
index.html   — HTML5 semántico, página única con todas las secciones
styles.css   — Todos los estilos, mobile-first, sin frameworks
script.js    — Solo toggle del menú móvil
logo.png     — Fuente exclusiva de la paleta de colores
```

## Restricciones absolutas
- **Sin frameworks CSS** (sin Bootstrap, Tailwind, Foundation)
- **Sin frameworks JS** (sin React, Vue, jQuery)
- **Sin herramientas de build** (sin npm, webpack, vite)
- **Máximo 3 archivos de código** (index.html, styles.css, script.js)
- **Sin backend, CMS, base de datos ni autenticación**
- Los colores provienen **exclusivamente de logo.png** — no inventar ni tomar de otros sitios

## Sistema de color (extraído de logo.png)
```css
--color-primary:        #1a2d5a   /* Azul marino — fondo del escudo */
--color-secondary:      #f5a623   /* Dorado — texto, casco y anillo */
--color-dark:           #2a2a2a   /* Carbón — engranaje exterior */
--color-background:     #f0f4f8   /* Blanco-azul, derivado del marino */
--color-surface:        #ffffff   /* Blanco limpio */
--color-text-primary:   #0d1a33   /* Marino muy oscuro — contraste ≥14:1 */
--color-text-secondary: #344d7a   /* Marino medio — contraste ≥6.8:1 */
```
Contraste mínimo requerido: **4.5:1 WCAG AA** en todos los elementos de texto.

## Breakpoints (mobile-first)
```css
/* base */ 0px+     — móvil compacto
@media (min-width: 375px)  — ajustes mínimos
@media (min-width: 768px)  — tablet / nav horizontal
@media (min-width: 1200px) — desktop (3 cols, footer 4 cols)
```

## Secciones del HTML (en orden)
| ID / Anchor   | Contenido fuente                              |
|---------------|-----------------------------------------------|
| `#inicio`     | Hero — identidad + CTA                        |
| Anuncios      | Convención 2025-26, Reforma 2023, Fondo calamidad |
| `#nosotros`   | Arts. 1–3 Estatutos (nombre, domicilio, misión)|
| `#objetivos`  | Art. 4 Estatutos — 6 tarjetas de objetivos    |
| Statement     | Art. 5 — declaración sindical                 |
| `#afiliacion` | Art. 6 (requisitos), Arts. 42-43 (cuotas), Art. 8 (derechos) |
| `#estructura` | Arts. 9-15 (Asamblea), 16-33 (Junta Directiva), 35-40 (Comisiones) |
| `#derechos`   | Art. 7 (deberes) + Art. 8 (derechos)          |
| `#contacto`   | Footer 4 columnas — Art. 2 (Cartagena, Bolívar)|

## Contenido — fuente de verdad
El contenido proviene del cuaderno NotebookLM **"Sintrapetrocolweb"** (notebook ID: `916179bb-a58d-4985-9135-7bcdcbc926ac`), fuente principal: **ESTATUTOS SINTRAPETROCOL REFORMA 2023** (source ID: `2264a3c6-02d1-4756-956a-99b28c4f49c6`).

- **No inventar** datos de los estatutos — usar solo lo del cuaderno
- Empresa: **MEXICHEM RESINAS COLOMBIA S.A.S** (reemplazó a "Petroquímica Colombiana S.A. / PETCO")
- Sede: Cartagena, Departamento de Bolívar

## Técnicas CSS notables
- `mix-blend-mode: multiply` en `.hero__img` → elimina fondo blanco del logo PNG sobre el fondo marino
- `clamp()` para tipografía fluida en títulos
- `position: sticky` en el header con `z-index: 1000`
- Gradiente del hero: `linear-gradient(140deg, #1a2d5a 0%, #243d7a 100%)`

## Estructura del header / nav
- Nav mobile: desplegable con `max-height` animada + clase `.is-open`
- Nav desktop (≥768px): inline horizontal, `nav-toggle` oculto con `display: none`
- Sticky visible solo cuando JS activa `.is-open` en `#mainNav`

## Modificaciones ya realizadas
- `mix-blend-mode: multiply` aplicado al logo del hero (fondo blanco eliminado)
- Toda referencia a "Petroquímica Colombiana / PETCO" reemplazada por "MEXICHEM RESINAS COLOMBIA S.A.S"

## Qué NO tocar sin instrucción explícita
- Los valores de las custom properties de color (derivados del logo)
- El orden de las secciones (refleja la estructura de USO.org.co)
- Los IDs de ancla de navegación (`#inicio`, `#nosotros`, etc.)
