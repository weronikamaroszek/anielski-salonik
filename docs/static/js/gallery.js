function toggleGallery() {
    const hidden = document.querySelectorAll('.gallery-hidden');
    const btn = document.getElementById('galleryBtn');
    const isOpen = btn.classList.contains('open');

    hidden.forEach(item => {
        item.style.display = isOpen ? 'none' : 'block';
    });

    btn.classList.toggle('open');

    btn.innerHTML = isOpen
        ? '<i data-lucide="chevron-down"></i> Zobacz więcej'
        : '<i data-lucide="chevron-up"></i> Zwiń';

    lucide.createIcons();
}