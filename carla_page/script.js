document.addEventListener('DOMContentLoaded', () => {
    // Show and hide Carla's image on button click
    const image = document.getElementById('imgCarla');
    const button = document.getElementById('imgButton');

    image.classList.remove('visible');

    button.addEventListener('click', () => {
        if (image.classList.contains('visible')) {
                image.classList.remove('visible');
                button.textContent = 'Show image';
            } else {
                image.classList.add('visible');
                button.textContent = 'Hide image';
        }
    });

    // Interactive FAQ section
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});