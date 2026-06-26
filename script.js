/* =============================================
   SINTRAPETROCOL — script.js
   1. Toggle menú móvil
   2. Parallax en hero
   3. Scroll reveal (IntersectionObserver)
   4. Contadores animados
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MENÚ MÓVIL ─────────────────────────── */
  const toggle  = document.getElementById('navToggle');
  const nav     = document.getElementById('mainNav');

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

  if (heroImageWrap && heroSection && !prefersReducedMotion()) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY  = window.scrollY;
          const heroH    = heroSection.offsetHeight;

          if (scrollY < heroH * 1.5) {
            // El logo sube más lento que el scroll → sensación de profundidad
            const offset = scrollY * 0.18;
            heroImageWrap.style.transform = `translateY(calc(-${offset}px))`;
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
    // Sin soporte o reduced-motion: mostrar todo de inmediato
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ── 4. CONTADORES ANIMADOS ─────────────────── */
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-count]').forEach(el => {
      counterObserver.observe(el);
    });
  } else {
    // Sin soporte: mostrar valor final directamente
    document.querySelectorAll('[data-count]').forEach(el => {
      el.textContent = el.dataset.count;
    });
  }

});

/* ── HELPER: anima un número de 0 a target ─────── */
function animateCounter(el, target, duration = 1600) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/* ── HELPER: detecta prefers-reduced-motion ──────── */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
