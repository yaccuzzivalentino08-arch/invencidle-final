// clasico.js
// Lógica del modo "Clásico" de INVENCIDLE.
// Necesita que personajes.js esté cargado antes que este archivo.
//
// Reglas (según la página "¿Cómo se juega?"):
//   - Verde  -> coincidencia exacta
//   - Naranja -> coincidencia parcial
//   - Rojo   -> no hay coincidencia
//   - ⬆️ / ⬇️ -> en atributos numéricos, indica si el valor correcto
//               está por encima o por debajo de lo que ingresaste.

// ---------- Elementos del DOM ----------
const inputPersonaje = document.getElementById("input-personaje");
const listaSugerencias = document.getElementById("lista-sugerencias");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const contadorIntentos = document.getElementById("contador-intentos");
const mensajeResultado = document.getElementById("mensaje-resultado");
const cajaPista = document.getElementById("caja-pista");
const textoPista = document.getElementById("texto-pista");
const coloresPista = document.getElementById("colores-pista");
const botonSiguiente = document.getElementById("boton-siguiente");

// Cantidad de intentos que hay que hacer para poder usar la pista de colores.
const INTENTOS_PARA_PISTA = 5;

// ---------- Estado del juego ----------
let intentos = 0;
let juegoTerminado = false;
const nombresYaUsados = new Set();

// Columnas en el mismo orden que en "¿Cómo se juega?"
// tipo:
//   "texto"     -> coincide o no coincide (Género, Planeta, Pelo)
//   "especie"   -> coincide, o parcial si comparten palabra (ej. "Viltrumita")
//   "numero"    -> exacto, parcial si está cerca, y flecha si no acierta
//   "lista"     -> exacto si el conjunto es igual, parcial si se solapa (Habilidades)
const atributos = [
  { clave: "genero", etiqueta: "Género", tipo: "texto" },
  { clave: "especie", etiqueta: "Especie", tipo: "especie" },
  { clave: "planeta", etiqueta: "Planeta de origen", tipo: "texto" },
  { clave: "edad", etiqueta: "Edad", tipo: "numero", margenParcial: 5 },
  { clave: "altura", etiqueta: "Altura", tipo: "numero", margenParcial: 10, sufijo: " cm" },
  { clave: "pelo", etiqueta: "Pelo", tipo: "texto" },
  { clave: "habilidades", etiqueta: "Habilidades", tipo: "lista" },
  { clave: "temporada", etiqueta: "Temporada", tipo: "numero", margenParcial: 0 }
];

// ---------- Elegir el personaje del día ----------
// El personaje sale en orden ALEATORIO (ver aleatorio.js), pero es el mismo
// para todos los que jueguen ese día (como Wordle). No se repite ninguno
// hasta haber pasado por todos los personajes.
function obtenerPersonajeDelDia() {
  return elegirDelDia(personajes, "clasico", new Date(2026, 0, 1));
}

const personajeSecreto = obtenerPersonajeDelDia();

// ---------- Utilidades ----------
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // saca tildes para comparar mejor
}

const palabrasIgnoradas = new Set(["de", "del", "y", "la", "el", "los", "las"]);

function palabrasClave(texto) {
  return normalizar(texto)
    .replace(/[()]/g, " ")
    .split(/[^a-z0-9]+/)
    .filter(palabra => palabra.length > 2 && !palabrasIgnoradas.has(palabra));
}

// ---------- Autocompletado ----------
inputPersonaje.addEventListener("input", () => {
  const valor = normalizar(inputPersonaje.value.trim());
  listaSugerencias.innerHTML = "";

  if (!valor || juegoTerminado) {
    listaSugerencias.classList.remove("activa");
    return;
  }

  const coincidencias = personajes.filter(p =>
    normalizar(p.nombre).includes(valor) && !nombresYaUsados.has(p.nombre)
  );

  if (coincidencias.length === 0) {
    listaSugerencias.classList.remove("activa");
    return;
  }

  coincidencias.forEach(personaje => {
    const item = document.createElement("li");
    item.dataset.nombre = personaje.nombre;

    const foto = document.createElement("img");
    foto.src = personaje.foto || "../imagenes/personajes/placeholder.svg";
    foto.alt = personaje.nombre;
    foto.className = "foto-sugerencia";
    foto.onerror = () => { foto.src = "../imagenes/personajes/placeholder.svg"; };
    item.appendChild(foto);

    const texto = document.createElement("span");
    texto.textContent = personaje.nombre;
    item.appendChild(texto);

    item.addEventListener("click", () => {
      realizarIntento(personaje.nombre);
      inputPersonaje.value = "";
      listaSugerencias.innerHTML = "";
      listaSugerencias.classList.remove("activa");
    });
    listaSugerencias.appendChild(item);
  });

  listaSugerencias.classList.add("activa");
});

