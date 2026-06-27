---
name: print-config-formulario-afiliacion
description: "Configuración CSS @media print que hace caber el formulario de afiliación de SINTRAPETROCOL en exactamente una hoja carta, con márgenes naturales. Verificado local y GitHub Pages."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 80f4dbaf-2eca-4750-be3d-4737c8fa75a7
---

# Configuración de impresión — Formulario de afiliación (una hoja carta)

Probada y validada en Chrome/Edge, local y GitHub Pages. El formulario incluye: encabezado institucional, carta formal, datos personales (8 filas), firma y sección Junta Directiva.

## Valores clave que determinan que quepa en una hoja

| Propiedad | Valor | Por qué importa |
|---|---|---|
| `@page margin` | `1.2cm 1.5cm` | Márgenes mínimos con espacio para pie de página del navegador |
| Logo header | `62pt × 62pt` | Más pequeño que pantalla pero legible |
| Texto carta `line-height` | `1.65` | Equilibrio entre legibilidad y espacio |
| Filas de datos `gap` | `8pt` | Espaciado mínimo cómodo |
| Filas de datos `margin-bottom` | `9pt` | |
| Línea de firma `height` | `46pt` | Espacio suficiente para firma física |
| Junta Directiva `padding` | `8pt 12pt` | |
| Junta texto `line-height` | `2.2` | Da los blancos para rellenar a mano |

## Bloque CSS completo validado

```css
@media print {
  @page { size: letter portrait; margin: 1.2cm 1.5cm; }

  .header, .af-back-btn, .af-actions, .af-error,
  .af-success__actions, .btn-float, .no-print,
  .af-success { display: none !important; }

  *, *::before, *::after { box-sizing: border-box; }

  body, .af-main {
    background: white !important;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 9pt;
    line-height: 1.35;
    color: #000;
  }

  .af-container { max-width: 100%; padding: 0; }
  .af-form { border: none !important; box-shadow: none !important; padding: 0 !important; }

  /* Encabezado */
  .af-doc-header {
    display: flex !important; align-items: center !important;
    gap: 10pt !important; border-bottom: 1.5pt solid #000 !important;
    padding-bottom: 7pt !important; margin-bottom: 10pt !important;
  }
  .af-doc-header__logo img { width: 62pt !important; height: 62pt !important; }
  .af-doc-header__union   { font-size: 9.5pt !important; font-weight: 700 !important; margin-bottom: 2pt !important; }
  .af-doc-header__acronym { font-size: 8.5pt !important; letter-spacing: 0.1em !important; margin-bottom: 2pt !important; }
  .af-doc-header__legal,
  .af-doc-header__address,
  .af-doc-header__email   { font-size: 7.5pt !important; line-height: 1.55 !important; }

  /* Fecha */
  .af-date-row { display: flex !important; align-items: center !important; gap: 8pt !important; margin-bottom: 10pt !important; }
  .af-date-label { font-size: 9pt !important; font-weight: 700 !important; white-space: nowrap !important; }
  .af-input--date {
    font-size: 9pt !important; border: none !important;
    border-bottom: 1pt solid #000 !important; padding: 1pt 3pt !important;
    width: auto !important; background: transparent !important; box-shadow: none !important;
  }

  /* Carta formal — line-height 1.65 es el valor crítico */
  .af-letter-body {
    border-left: 2pt solid #000 !important; background: white !important;
    padding: 6pt 11pt !important; margin-bottom: 9pt !important;
  }
  .af-letter-body p { font-size: 8pt !important; line-height: 1.65 !important; color: #000 !important; text-align: justify !important; }

  /* Fieldset datos personales */
  .af-fieldset { border: 1pt solid #444 !important; padding: 6pt 10pt 8pt !important; margin-bottom: 8pt !important; }
  .af-fieldset__legend { font-size: 7.5pt !important; font-weight: 700 !important; background-color: #000 !important; color: #fff !important; padding: 2pt 7pt !important; }

  /* Grillas — gap y margin-bottom son los valores más sensibles */
  .af-row { gap: 8pt !important; margin-bottom: 9pt !important; }
  .af-row--2 { grid-template-columns: 1fr 1fr !important; }
  .af-row--3 { grid-template-columns: 1fr 1fr 1fr !important; }
  .af-row--nacimiento { grid-template-columns: 36pt 36pt 50pt 1fr 80pt !important; gap: 6pt !important; }
  .af-row--1 { grid-template-columns: 1fr !important; }

  .af-label { font-size: 7pt !important; color: #333 !important; margin-bottom: 1pt !important; line-height: 1.3 !important; }
  .af-input {
    border: none !important; border-bottom: 1pt solid #000 !important;
    border-radius: 0 !important; padding: 2pt 2pt 2pt 0 !important;
    font-size: 9pt !important; line-height: 1.3 !important;
    background: transparent !important; box-shadow: none !important; width: 100% !important; min-height: 0 !important;
  }
  .af-input--sm { text-align: center !important; }

  /* Firma */
  .af-signature-row {
    display: flex !important; align-items: flex-end !important;
    gap: 14pt !important; background: white !important;
    border: 1pt dashed #999 !important; padding: 6pt 10pt !important;
    margin-bottom: 8pt !important; flex-wrap: nowrap !important;
  }
  .af-signature-block { flex: 2 !important; }
  .af-signature-line { height: 46pt !important; border-bottom: 1.25pt solid #000 !important; margin-bottom: 3pt !important; }
  .af-signature-label { font-size: 7.5pt !important; text-align: center !important; }
  .af-signature-row .af-field { flex: 1 !important; min-width: 0 !important; }

  /* Junta Directiva */
  .af-junta { background: #f5f5f5 !important; border: 1pt solid #999 !important; padding: 8pt 12pt !important; margin-bottom: 0 !important; }
  .af-junta__title { font-size: 7.5pt !important; margin-bottom: 5pt !important; }
  .af-junta__text  { font-size: 8.5pt !important; line-height: 2.2 !important; margin-bottom: 6pt !important; }
  .af-junta__field { font-size: 8.5pt !important; gap: 4pt !important; }
  .af-junta__blank { border-bottom: 1pt solid #000 !important; }
  .af-junta .af-row { margin-bottom: 0 !important; gap: 10pt !important; }
}
```

## Lecciones aprendidas

- **GitHub Pages vs local**: El navegador añade el URL al pie de impresión desde HTTPS, consumiendo ~20pt del margen inferior. La configuración actual tiene buffer suficiente para absorberlo.
- **Valores más sensibles**: `line-height` del texto formal y `margin-bottom` de las filas de datos. Cambiar ±0.1 en line-height mueve ~7-10pt verticalmente.
- **Si se pasa de hoja**: Reducir primero `line-height` carta (1.65→1.55) y `margin-bottom` filas (9pt→7pt). Eso salva ~25pt.
- **Si sobra mucho espacio**: Aumentar primero `line-height` carta (1.65→1.8) y `height` de la firma (46pt→56pt).
- **No tocar**: `@page margin` y el tamaño del logo — son el ancla del layout.
