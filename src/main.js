document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('sliderTrack');
  const items = document.querySelectorAll('.slider-item');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentPosition = 0;
  let itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
  let visibleItems = window.innerWidth < 768 ? 1 : 2;
  let autoSlideInterval;

  function updateSliderValues() {
    itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
    visibleItems = window.innerWidth < 768 ? 1 : 2;
    moveSlider();
  }

  function initSlider() {
    updateSliderValues();
    startAutoSlide();
  }

  function moveSlider() {
    const maxPosition = Math.max(0, (items.length - visibleItems) * itemWidth);
    currentPosition = Math.min(Math.max(currentPosition, 0), maxPosition);
    
    track.style.transform = `translateX(-${currentPosition}px)`;
  }

  function nextSlide() {
    const maxPosition = Math.max(0, (items.length - visibleItems) * itemWidth);
    
    if (currentPosition < maxPosition) {
      currentPosition += itemWidth;
    } else {
      currentPosition = 0;
    }
    
    moveSlider();
    resetAutoSlide();
  }

  function prevSlide() {
    if (currentPosition > 0) {
      currentPosition -= itemWidth;
    } else {
      const maxPosition = Math.max(0, (items.length - visibleItems) * itemWidth);
      currentPosition = maxPosition;
    }
    
    moveSlider();
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 20000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  window.addEventListener('resize', function() {
    updateSliderValues();
  });
  
  initSlider();
})


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});