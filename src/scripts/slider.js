document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.slider .list');
  const items = document.querySelectorAll('.slider .item');
  const dots = document.querySelectorAll('.slider .dots li');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  let active = 0;
  const length = items.length - 1;

  function reload() {
    const offset = items[active].offsetLeft;
    list.style.left = `-${offset}px`;

    document.querySelector('.dots li.active')?.classList.remove('active');
    dots[active].classList.add('active');
  }

  next.onclick = () => {
    active = active + 1 > length ? 0 : active + 1;
    reload();
  };

  prev.onclick = () => {
    active = active - 1 < 0 ? length : active - 1;
    reload();
  };

  dots.forEach((dot, index) => {
    dot.onclick = () => {
      active = index;
      reload();
    };
  });

  // Cambio automático de slide cada 4 segundos
  setInterval(() => {
    next.onclick();
  }, 6000);
});
