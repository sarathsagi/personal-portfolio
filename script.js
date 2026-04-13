/* ===== SCROLL PROGRESS ===== */
const scrollProgress = document.getElementById('scrollProgress');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    scrollProgress.style.width = `${(scrollY / docHeight) * 100}%`;
    header.classList.toggle('scrolled', scrollY > 60);
    backToTop.classList.toggle('visible', scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeToggle.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ===== MOBILE MENU ===== */
const navHamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

navHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(({ offsetTop, offsetHeight, id }) => {
        if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            navItems.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { passive: true });

/* ===== TYPEWRITER ===== */
const roles = [
    'Lead Data Engineer',
    'Analytics Platform Architect',
    'Data Governance Expert',
    'Real-time Pipeline Builder'
];

const typedEl = document.getElementById('typedText');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeWriter() {
    const current = roles[roleIdx];
    typedEl.textContent = deleting
        ? current.substring(0, charIdx - 1)
        : current.substring(0, charIdx + 1);

    deleting ? charIdx-- : charIdx++;

    let delay = deleting ? 45 : 75;

    if (!deleting && charIdx === current.length) {
        delay = 2200;
        deleting = true;
    } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeWriter, delay);
}

typeWriter();

/* ===== ANIMATED COUNTERS ===== */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1400;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        el.textContent = current;
        if (step >= steps) clearInterval(timer);
    }, duration / steps);
}

/* ===== INTERSECTION OBSERVER (reveal + counters) ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== BLOG CAROUSEL ===== */
const blogCarousel = document.getElementById('blogCarousel');
if (blogCarousel) {
    const prevBtn = document.querySelector('.blog-carousel-prev');
    const nextBtn = document.querySelector('.blog-carousel-next');
    const cardWidth = () => blogCarousel.querySelector('.blog-article-card').offsetWidth + 20;

    prevBtn.addEventListener('click', () => blogCarousel.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => blogCarousel.scrollBy({ left: cardWidth(), behavior: 'smooth' }));
}
