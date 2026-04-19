// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Move main cursor instantly
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
  const speed = 0.15;
  
  followerX += (mouseX - followerX) * speed;
  followerY += (mouseY - followerY) * speed;
  
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .project-card, .social-btn, .skill-pill, input, textarea');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── Loading Screen Language Cycle ─────────────────────────────
const greetings = [
'Hello 👋', // English
'Hola 👋', // Spanish
'Bonjour 👋', // French
'Ciao 👋', // Italian
'Hallo 👋', // German
'Olá 👋', // Portuguese
'Привет 👋', // Russian
'こんにちは 👋', // Japanese
'你好 👋', // Chinese
'🙋مرحبا ☕', // Arabic
'नमस्ते 🕉️', // Hindi
'Merhaba 👋', // Turkish
'Hej 👋'// Swedish
     
];

const loaderText = document.getElementById('loaderText');
const loaderScreen = document.getElementById('loaderScreen');
let currentIndex = 0;

// Cycle through greetings every 200ms (faster)
const greetingInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % greetings.length;
  loaderText.textContent = greetings[currentIndex];
}, 200);

// Hide loader after 3 seconds
setTimeout(() => {
  clearInterval(greetingInterval);
  loaderScreen.classList.add('hidden');
  document.body.style.overflow = 'auto';
}, 3000);

// Prevent scroll during loading
document.body.style.overflow = 'hidden';

// ── Scroll Reveal ──────────────────────────────────────────────
// Scroll-reveal for .reveal elements
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards within the same grid tick
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Attach observer and stagger delay to each card
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 3) * 120; // stagger within each row
  revealObserver.observe(el);
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => navObserver.observe(s));
