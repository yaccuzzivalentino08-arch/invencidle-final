// frase.js
// Lógica del modo "Frase" de INVENCIDLE.
// Necesita que personajes.js y frases.js estén cargados antes que este archivo.
//
// Cómo se juega:
//   - Se muestra una frase de la serie.
//   - Hay que escribir el nombre del personaje que la dijo.
//   - Cada intento fallido queda listado en rojo debajo.
//   - Después de 3 intentos fallidos se muestra la temporada como pista.
//   - Después de 6 intentos fallidos se muestra la primera letra del nombre.
//   - Al acertar se revela la foto y el nombre completo del personaje.
//
// ---------- Dónde tocar si querés cambiar el "modo difícil" ----------
// Los números de intentos para las pistas están en la constante
// INTENTOS_PARA_PISTA_TEMPORADA e INTENTOS_PARA_PISTA_INICIAL, un poco
// más abajo. Cambiá esos números si querés que las pistas aparezcan
// antes o después.

// ---------- Elementos del DOM ----------
const textoFrase = document.getElementById("texto-frase");
const inputPersonajeFrase = document.getElementById("input-personaje-frase");
const listaSugerenciasFrase = document.getElementById("lista-sugerencias-frase");
const contadorIntentosFrase = document.getElementById("contador-intentos-frase");
const mensajeResultadoFrase = document.getElementById("mensaje-resultado-frase");
const listaIntentosFrase = document.getElementById("lista-intentos-frase");
const pistaFrase = document.getElementById("pista-frase");
const tarjetaPersonaje = document.getElementById("tarjeta-personaje");

// ---------- Configuración de pistas ----------
// Cambiá estos dos números para que las pistas salgan antes/después.
const INTENTOS_PARA_PISTA_TEMPORADA = 3;
const INTENTOS_PARA_PISTA_INICIAL = 5;

// ---------- Estado del juego ----------
let intentosFrase = 0;
let juegoTerminadoFrase = false;
const nombresYaUsadosFrase = new Set();

// ---------- Elegir la frase del día ----------
// La frase sale en orden ALEATORIO (ver aleatorio.js), pero es la misma
// para todos los que jueguen ese día. Usa una semilla distinta a la del
// modo Clásico para que los dos modos no estén sincronizados.
function obtenerFraseDelDia() {
  return elegirDelDia(frases, "frase", new Date(2026, 0, 1));
}

const fraseSecreta = obtenerFraseDelDia();

// Busca los datos completos (foto, etc) del personaje de personajes.js
// a partir del nombre guardado en frases.js.
function buscarPersonajePorNombre(nombre) {
  return personajes.find(p => p.nombre === nombre);
}

const personajeSecretoFrase = buscarPersonajePorNombre(fraseSecreta.personaje);

// Lista de personajes que se pueden adivinar en este modo: solo los que
// tienen al menos una frase cargada en frases.js (si no, sería injusto
// poder "acertar" un personaje que ni siquiera tiene cita).
const nombresConFrase = [...new Set(frases.map(f => f.personaje))];

// ---------- Mostrar la frase en pantalla ----------
// ---------- Idioma de la frase (bandera al lado del título) ----------
// Al iniciar se muestra la frase original en inglés (bandera de EE.UU.).
// Al tocar la bandera cambia a español (bandera de México), y al volver a tocar, a inglés.
const botonIdioma = document.getElementById("boton-idioma");
const banderaIdioma = document.getElementById("bandera-idioma");
let idiomaFrase = "en";

function mostrarFrase() {
  const textoEs = fraseSecreta.frase_es || fraseSecreta.frase;   // si falta la traducción, queda la original
  const texto = idiomaFrase === "es" ? textoEs : fraseSecreta.frase;
  textoFrase.textContent = `"${texto}"`;
  textoFrase.lang = idiomaFrase;

  if (idiomaFrase === "es") {
    banderaIdioma.src = "../imagenes/banderas/mx.svg";
    banderaIdioma.alt = "Bandera de México";
    botonIdioma.setAttribute("aria-label", "Cambiar idioma de la frase: ahora en español");
  } else {
    banderaIdioma.src = "../imagenes/banderas/us.svg";
    banderaIdioma.alt = "Bandera de Estados Unidos";
    botonIdioma.setAttribute("aria-label", "Cambiar idioma de la frase: ahora en inglés");
  }
}

