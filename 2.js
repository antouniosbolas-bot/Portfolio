/* ---------- nav scroll state ---------- */
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  toTop.classList.toggle('show', window.scrollY > 600);
}, {passive:true});

/* ---------- hamburger / mobile menu ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

/* ---------- back to top ---------- */
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- scroll-spy active nav link ---------- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const mobileLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      mobileLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, {threshold:0.4, rootMargin:'-72px 0px -50% 0px'});
sections.forEach(s => spyObserver.observe(s));

/* ---------- terminal typing sequence ---------- */
const termLines = document.querySelectorAll('#termBody .line');
let ti = 0;
function typeNext(){
  if (ti >= termLines.length) return;
  termLines[ti].classList.add('show');
  ti++;
  setTimeout(typeNext, 420);
}
setTimeout(typeNext, 500);

/* ---------- contact form validation ---------- */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function setError(fieldId, message){
  const field = document.getElementById(fieldId);
  const err = field.querySelector('.err');
  if (message){
    field.classList.add('invalid');
    err.textContent = message;
  } else {
    field.classList.remove('invalid');
    err.textContent = '';
  }
}

function validEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.classList.remove('show','success');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  let ok = true;

  if (name.length < 2){ setError('f-name', 'Please enter your name.'); ok = false; }
  else setError('f-name', '');

  if (!validEmail(email)){ setError('f-email', 'Please enter a valid email.'); ok = false; }
  else setError('f-email', '');

  if (subject.length < 3){ setError('f-subject', 'Please add a short subject.'); ok = false; }
  else setError('f-subject', '');

  if (message.length < 10){ setError('f-message', 'Message should be at least 10 characters.'); ok = false; }
  else setError('f-message', '');

  if (!ok) return;

  const phoneNumber = '201284453186';
  const whatsappMessage = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    `Message: ${message}`
  ].join('\n');

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, '_blank');

  status.textContent = '✓ Your message was opened in WhatsApp.';
  status.classList.add('show','success');
  form.reset();
});