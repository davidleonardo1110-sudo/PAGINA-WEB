document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menu    = document.getElementById('menu');

  if (!menuBtn || !menu) {
    console.warn("No encontré el menú o el botón");
    return;
  }

  console.log("Hamburguesa lista ✅");

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('show');
  });
});
