document.addEventListener('DOMContentLoaded', function() {
    function showContent(developer) {
        let bryan = document.querySelector('.bryan');
        let matheus = document.querySelector('.matheus');
        let vinicius = document.querySelector('.vinicius');
        let julian = document.querySelector('.julian');
        
        let devImages = document.querySelectorAll('.about-devs-img');
        devImages.forEach(img => img.classList.add('reduced-opacity'));

        bryan.classList.remove('active');
        matheus.classList.remove('active');
        vinicius.classList.remove('active');
        julian.classList.remove('active');

        document.querySelector(`.${developer}`).classList.add('active');

        let activeImage = document.querySelector(`button[onclick="showContent('${developer}')"] .about-devs-img`);
        if (activeImage) {
            activeImage.classList.remove('reduced-opacity');
        }
    }

    window.showContent = showContent;
});