// Enter: elige el personaje resaltado (flechas ⬆️/⬇️) o, si no hay ninguno,
// el primero de la lista de sugerencias. Si el nombre está escrito completo, ese.
let sugerenciaActiva = -1;

function resaltarSugerencia(indice) {
  const items = listaSugerencias.querySelectorAll("li");
  items.forEach(li => li.classList.remove("seleccionada"));
  if (indice >= 0 && indice < items.length) {
    items[indice].classList.add("seleccionada");
    items[indice].scrollIntoView({ block: "nearest" });
  }
  sugerenciaActiva = indice;
}

inputPersonaje.addEventListener("input", () => { sugerenciaActiva = -1; });

inputPersonaje.addEventListener("keydown", (evento) => {
  const items = listaSugerencias.querySelectorAll("li");

  if (evento.key === "ArrowDown" && items.length) {
    evento.preventDefault();
    resaltarSugerencia((sugerenciaActiva + 1) % items.length);
    return;
  }
  if (evento.key === "ArrowUp" && items.length) {
    evento.preventDefault();
    resaltarSugerencia((sugerenciaActiva - 1 + items.length) % items.length);
    return;
  }
  if (evento.key !== "Enter") return;
  evento.preventDefault();

  let nombre = null;
  if (sugerenciaActiva >= 0 && items[sugerenciaActiva]) {
    nombre = items[sugerenciaActiva].dataset.nombre;
  } else if (items.length) {
    nombre = items[0].dataset.nombre; // el que aparece primero
  } else {
    const valor = normalizar(inputPersonaje.value.trim());
    const exacto = personajes.find(p => normalizar(p.nombre) === valor);
    if (exacto) nombre = exacto.nombre;
  }

  if (nombre) {
    realizarIntento(nombre);
    inputPersonaje.value = "";
    listaSugerencias.innerHTML = "";
    listaSugerencias.classList.remove("activa");
    sugerenciaActiva = -1;
  }
});

// Cierra la lista de sugerencias si se hace clic afuera
document.addEventListener("click", (evento) => {
  if (evento.target !== inputPersonaje) {
    listaSugerencias.classList.remove("activa");
  }
});

// ---------- Lógica del intento ----------
function realizarIntento(nombre) {
  if (juegoTerminado) return;

  const personajeElegido = personajes.find(p => p.nombre === nombre);
  if (!personajeElegido || nombresYaUsados.has(nombre)) return;

  nombresYaUsados.add(nombre);
  intentos++;
  contadorIntentos.textContent = `Intentos: ${intentos}`;
  actualizarPista();

  agregarFilaTabla(personajeElegido);

  if (personajeElegido.nombre === personajeSecreto.nombre) {
    terminarJuego(true);
  }
}

