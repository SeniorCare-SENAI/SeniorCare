// Código importado

let lastScrollTop = 0;
const header = document.getElementById('header')

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        header.style.opacity = '0.3';
    } else if (currentScroll < lastScrollTop) {
        header.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
})

header.addEventListener('mouseenter', function() {
    header.style.opacity = '1';
})

header.addEventListener('mouseleave', function() {
    if (window.pageYOffset <= 0) {
        header.style.opacity = '1';
    }
})