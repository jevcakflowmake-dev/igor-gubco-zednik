/* ============================================================
   Igor Gubčo — Řemeslník · main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav: transparent → solid on scroll ─────────────────── */
  const nav = document.getElementById('nav');
  function handleScroll() {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile hamburger ────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── Hero parallax (subtle, max 30% offset) ──────────────── */
  const parallaxEl = document.querySelector('.hero-parallax');
  function parallax() {
    if (!parallaxEl) return;
    const scrolled = window.scrollY;
    const heroH = document.getElementById('hero').offsetHeight;
    if (scrolled < heroH) {
      const offset = scrolled * 0.22;
      parallaxEl.style.transform = `translateY(${offset}px)`;
    }
  }
  window.addEventListener('scroll', parallax, { passive: true });

  /* ── IntersectionObserver: scroll-reveal ─────────────────── */
  const revealItems = document.querySelectorAll(
    '.service-card, .stat-item, .why-item'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // stagger via delay based on data-index or sibling order
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || 0);
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay * 1000);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Assign stagger delays
  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.dataset.delay = i * 0.15;
    observer.observe(el);
  });
  document.querySelectorAll('.stat-item').forEach((el, i) => {
    el.dataset.delay = i * 0.12;
    observer.observe(el);
  });
  document.querySelectorAll('.why-item').forEach((el, i) => {
    el.dataset.delay = i * 0.1;
    observer.observe(el);
  });

  /* ── Animated counter ────────────────────────────────────── */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target, 1400);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach(el => counterObserver.observe(el));

  /* ── Contact form (client-side only) ─────────────────────── */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Odesílám…';

      // Simulate async (replace with actual fetch to your backend/Make webhook)
      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 800);
    });
  }

})();
