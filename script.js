// ----------- LÓGICA DE CONTRASEÑA -----------
const PASSWORD = "100125";
let enteredPassword = "";

// Elementos de la pantalla de contraseña
const passwordScreen = document.getElementById("password-screen");
const passwordDisplay = document.getElementById("password-display");
const passwordError = document.getElementById("password-error");
const keys = document.querySelectorAll(".key[data-number]");
const clearBtn = document.getElementById("btn-clear");
const deleteBtn = document.getElementById("btn-delete");

// Función para actualizar la visualización de la contraseña
function updatePasswordDisplay() {
  let displayText = "";
  for (let i = 0; i < 6; i++) {
    if (i < enteredPassword.length) {
      displayText += enteredPassword[i];
    } else {
      displayText += "•";
    }
  }
  passwordDisplay.textContent = displayText;
}

// Función para verificar la contraseña
function checkPassword() {
  if (enteredPassword === PASSWORD) {
    // Contraseña correcta, mostrar pantalla inicial
    passwordScreen.style.display = "none";
    document.getElementById("inicio").style.display = "flex";
  } else {
    // Contraseña incorrecta
    passwordError.textContent = "Contraseña incorrecta. Intenta de nuevo.";
    enteredPassword = "";
    updatePasswordDisplay();
  }
}

// Event listeners para los botones numéricos
keys.forEach(key => {
  key.addEventListener("click", () => {
    if (enteredPassword.length < 6) {
      enteredPassword += key.getAttribute("data-number");
      updatePasswordDisplay();
      
      // Verificar automáticamente cuando se ingresen 6 dígitos
      if (enteredPassword.length === 6) {
        setTimeout(checkPassword, 300);
      }
    }
  });
});

// Botón para limpiar toda la contraseña
clearBtn.addEventListener("click", () => {
  enteredPassword = "";
  updatePasswordDisplay();
  passwordError.textContent = "";
});

// Botón para borrar el último dígito
deleteBtn.addEventListener("click", () => {
  if (enteredPassword.length > 0) {
    enteredPassword = enteredPassword.slice(0, -1);
    updatePasswordDisplay();
    passwordError.textContent = "";
  }
});

// ----------- CONFIGURA AQUÍ TU FECHA DE INICIO -----------
const fechaInicio = new Date("2025-01-10T00:00:00");

// ----------- NAVEGACIÓN ENTRE PANTALLAS -----------
document.getElementById("btnDiasJuntos").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("main").style.display = "flex";
  // Scroll al inicio cuando cambiamos de pantalla
  window.scrollTo(0, 0);
  generarHojas();
  iniciarContador();
});

document.getElementById("btnGaleria").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("galeria").style.display = "flex";
  // Scroll al inicio cuando cambiamos de pantalla
  window.scrollTo(0, 0);
});

document.getElementById("btnVolverMain").addEventListener("click", () => {
  document.getElementById("main").style.display = "none";
  document.getElementById("inicio").style.display = "flex";
  // Scroll al inicio cuando cambiamos de pantalla
  window.scrollTo(0, 0);
});

document.getElementById("btnVolverGaleria").addEventListener("click", () => {
  document.getElementById("galeria").style.display = "none";
  document.getElementById("inicio").style.display = "flex";
  // Scroll al inicio cuando cambiamos de pantalla
  window.scrollTo(0, 0);
});

// ----------- GENERAR HOJAS EN FORMA DE CORAZÓN -----------
function generarHojas() {
  const arbol = document.getElementById("arbol");
  const hoy = new Date();
  const dias = Math.floor((hoy - fechaInicio) / (1000 * 60 * 60 * 24));

  // Paleta de colores personalizada con tus colores
  const coloresRojos = [
    "#900020", // Burgundy
    "#89171F", // Carmesí
    "#7E112E", // Rojo Vino
    "#B4182D", // Rojo vibrante
    "#54162B"  // Rojo oscuro
  ];
  
  const coloresAzules = [
    "#181A2F", // Azul oscuro
    "#242E49", // Azul medio
    "#37415C"  // Azul claro
  ];

  for (let i = 0; i < dias; i++) {
    const hoja = document.createElement("div");
    hoja.classList.add("hoja-corazon");
    hoja.style.left = (Math.random() * 80 + 10) + "%";
    hoja.style.bottom = (Math.random() * 250 + 150) + "px";
    
    // Alternar entre colores rojos y azules (70% rojos, 30% azules)
    let colorAleatorio;
    if (Math.random() < 0.7) {
      colorAleatorio = coloresRojos[Math.floor(Math.random() * coloresRojos.length)];
    } else {
      colorAleatorio = coloresAzules[Math.floor(Math.random() * coloresAzules.length)];
    }
    
    hoja.style.backgroundColor = colorAleatorio;
    hoja.style.animationDelay = (Math.random() * 2) + "s";
    hoja.style.transform += ` rotate(${Math.random() * 360}deg)`;
    arbol.appendChild(hoja);
  }

  // Actualizar contador de corazones
  actualizarContadorCorazones(dias);
}

// ----------- CONTADOR DE CORAZONES -----------
function actualizarContadorCorazones(numCorazones) {
  const contadorCorazones = document.getElementById("contadorCorazones");
  contadorCorazones.innerHTML = `
    <p>Nuestro árbol tiene <b>${numCorazones}</b> corazones, uno por cada día que hemos estado juntos ❤️</p>
  `;
}

// ----------- CONTADOR TIEMPO REAL -----------
function iniciarContador() {
  const cont = document.getElementById("contador");

  function actualizarContador() {
    const ahora = new Date();
    let diff = ahora - fechaInicio;

    let segundos = Math.floor(diff / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    const años = Math.floor(dias / 365);
    const meses = Math.floor((dias % 365) / 30);
    dias = dias % 30;
    horas = horas % 24;
    minutos = minutos % 60;
    segundos = segundos % 60;

    cont.innerHTML = `
      <p>Llevamos <b>${años}</b> años, <b>${meses}</b> meses, 
      <b>${dias}</b> días, <b>${horas}</b> horas, 
      <b>${minutos}</b> minutos y <b>${segundos}</b> segundos juntos </p>
    `;
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
}