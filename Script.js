/* PIXELFORGE STUDIO – script.js */

// 1. NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. MENU HAMBURGUESA
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// 3. FILTRO PORTAFOLIO
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !show);
      if (show) {
        item.style.opacity = '0';
        setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.3s'; }, 30);
      }
    });
  });
});

// 4. SLIDER TESTIMONIOS
const slides = document.querySelectorAll('.testimonial:not(.testimonial-controls)');
const dots   = document.querySelectorAll('.t-dot');
let cur = 0;
function goTo(n) {
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  cur = (n + slides.length) % slides.length;
  slides[cur].classList.add('active');
  dots[cur].classList.add('active');
}
document.getElementById('t-prev').addEventListener('click', () => goTo(cur - 1));
document.getElementById('t-next').addEventListener('click', () => goTo(cur + 1));
dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
setInterval(() => goTo(cur + 1), 5000);

// 5. FORMULARIO
function enviarForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const ok  = document.getElementById('form-success');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    e.target.reset();
    btn.textContent = 'Enviar Mensaje ✦';
    btn.disabled = false;
    ok.style.display = 'block';
    setTimeout(() => { ok.style.display = 'none'; }, 5000);
  }, 1500);
}

// 6. SCROLL TO TOP
const topBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => topBtn.classList.toggle('visible', window.scrollY > 400));
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 7. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
  });
});