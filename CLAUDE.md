# CLAUDE.md — Sitio Web SINTRAPETROCOL

## Proyecto
Sitio web estático de una sola página para **SINTRAPETROCOL** (Sindicato de Trabajadores de MEXICHEM RESINAS COLOMBIA S.A.S), con sede en Cartagena, Bolívar, Colombia.

## Archivos
```
index.html   — HTML5 semántico, página única con todas las secciones
styles.css   — Todos los estilos, mobile-first, sin frameworks
script.js    — Toggle menú, parallax, scroll reveal, contadores
logo.png     — PNG con fondo TRANSPARENTE (ya procesado) — fuente de colores
```

## Restricciones absolutas
- **Sin frameworks CSS** (sin Bootstrap, Tailwind, Foundation)
- **Sin frameworks JS** (sin React, Vue, jQuery)
- **Sin herramientas de build** (sin npm, webpack, vite)
- **Máximo 3 archivos de código** (index.html, styles.css, script.js)
- **Sin backend, CMS, base de datos ni autenticación**
- Los colores provienen **exclusivamente de logo.png** — no inventar ni tomar de otros sitios

## Logo — estado actual
`logo.png` es un PNG con **fondo 100% transparente**. El fondo blanco exterior al engranaje y los espacios blancos entre los flancos del engranaje fueron eliminados con flood fill BFS (Python + Pillow) desde las 4 esquinas. El interior del escudo (azul marino, dorado, blanco de las ilustraciones) está intacto.

- **NO aplicar** `clip-path`, `mix-blend-mode` ni background al `.hero__image-wrap` — ya no son necesarios.
- **NO volver a procesar** el logo con scripts de remoción de fondo — ya está limpio.

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
/* base */              0px+  — móvil compacto
@media (max-width: 479px)     — ajustes extra-small (topbar simplificado, footer 1 col)
@media (min-width: 375px)     — ajustes mínimos
@media (min-width: 768px)     — tablet / nav horizontal
@media (min-width: 1200px)    — desktop (3 cols, footer 4 cols)
```

## Secciones del HTML (en orden)
| ID / Anchor   | Contenido fuente                                          |
|---------------|-----------------------------------------------------------|
| `#inicio`     | Hero — identidad + CTA                                    |
| `.stats`      | Estadísticas: 62 arts, 14 caps, 10 directivos, 40 SMLV   |
| Anuncios      | Convención 2025-26, Reforma 2023, Fondo calamidad         |
| `#nosotros`   | Arts. 1–3 Estatutos (nombre, domicilio, misión)           |
| `#objetivos`  | Art. 4 Estatutos — 6 tarjetas de objetivos                |
| Statement     | Art. 5 — declaración sindical                             |
| `#afiliacion` | Art. 6 (requisitos), Arts. 42-43 (cuotas), Art. 8 (derechos) |
| `#estructura` | Arts. 9-15 (Asamblea), 16-33 (Junta Directiva), 35-40 (Comisiones) |
| `#derechos`   | Art. 7 (deberes) + Art. 8 (derechos)                     |
| `#contacto`   | Footer 4 columnas — Art. 2 (Cartagena, Bolívar)          |

## Contenido — fuente de verdad
Cuaderno NotebookLM **"Sintrapetrocolweb"** (ID: `916179bb-a58d-4985-9135-7bcdcbc926ac`).
Fuente principal: **ESTATUTOS SINTRAPETROCOL REFORMA 2023** (source ID: `2264a3c6-02d1-4756-956a-99b28c4f49c6`).

- **No inventar** datos de los estatutos — usar solo lo del cuaderno
- Empresa: **MEXICHEM RESINAS COLOMBIA S.A.S** (reemplazó a "Petroquímica Colombiana S.A. / PETCO")
- Correo: `xxxxxxxxxx@sintrapetrocol.com`
- Sede: Cartagena, Departamento de Bolívar

## Animaciones implementadas (script.js + styles.css)
- **Hero entrance**: badge → título → desc → botones en cascada (fadeSlideUp con delays)
- **Fondo hero**: gradiente marino animado en bucle (heroGradientShift 10s)
- **Logo flotante**: animación logoFloat 4s en `.hero__img`
- **Parallax**: solo en desktop (desactivado con `pointer: coarse`)
- **Scroll reveal**: IntersectionObserver con clases `.reveal` y `.reveal-stagger`
- **Contadores**: animación ease-out cubic en elementos `[data-count]`

## Optimizaciones móvil aplicadas
- `scroll-padding-top: 72px` en `html` (anclas no quedan detrás del header)
- `-webkit-tap-highlight-color: transparent` + `touch-action: manipulation`
- `@media (hover: none)` — hover effects desactivados en touch
- Safe area insets para iPhone con notch (`env(safe-area-inset-*)`)
- `meta theme-color #1a2d5a` para barra del navegador Android
- `fetchpriority="high"` en hero logo, `loading="lazy"` en footer logo
- Topbar simplificada en < 480px, footer 1 columna en < 480px

## Qué NO tocar sin instrucción explícita
- El archivo `logo.png` — ya tiene fondo transparente, no reprocesar
- Los valores de las custom properties de color
- El orden de las secciones (refleja estructura de USO.org.co)
- Los IDs de ancla de navegación (`#inicio`, `#nosotros`, etc.)
- Las clases `.reveal` y `.reveal-stagger` en el HTML
