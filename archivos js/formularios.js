// js/formulario.js

// Capturar el formulario
const form = document.getElementById("formContacto");
const respuesta = document.getElementById("respuesta");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // evita que recargue la página

  // Obtener valores
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  // Validación sencilla
  if(nombre && email && mensaje) {
    respuesta.innerHTML = `<span style="color:green;">¡Gracias ${nombre}, tu mensaje fue enviado!</span>`;
    form.reset(); // limpia el formulario
  } else {
    respuesta.innerHTML = `<span style="color:red;">Por favor completa todos los campos.</span>`;
  }
});
