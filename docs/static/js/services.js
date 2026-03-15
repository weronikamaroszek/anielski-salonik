// ── MODAL ──
function openServiceModal(name) {
    const overlay = document.getElementById('modal-' + name);
    overlay.classList.add('active');
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.dataset.scrollY = scrollY;
}

function closeServiceModal(name) {
    const overlay = document.getElementById('modal-' + name);
    overlay.classList.remove('active');
    const scrollY = parseInt(document.body.dataset.scrollY || '0');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.dataset.scrollY = '';
    window.scrollTo(0, scrollY);
}

// Zamknięcie przez kliknięcie w tło
document.querySelectorAll('.service-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            const name = this.id.replace('modal-', '');
            closeServiceModal(name);
        }
    });
});

// ── KARUZELA ──
const carouselState = {};

function initCarousel(name) {
    if (!carouselState[name]) {
        carouselState[name] = 0;
    }
}

function goToSlide(name, index) {
    initCarousel(name);
    const carousel = document.getElementById('carousel-' + name);
    const images = carousel.querySelectorAll('img');
    const dots = document.querySelectorAll('#dots-' + name + ' .carousel-dot');

    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    images[index].classList.add('active');
    dots[index].classList.add('active');
    carouselState[name] = index;
}

function nextSlide(name) {
    initCarousel(name);
    const carousel = document.getElementById('carousel-' + name);
    const images = carousel.querySelectorAll('img');
    const next = (carouselState[name] + 1) % images.length;
    goToSlide(name, next);
}

function prevSlide(name) {
    initCarousel(name);
    const carousel = document.getElementById('carousel-' + name);
    const images = carousel.querySelectorAll('img');
    const prev = (carouselState[name] - 1 + images.length) % images.length;
    goToSlide(name, prev);
}