botonIdioma.addEventListener("click", () => {
  idiomaFrase = idiomaFrase === "en" ? "es" : "en";
  mostrarFrase();
});

mostrarFrase();

// ---------- Utilidades ----------
function normalizarFrase(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // saca tildes para comparar mejor
}

// ---------- Autocompletado ----------
inputPersonajeFrase.addEventListener("input", () => {
  const valor = normalizarFrase(inputPersonajeFrase.value.trim());
  listaSugerenciasFrase.innerHTML = "";

  if (!valor || juegoTerminadoFrase) {
    listaSugerenciasFrase.classList.remove("activa");
    return;
  }

  const coincidencias = nombresConFrase.filter(nombre =>
    normalizarFrase(nombre).includes(valor) && !nombresYaUsadosFrase.has(nombre)
  );

  if (coincidencias.length === 0) {
    listaSugerenciasFrase.classList.remove("activa");
    return;
  }

  coincidencias.forEach(nombre => {
    const personaje = buscarPersonajePorNombre(nombre);
    const item = document.createElement("li");
    item.dataset.nombre = nombre;   // <-- nueva

    const foto = document.createElement("img");
    foto.src = (personaje && personaje.foto) || "../imagenes/personajes/placeholder.svg";
    foto.alt = nombre;
    foto.className = "foto-sugerencia";
    foto.onerror = () => { foto.src = "../imagenes/personajes/placeholder.svg"; };
    item.appendChild(foto);

    const texto = document.createElement("span");
    texto.textContent = nombre;
    item.appendChild(texto);

    item.addEventListener("click", () => {
      realizarIntentoFrase(nombre);
      inputPersonajeFrase.value = "";
      listaSugerenciasFrase.innerHTML = "";
      listaSugerenciasFrase.classList.remove("activa");
    });
    listaSugerenciasFrase.appendChild(item);
  });

  listaSugerenciasFrase.classList.add("activa");
});

/// Enter: elige la sugerencia resaltada (con ⬆️/⬇️) o, si no hay, la primera.
let sugerenciaActivaFrase = -1;

function resaltarSugerenciaFrase(indice) {
  const items = listaSugerenciasFrase.querySelectorAll("li");
  items.forEach(li => li.classList.remove("seleccionada"));
  if (indice >= 0 && indice < items.length) {
    items[indice].classList.add("seleccionada");
    items[indice].scrollIntoView({ block: "nearest" });
  }
  sugerenciaActivaFrase = indice;
}

inputPersonajeFrase.addEventListener("input", () => { sugerenciaActivaFrase = -1; });

inputPersonajeFrase.addEventListener("keydown", (evento) => {
  const items = listaSugerenciasFrase.querySelectorAll("li");

  if (evento.key === "ArrowDown" && items.length) {
    evento.preventDefault();
    resaltarSugerenciaFrase((sugerenciaActivaFrase + 1) % items.length);
    return;
  }
  if (evento.key === "ArrowUp" && items.length) {
    evento.preventDefault();
    resaltarSugerenciaFrase((sugerenciaActivaFrase - 1 + items.length) % items.length);
    return;
  }
  if (evento.key !== "Enter") return;
  evento.preventDefault();

  let nombre = null;
  if (sugerenciaActivaFrase >= 0 && items[sugerenciaActivaFrase]) {
    nombre = items[sugerenciaActivaFrase].dataset.nombre;
  } else if (items.length) {
    nombre = items[0].dataset.nombre;
  } else {
    const valor = normalizarFrase(inputPersonajeFrase.value.trim());
    nombre = nombresConFrase.find(n => normalizarFrase(n) === valor) || null;
  }

  if (nombre) {
    realizarIntentoFrase(nombre);
    inputPersonajeFrase.value = "";
    listaSugerenciasFrase.innerHTML = "";
    listaSugerenciasFrase.classList.remove("activa");
    sugerenciaActivaFrase = -1;
  }
});

