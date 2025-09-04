document.addEventListener('DOMContentLoaded', function () {
  const scrollContainer = document.getElementById('scrollContainer');
  const sections = Array.from(document.querySelectorAll('#scrollContainer > section')); // solo secciones de primer nivel
  const dots = document.querySelectorAll('.scroll-dot');
  const sectionIds = sections.map(s => s.id); // ['inicio','sobre-mi','proyectos','contacto']

  // --- Actualizar punto activo ---
  function updateActiveDot() {
    const scrollTop = scrollContainer.scrollTop;
    let current = 0;
    sections.forEach((sec, i) => {
      const top = sec.offsetTop - scrollContainer.offsetTop;
      if (scrollTop >= top - 1) current = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // --- Scroll hacia una sección dentro del contenedor ---
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const y = section.offsetTop - scrollContainer.offsetTop;
    scrollContainer.scrollTo({ top: y, behavior: 'smooth' });
  }

  // --- Click en los puntos ---
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      scrollToSection(sectionIds[index]);
    });
  });

  // --- Evento de scroll para actualizar punto activo ---
  scrollContainer.addEventListener('scroll', updateActiveDot);

  // --- Animación de entrada para las secciones ---
  const observerOptions = {
    root: scrollContainer, // <- IMPORTANTE
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // --- Navegación con teclado ---
  document.addEventListener('keydown', (e) => {
    const currentScrollTop = scrollContainer.scrollTop;
    const windowHeight = scrollContainer.clientHeight;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollContainer.scrollTo({
        top: currentScrollTop + windowHeight,
        behavior: 'smooth'
      });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollContainer.scrollTo({
        top: currentScrollTop - windowHeight,
        behavior: 'smooth'
      });
    }
  });

  // --- Navegación con rueda del mouse ---
  let isScrolling = false;
  scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return;

    isScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    const currentScrollTop = scrollContainer.scrollTop;
    const windowHeight = scrollContainer.clientHeight;

    scrollContainer.scrollTo({
      top: currentScrollTop + (direction * windowHeight),
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const sections = Array.from(document.querySelectorAll('section'));

  const observerOptions = {
    root: null, // usamos el viewport entero
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
