/* =============================================
   SINTRAPETROCOL — script.js
   1. Toggle menú móvil
   2. Parallax en hero
   3. Scroll reveal (IntersectionObserver)
   4. Contadores animados
   5. Formulario de afiliación + EmailJS
   ============================================= */

/* ══════════════════════════════════════════════
   CONFIGURACIÓN EMAILJS
   ─────────────────────────────────────────────
   Para activar el envío de correo:
   1. Crear cuenta gratis en https://www.emailjs.com
   2. Añadir un servicio de correo (Gmail, Outlook…)
   3. Crear una plantilla con las variables del formulario
   4. Reemplazar los 3 valores de abajo con tus credenciales
   ══════════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY  = 'TU_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'TU_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID';
const UNION_EMAIL         = 'xxxxxxxxxx@sintrapetrocol.com';

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MENÚ MÓVIL ─────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 2. PARALLAX EN HERO ────────────────────── */
  const heroImageWrap = document.querySelector('.hero__image-wrap');
  const heroSection   = document.querySelector('.hero');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (heroImageWrap && heroSection && !prefersReducedMotion() && !isTouchDevice) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < heroSection.offsetHeight * 1.5) {
            heroImageWrap.style.transform = `translateY(calc(-${scrollY * 0.18}px))`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 3. SCROLL REVEAL ───────────────────────── */
  if ('IntersectionObserver' in window && !prefersReducedMotion()) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ── 4. CONTADORES ANIMADOS ─────────────────── */
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, parseInt(entry.target.dataset.count, 10));
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
  } else {
    document.querySelectorAll('[data-count]').forEach(el => {
      el.textContent = el.dataset.count;
    });
  }

  /* ── 5. FORMULARIO DE AFILIACIÓN ────────────── */

  // Botones de imprimir (sustituye onclick inline — bloqueado por CSP)
  document.getElementById('btnPrint')?.addEventListener('click', () => window.print());
  document.getElementById('btnPrintSuccess')?.addEventListener('click', () => window.print());

  const form = document.getElementById('afForm');
  if (!form) return;

  // Pre-llenar fecha con hoy
  const fechaInput = document.getElementById('fechaSolicitud');
  if (fechaInput && !fechaInput.value) {
    fechaInput.value = new Date().toISOString().split('T')[0];
  }

  // Sincronizar cédula al campo de firma
  const cedulaMain  = document.getElementById('cedula');
  const cedulaFirma = document.getElementById('cedulaFirma');
  if (cedulaMain && cedulaFirma) {
    cedulaMain.addEventListener('input', () => {
      if (!cedulaFirma.value) cedulaFirma.value = cedulaMain.value;
    });
  }

  // Inicializar EmailJS si la clave está configurada
  const emailjsReady = EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY';
  if (emailjsReady && typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const btnSubmit  = document.getElementById('btnSubmit');
    const btnText    = btnSubmit.querySelector('.af-btn-submit__text');
    const btnLoading = btnSubmit.querySelector('.af-btn-submit__loading');
    const errorEl    = document.getElementById('afError');

    // Estado de carga
    btnText.hidden    = true;
    btnLoading.hidden = false;
    btnSubmit.disabled = true;
    errorEl.hidden     = true;

    const datos = collectFormData(form);

    try {
      if (emailjsReady && typeof emailjs !== 'undefined') {
        // Envío real via EmailJS
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email:       UNION_EMAIL,
          fecha:          datos.fechaSolicitud,
          nombres:        datos.nombres,
          apellidos:      datos.apellidos,
          cedula:         datos.cedula,
          expedida_en:    datos.expedidaEn,
          fn_dia:         datos.fnDia,
          fn_mes:         datos.fnMes,
          fn_ano:         datos.fnAno,
          fn_lugar:       datos.fnLugar,
          fn_dpto:        datos.fnDpto,
          direccion:      datos.direccion,
          barrio:         datos.barrio,
          municipio:      datos.municipio,
          tel_fijo:       datos.telFijo,
          tel_celular:    datos.telCelular,
          correo:         datos.correo,
          codigo:         datos.codigo,
        });
      } else {
        // Fallback: abrir cliente de correo con los datos
        const cuerpo = buildEmailBody(datos);
        const mailto = `mailto:${UNION_EMAIL}`
          + `?subject=${encodeURIComponent('Solicitud de Afiliación — ' + datos.nombres + ' ' + datos.apellidos)}`
          + `&body=${encodeURIComponent(cuerpo)}`;
        window.location.href = mailto;
        // Simular éxito después del mailto
        await new Promise(r => setTimeout(r, 800));
      }

      // Mostrar éxito
      form.hidden = true;
      document.getElementById('afSuccess').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('EmailJS error:', err);
      errorEl.hidden = false;
      btnText.hidden    = false;
      btnLoading.hidden = true;
      btnSubmit.disabled = false;
    }
  });

});

/* ── HELPER: validar formulario ───────────────── */
function validateForm(form) {
  // Honeypot antibot: si está relleno, es un bot
  const honeypot = form.querySelector('#website');
  if (honeypot && honeypot.value.trim() !== '') return false;

  let valid = true;

  form.querySelectorAll('[required]').forEach(input => {
    input.classList.remove('af-invalid');
    const val = input.value.trim();

    if (!val) {
      input.classList.add('af-invalid');
      valid = false;
      return;
    }

    // Validaciones de formato
    if (input.id === 'cedula' || input.id === 'cedulaFirma') {
      if (!/^\d{6,10}$/.test(val)) {
        input.classList.add('af-invalid');
        valid = false;
      }
    }

    if (input.id === 'telCelular') {
      if (!/^3\d{9}$/.test(val.replace(/\s/g, ''))) {
        input.classList.add('af-invalid');
        valid = false;
      }
    }

    if (input.type === 'email') {
      if (!input.checkValidity()) {
        input.classList.add('af-invalid');
        valid = false;
      }
    }
  });

  if (!valid) {
    form.querySelector('.af-invalid')?.focus();
    form.querySelector('.af-invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return valid;
}

/* ── HELPER: recoger datos del formulario ─────── */
function collectFormData(form) {
  const data = {};
  new FormData(form).forEach((val, key) => { data[key] = val; });
  return data;
}

/* ── HELPER: construir cuerpo del correo ─────── */
function buildEmailBody(d) {
  return `SOLICITUD DE AFILIACIÓN — SINTRAPETROCOL
Fecha: ${d.fechaSolicitud || '—'}

DATOS PERSONALES
Nombres:      ${d.nombres || '—'} ${d.apellidos || ''}
Cédula:       ${d.cedula || '—'} (Exp. en ${d.expedidaEn || '—'})
Nacimiento:   ${d.fnDia || '—'}/${d.fnMes || '—'}/${d.fnAno || '—'} — ${d.fnLugar || '—'}, ${d.fnDpto || '—'}
Dirección:    ${d.direccion || '—'}, ${d.barrio || '—'}, ${d.municipio || '—'}
Tel. Fijo:    ${d.telFijo || '—'}
Tel. Celular: ${d.telCelular || '—'}
Correo:       ${d.correo || '—'}
Código empl.: ${d.codigo || '—'}`;
}

/* ── HELPER: anima contador de 0 a target ─────── */
function animateCounter(el, target, duration = 1600) {
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

/* ── HELPER: detecta prefers-reduced-motion ────── */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