// ---------- Comparar un atributo y devolver su estado ----------
function compararAtributo(atributo, valorElegido) {
  const valorSecreto = personajeSecreto[atributo.clave];
  const sufijo = atributo.sufijo || "";

  if (atributo.tipo === "numero") {
    if (valorElegido === valorSecreto) {
      return { estado: "correcto", texto: `${valorElegido}${sufijo}` };
    }
    const flecha = valorElegido < valorSecreto ? "⬆️" : "⬇️";
    const diferencia = Math.abs(valorElegido - valorSecreto);
    const estado = diferencia <= atributo.margenParcial ? "parcial" : "incorrecto";
    return { estado, texto: `${valorElegido}${sufijo} ${flecha}` };
  }

  if (atributo.tipo === "lista") {
    const setSecreto = new Set(valorSecreto);
    const iguales =
      valorElegido.length === valorSecreto.length &&
      valorElegido.every(v => setSecreto.has(v));
    if (iguales) {
      return { estado: "correcto", texto: valorElegido.join(", ") };
    }
    const hayInterseccion = valorElegido.some(v => setSecreto.has(v));
    return { estado: hayInterseccion ? "parcial" : "incorrecto", texto: valorElegido.join(", ") };
  }

  if (atributo.tipo === "especie") {
    if (valorElegido === valorSecreto) {
      return { estado: "correcto", texto: valorElegido };
    }
    const palabrasA = palabrasClave(valorElegido);
    const palabrasB = palabrasClave(valorSecreto);
    const comparten = palabrasA.some(p => palabrasB.includes(p));
    return { estado: comparten ? "parcial" : "incorrecto", texto: valorElegido };
  }

  // tipo "texto": coincide o no coincide
  if (valorElegido === valorSecreto) {
    return { estado: "correcto", texto: valorElegido };
  }
  return { estado: "incorrecto", texto: valorElegido };
}

// ---------- Renderizar la fila de un intento en la tabla ----------
function agregarFilaTabla(personaje) {
  const fila = document.createElement("tr");

  const celdaFoto = document.createElement("td");
  celdaFoto.className = "foto-celda";
  const foto = document.createElement("img");
  foto.src = personaje.foto || "../imagenes/personajes/placeholder.svg";
  foto.alt = personaje.nombre;
  foto.className = "foto-personaje";
  foto.onerror = () => { foto.src = "../imagenes/personajes/placeholder.svg"; };
  celdaFoto.appendChild(foto);
  fila.appendChild(celdaFoto);

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = personaje.nombre;
  celdaNombre.className = personaje.nombre === personajeSecreto.nombre ? "correcto" : "incorrecto";
  fila.appendChild(celdaNombre);

  atributos.forEach((atributo) => {
    const resultado = compararAtributo(atributo, personaje[atributo.clave]);
    const celda = document.createElement("td");
    celda.textContent = resultado.texto;
    celda.className = resultado.estado;
    fila.appendChild(celda);
  });

  // Los intentos más recientes arriba
  cuerpoTabla.insertBefore(fila, cuerpoTabla.firstChild);
}

// ---------- Pista de colores ----------
// Los 2 colores se definen en personajes.js (propiedad "colores" de cada personaje).
function actualizarPista() {
  if (cajaPista.classList.contains("revelada")) return;
  if (intentos >= INTENTOS_PARA_PISTA) {
    cajaPista.disabled = false;
    textoPista.textContent = "💡 Pista de colores: hacé click para verla";
  } else {
    cajaPista.disabled = true;
    const faltan = INTENTOS_PARA_PISTA - intentos;
    textoPista.textContent = `💡 Pista de colores (disponible en ${faltan} intento${faltan === 1 ? "" : "s"})`;
  }
}

cajaPista.addEventListener("click", () => {
  if (cajaPista.disabled || cajaPista.classList.contains("revelada")) return;
  coloresPista.innerHTML = "";
  (personajeSecreto.colores || []).forEach(color => {
    const cuadro = document.createElement("span");
    cuadro.className = "color-pista";
    cuadro.style.backgroundColor = color;
    cuadro.title = color;
    coloresPista.appendChild(cuadro);
  });
  coloresPista.hidden = false;
  textoPista.textContent = "💡 Los 2 colores principales:";
  cajaPista.classList.add("revelada");
});

actualizarPista();

// ---------- Fin del juego ----------
function terminarJuego(gano) {
  juegoTerminado = true;
  inputPersonaje.disabled = true;

  if (gano) {
    mensajeResultado.textContent = `¡Correcto! Era ${personajeSecreto.nombre}. Lo lograste en ${intentos} intento${intentos === 1 ? "" : "s"}.`;
    mensajeResultado.className = "resultado-ganaste";

    // Suma a la racha del jugador (si tiene sesión iniciada)
    // En modo libre no se suma racha (solo cuenta el reto diario)
    if (window.registrarVictoria && !(window.modoLibre && window.modoLibre.activo())) window.registrarVictoria("clasico");

    // Botón para pasar al siguiente modo (Frase)
    botonSiguiente.hidden = false;
    botonSiguiente.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
