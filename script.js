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

// ----------- SOPORTE PARA TECLADO FÍSICO -----------
document.addEventListener('keydown', function(event) {
  // Solo procesar teclas si la pantalla de contraseña está visible
  if (passwordScreen.style.display !== 'none') {
    const key = event.key;
    
    // Si es un número entre 0-9
    if (/^[0-9]$/.test(key)) {
      if (enteredPassword.length < 6) {
        enteredPassword += key;
        updatePasswordDisplay();
        
        // Verificar automáticamente cuando se ingresen 6 dígitos
        if (enteredPassword.length === 6) {
          setTimeout(checkPassword, 300);
        }
      }
    } 
    // Si es Backspace o Delete
    else if (key === 'Backspace' || key === 'Delete') {
      if (enteredPassword.length > 0) {
        enteredPassword = enteredPassword.slice(0, -1);
        updatePasswordDisplay();
        passwordError.textContent = "";
      }
      event.preventDefault(); // Prevenir navegación hacia atrás en algunos navegadores
    }
    // Si es Escape
    else if (key === 'Escape') {
      enteredPassword = "";
      updatePasswordDisplay();
      passwordError.textContent = "";
    }
    // Si es Enter y ya hay 6 dígitos
    else if (key === 'Enter' && enteredPassword.length === 6) {
      checkPassword();
    }
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

document.getElementById("btnMusica").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("musica").style.display = "flex";
  window.scrollTo(0, 0);
  generarPlaylists();
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

document.getElementById("btnVolverMusica").addEventListener("click", () => {
  document.getElementById("musica").style.display = "none";
  document.getElementById("inicio").style.display = "flex";
  window.scrollTo(0, 0);
});  

// ----------- CONFIGURACIÓN DINÁMICA DE LA GALERÍA -----------
function configurarGaleria() {
  const galeriaFotos = document.querySelector('.galeria-fotos');
  if (!galeriaFotos) return;

  const imagenes = galeriaFotos.querySelectorAll('img');
  const totalImagenes = imagenes.length;
  
  // Calcular duración basada en el número de imágenes (2 segundos por imagen)
  const duracionTotal = totalImagenes * 2;
  galeriaFotos.style.setProperty('--d', `${duracionTotal}s`);

  // Configurar delays y rotaciones para cada imagen
  imagenes.forEach((img, index) => {
    const delay = -index * (1 / totalImagenes);
    const rotacion = (Math.random() * 30) - 15; // Rotación entre -15 y 15 grados
    
    img.style.animationDelay = `calc(${delay} * var(--d))`;
    img.style.setProperty('--r', `${rotacion}deg`);
  });

  // Actualizar keyframes para el número específico de imágenes
  actualizarKeyframesGaleria(totalImagenes);
}

function actualizarKeyframesGaleria(totalImagenes) {
  const porcentajeVisible = 100 / totalImagenes;
  const porcentajeTransicion = porcentajeVisible / 2;

  // Crear o actualizar los keyframes
  const style = document.createElement('style');
  style.id = 'galeria-keyframes';
  
  style.textContent = `
    @keyframes slide {
      ${porcentajeTransicion}% { transform: translateX(120%) rotate(var(--r)); }
      0%, 100%, ${porcentajeVisible}% { transform: translateX(0%) rotate(var(--r)); }
    }
    
    @keyframes z-order {
      ${porcentajeTransicion}%, ${porcentajeVisible}% { z-index: 1; }
      ${100 - porcentajeVisible}% { z-index: 2; }
    }
    
    @keyframes z-order-last {
      ${porcentajeTransicion}%, ${porcentajeVisible}% { z-index: 1; }
      ${100 - porcentajeVisible/2}% { z-index: 2; }
    }
  `;

  // Eliminar keyframes anteriores si existen
  const existingStyle = document.getElementById('galeria-keyframes');
  if (existingStyle) {
    existingStyle.remove();
  }

  document.head.appendChild(style);
}

// Llamar a la función cuando se muestre la galería
document.getElementById("btnGaleria").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("galeria").style.display = "flex";
  window.scrollTo(0, 0);
  configurarGaleria(); // Configurar la galería dinámicamente
});

// ----------- GENERAR PLAYLSITS -----------
function generarPlaylists() {
  const playlistsGrid = document.querySelector('.playlists-grid');
  playlistsGrid.innerHTML = ''; // Limpiar contenedor

  const playlists = [
    { nombre: "❤️S.S.S.O💙", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ-AhYRZkZtKbDs4GijgCgro&si=Rgb5NjFZhVRIjIJw" },
    { nombre: "MORAT'S HYPELIST", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ_t8wJLLsXeEOl3-OCC0TvG&si=-w5A7f0m8cp0HeCM" },
    { nombre: "🛫🇩🇪🛬🇨🇴", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ_NFuyNMEWDqiO_-OawZWkJ&si=a1BlIF6yWIM4wVLW" },
    { nombre: "Para llegar a Corea, solo hay que cruzar un charco", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ-wAIIYJDduJkdrVnQX1Jq5&si=Ud63yKaeAUxdd6Di" },
    { nombre: "🙈💙", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ_MhZBpn4XvRNiOGzwPxCWD&si=MtsB7Cyuv9_7gngU" },
    { nombre: "Te Amo ❤️ - S & A", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ-GJjZQVf-O9LugvMYJhiiV&si=hTqXhusvyi4ylVcJ" },
    { nombre: "Sánchez 💙", url: "https://youtube.com/playlist?list=PL7n_yR2Ilv0LdpOLsva3fUQQMLHpNdDqd&si=IV8irA9np1VaEAU6" },
    { nombre: "OUR PLAYLIST Vol. 1 ❣️", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ_poppJuZJgq_s2BG9LccB4&si=lOq5LYUhgh71CKtS" },
    { nombre: "CTG 2025 🏖", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ9407ruogXst3ICspDRTP0n&si=zndNO-gdQOzyqtCl" },
    { nombre: "OUR LOVE 👩🏻‍❤️‍💋‍👨🏻❤️", url: "https://youtube.com/playlist?list=PL_TrjGm6kOQ-1YwhVZyOiVgUmklH8mqQa&si=2GoNoivNY7eW-yG8" }
  ];

  playlists.forEach((playlist, index) => {
    const playlistBtn = document.createElement('button');
    playlistBtn.className = 'playlist-btn';
    playlistBtn.textContent = playlist.nombre;
    
    // Agregar evento para abrir en nueva pestaña
    playlistBtn.addEventListener('click', () => {
      window.open(playlist.url, '_blank');
    });
    
    playlistsGrid.appendChild(playlistBtn);
  });
}

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
    <p>Nuestro árbol tiene <b>${numCorazones}</b> corazones, uno por cada día que hemos estado juntos</p>
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

    // Crear array con las partes del tiempo que no son cero
    const partesTiempo = [];
    
    if (años > 0) {
      partesTiempo.push(`<b>${años}</b> año${años > 1 ? 's' : ''}`);
    }
    if (meses > 0) {
      partesTiempo.push(`<b>${meses}</b> mes${meses > 1 ? 'es' : ''}`);
    }
    if (dias > 0) {
      partesTiempo.push(`<b>${dias}</b> día${dias > 1 ? 's' : ''}`);
    }
    if (horas > 0) {
      partesTiempo.push(`<b>${horas}</b> hora${horas > 1 ? 's' : ''}`);
    }
    if (minutos > 0) {
      partesTiempo.push(`<b>${minutos}</b> minuto${minutos > 1 ? 's' : ''}`);
    }
    if (segundos > 0) {
      partesTiempo.push(`<b>${segundos}</b> segundo${segundos > 1 ? 's' : ''}`);
    }

    // Si no hay ninguna parte (menos de 1 segundo), mostrar solo segundos
    if (partesTiempo.length === 0) {
      partesTiempo.push(`<b>0</b> segundos`);
    }

    // Formatear el texto final
    let textoFinal = '';
    if (partesTiempo.length === 1) {
      textoFinal = `Llevamos ${partesTiempo[0]} juntos`;
    } else if (partesTiempo.length === 2) {
      textoFinal = `Llevamos ${partesTiempo[0]} y ${partesTiempo[1]} juntos`;
    } else {
      // Para 3 o más elementos, unir todos con comas y "y" antes del último
      const ultimaParte = partesTiempo.pop();
      textoFinal = `Llevamos ${partesTiempo.join(', ')} y ${ultimaParte} juntos`;
    }

    cont.innerHTML = `<p>${textoFinal}</p>`;
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
}