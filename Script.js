/* =====================================================
   PIXELFORGE STUDIO – script.js
   ===================================================== */

// ── 1. NAVBAR SCROLL EFFECT ──────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── 2. HAMBURGER MENU (MÓVIL) ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── 3. STATS BADGES ──────────────────────────────────
// Animación manejada 100% por CSS (anillos SVG).
// No se necesita JavaScript aquí.

// ── 4. TARJETAS DE SERVICIOS ──────────────────────────
const serviceCards = document.querySelectorAll('.service-card');

function showCard(card) {
  const delay = parseInt(card.dataset.delay || 0);
  setTimeout(() => card.classList.add('visible'), delay);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showCard(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

  serviceCards.forEach(card => observer.observe(card));
} else {
  serviceCards.forEach(card => card.classList.add('visible'));
}

// Fallback: después de 2 segundos mostrar todas sin importar nada
setTimeout(() => {
  serviceCards.forEach(card => card.classList.add('visible'));
}, 2000);

// ── 5. FILTRO DE PORTAFOLIO ───────────────────────────
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── 6. SLIDER DE TESTIMONIOS ──────────────────────────
const testimonials = document.querySelectorAll('.testimonial:not(.testimonial-controls)');
const dots         = document.querySelectorAll('.t-dot');
const prevBtn      = document.getElementById('t-prev');
const nextBtn      = document.getElementById('t-next');
let currentSlide   = 0;
let autoSlideTimer;

function showSlide(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + testimonials.length) % testimonials.length;
  testimonials[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

prevBtn.addEventListener('click', () => { clearInterval(autoSlideTimer); showSlide(currentSlide - 1); startAutoSlide(); });
nextBtn.addEventListener('click', () => { clearInterval(autoSlideTimer); showSlide(currentSlide + 1); startAutoSlide(); });
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { clearInterval(autoSlideTimer); showSlide(i); startAutoSlide(); });
});
startAutoSlide();

// ── 7. FORMULARIO DE CONTACTO ─────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !email || !mensaje) {
    alert('Por favor completa todos los campos obligatorios (*)');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    submitBtn.textContent = 'Enviar Mensaje ✦';
    submitBtn.disabled = false;
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1500);
});

// ── 8. BOTÓN SCROLL TO TOP ────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 9. SMOOTH SCROLL PARA ANCLAJES ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── 10. PARALLAX LIGERO EN HERO ───────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    if (blob1) blob1.style.transform = `translateY(${scrollY * 0.15}px)`;
    if (blob2) blob2.style.transform = `translateY(${-scrollY * 0.1}px)`;
  }
});

// ── 11. ENLACE ACTIVO EN NAVBAR ───────────────────────
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const styleTag   = document.createElement('style');
styleTag.textContent = `.active-nav { color: var(--accent) !important; }`;
document.head.appendChild(styleTag);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active-nav'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-nav');
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

console.log('✦ PixelForge Studio – JS cargado correctamente');