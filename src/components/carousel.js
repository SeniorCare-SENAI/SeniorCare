let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateCarousel();
}

function moveCarousel(direction) {
    showSlide(currentSlide + direction);
}

// Função para iniciar o carrossel automaticamente
function startCarousel() {
    setInterval(() => {
        moveCarousel(1);
    }, 5000); // Muda de imagem a cada 3 segundos
}

// Inicia o carrossel exibindo a primeira imagem
showSlide(currentSlide);
startCarousel();