// Cierra la lista de sugerencias si se hace clic afuera
document.addEventListener("click", (evento) => {
  if (evento.target !== inputPersonajeFrase) {
    listaSugerenciasFrase.classList.remove("activa");
  }
});

// ---------- Lógica del intento ----------
function realizarIntentoFrase(nombre) {
  if (juegoTerminadoFrase) return;
  if (!nombresConFrase.includes(nombre) || nombresYaUsadosFrase.has(nombre)) return;

  nombresYaUsadosFrase.add(nombre);
  intentosFrase++;
  contadorIntentosFrase.textContent = `Intentos: ${intentosFrase}`;

  if (nombre === fraseSecreta.personaje) {
    terminarJuegoFrase(true);
    return;
  }

  agregarIntentoFallido(nombre);
  actualizarPista();
}

// ---------- Mostrar un intento fallido en la lista ----------
function agregarIntentoFallido(nombre) {
  const item = document.createElement("li");
  item.className = "intento-incorrecto";

  const personaje = buscarPersonajePorNombre(nombre);
  const foto = document.createElement("img");
  foto.src = (personaje && personaje.foto) || "../imagenes/personajes/placeholder.svg";
  foto.alt = nombre;
  foto.className = "foto-personaje";
  foto.onerror = () => { foto.src = "../imagenes/personajes/placeholder.svg"; };
  item.appendChild(foto);

  const texto = document.createElement("span");
  texto.textContent = nombre;
  item.appendChild(texto);

  const cruz = document.createElement("span");
  cruz.className = "cruz-incorrecto";
  cruz.textContent = "✗";
  item.appendChild(cruz);

  listaIntentosFrase.insertBefore(item, listaIntentosFrase.firstChild);
}

// ---------- Pistas progresivas ----------
function actualizarPista() {
  if (intentosFrase >= INTENTOS_PARA_PISTA_INICIAL) {
    pistaFrase.textContent =
      `Pista: el nombre empieza con "${fraseSecreta.personaje.charAt(0)}" (Temporada ${fraseSecreta.temporada})`;
  } else if (intentosFrase >= INTENTOS_PARA_PISTA_TEMPORADA) {
    pistaFrase.textContent = `Pista: esta frase es de la Temporada ${fraseSecreta.temporada}`;
  }
}

// ---------- Fin del juego ----------
function terminarJuegoFrase(gano) {
  juegoTerminadoFrase = true;
  inputPersonajeFrase.disabled = true;

  if (gano) {
    mensajeResultadoFrase.textContent =
      `¡Correcto! La frase era de ${fraseSecreta.personaje}. Lo lograste en ${intentosFrase} intento${intentosFrase === 1 ? "" : "s"}.`;
    mensajeResultadoFrase.className = "resultado-ganaste-frase";

    // Suma a la racha del jugador (si tiene sesión iniciada)
    // En modo libre no se suma racha (solo cuenta el reto diario)
    if (window.registrarVictoria && !(window.modoLibre && window.modoLibre.activo())) window.registrarVictoria("frase");
  }

  // Revela la tarjeta con la foto del personaje, tanto si acertó
  // como si no (en este modo no hay límite de intentos, así que
  // esto solo se ejecuta cuando gana, pero queda preparado por si
  // en el futuro se agrega un límite de intentos).
  if (personajeSecretoFrase) {
    const foto = document.createElement("img");
    foto.src = personajeSecretoFrase.foto || "../imagenes/personajes/placeholder.svg";
    foto.alt = personajeSecretoFrase.nombre;
    foto.onerror = () => { foto.src = "../imagenes/personajes/placeholder.svg"; };

    const nombre = document.createElement("p");
    nombre.textContent = personajeSecretoFrase.nombre;

    tarjetaPersonaje.innerHTML = "";
    tarjetaPersonaje.appendChild(foto);
    tarjetaPersonaje.appendChild(nombre);
    tarjetaPersonaje.classList.add("visible");
  }
}
