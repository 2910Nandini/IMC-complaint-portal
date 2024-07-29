document.addEventListener("DOMContentLoaded", function() {
    let backgroundSlides = document.querySelectorAll('.background-slideshow .slide');
    let currentBackgroundSlide = 0;
    let sliderSlides = document.querySelectorAll('.slider .slide');
    let currentSliderSlide = 0;

    function changeBackgroundSlide() {
        backgroundSlides[currentBackgroundSlide].style.opacity = 0;
        currentBackgroundSlide = (currentBackgroundSlide + 1) % backgroundSlides.length;
        backgroundSlides[currentBackgroundSlide].style.opacity = 1;
    }

    function changeSliderSlide() {
        sliderSlides[currentSliderSlide].style.display = 'none';
        currentSliderSlide = (currentSliderSlide + 1) % sliderSlides.length;
        sliderSlides[currentSliderSlide].style.display = 'block';
    }

    setInterval(changeBackgroundSlide, 3000);
    setInterval(changeSliderSlide, 2000);

    // Initialize the first slide
    backgroundSlides[currentBackgroundSlide].style.opacity = 1;
    sliderSlides[currentSliderSlide].style.display = 'block';
});