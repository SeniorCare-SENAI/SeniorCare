document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll('.carouselCards');
    const totalItems = carouselItems.length;
    const intervalTime = 5000; // Tempo em milissegundos (5 segundos)

    function showNextItem() {
        carouselItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalItems;
        carouselItems[currentIndex].classList.add('active');
    }

    // Inicializa o carrossel mostrando o primeiro item
    carouselItems[currentIndex].classList.add('active');
    
    // Configura o intervalo para alternar os itens
    setInterval(showNextItem, intervalTime);
});
