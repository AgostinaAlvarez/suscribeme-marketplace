// highlightsSlider.js
// Controla la navegación y animación del slider de highlights en index.astro

document.addEventListener('DOMContentLoaded', function () {
  const slide1 = document.querySelector('.highlights-slide-1');
  const slide2 = document.querySelector('.highlights-slide-2');
  const prevBtn = document.getElementById('highlights-prev');
  const nextBtn = document.getElementById('highlights-next');

  let currentSlide = 1;

  // Transición suave para highlights (fade + slide)
  function showSlide(slideNum) {
    if (slideNum === 1) {
      slide2.style.transition =
        'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      slide2.style.opacity = 0;
      slide2.style.transform = 'translateX(40px)';
      setTimeout(() => {
        slide2.style.display = 'none';
        slide1.style.display = '';
        slide1.style.opacity = 0;
        slide1.style.transform = 'translateX(-40px)';
        setTimeout(() => {
          slide1.style.transition =
            'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)';
          slide1.style.opacity = 1;
          slide1.style.transform = 'translateX(0)';
        }, 10);
      }, 500);
      prevBtn.disabled = true;
      nextBtn.disabled = false;
    } else {
      slide1.style.transition =
        'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      slide1.style.opacity = 0;
      slide1.style.transform = 'translateX(-40px)';
      setTimeout(() => {
        slide1.style.display = 'none';
        slide2.style.display = '';
        slide2.style.opacity = 0;
        slide2.style.transform = 'translateX(40px)';
        setTimeout(() => {
          slide2.style.transition =
            'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)';
          slide2.style.opacity = 1;
          slide2.style.transform = 'translateX(0)';
        }, 10);
      }, 500);
      prevBtn.disabled = false;
      nextBtn.disabled = true;
    }
    currentSlide = slideNum;
  }

  prevBtn.addEventListener('click', function () {
    if (currentSlide === 2) {
      showSlide(1);
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentSlide === 1) {
      showSlide(2);
    }
  });

  // Opcional: animación simple (fade)
  function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = '';
    let op = 0;
    const timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      op += 0.1;
    }, 20);
  }

  function fadeOut(element) {
    let op = 1;
    const timer = setInterval(function () {
      if (op <= 0) {
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = op;
      op -= 0.1;
    }, 20);
  }

  // Si quieres usar fade, reemplaza showSlide por:
  // function showSlide(slideNum) {
  //   if (slideNum === 1) {
  //     fadeIn(slide1);
  //     fadeOut(slide2);
  //     prevBtn.disabled = true;
  //     nextBtn.disabled = false;
  //   } else {
  //     fadeOut(slide1);
  //     fadeIn(slide2);
  //     prevBtn.disabled = false;
  //     nextBtn.disabled = true;
  //   }
  //   currentSlide = slideNum;
  // }

  // Inicializa en el primer slide con transición
  slide1.style.opacity = 1;
  slide1.style.transform = 'translateX(0)';
  slide2.style.opacity = 0;
  slide2.style.transform = 'translateX(40px)';
  slide2.style.display = 'none';
});
