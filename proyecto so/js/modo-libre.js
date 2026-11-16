// modo-libre.js
// "Modo libre": interruptor que está en la PANTALLA DE INICIO (index.html),
// arriba a la izquierda.
//
//   - APAGADO (por defecto): modo convencional, al estilo Wordle. El personaje y
//     la frase cambian una vez por día y son iguales para todos (ver aleatorio.js).
//   - ENCENDIDO: Clásico y Frase ya no dependen del día. Cada vez que se entra a la
//     pantalla de inicio se sortea un personaje nuevo para Clásico y una frase nueva
//     para Frase. Mientras se juega (o se recarga la página del juego) se mantiene el
//     mismo; cambia recién al volver al inicio.
//
// El estado se guarda en el navegador (localStorage). En modo libre NO se suma racha
// (la racha es solo para los retos diarios).
//
// Este archivo se carga en index.html (dibuja el interruptor y sortea de nuevo)
// y en clasico.html / frase.html (leen el personaje elegido).
(function () {
  const CLAVE_ACTIVO = "invencidle_modo_libre";
  const CLAVE_ELEGIDO = "invencidle_libre_";        // + modo: índice elegido ahora
  const CLAVE_PREVIO = "invencidle_libre_previo_";  // + modo: el anterior (para no repetirlo)
  const MODOS = ["clasico", "frase"];

  function leer(clave) {
    try { return localStorage.getItem(clave); } catch (e) { return null; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento: se ignora */ }
  }
  function borrar(clave) {
    try { localStorage.removeItem(clave); } catch (e) { /* idem */ }
  }

  function activo() { return leer(CLAVE_ACTIVO) === "1"; }

  // Devuelve el elemento del modo libre ("clasico" o "frase").
  // Si todavía no hay uno sorteado, sortea uno distinto al anterior.
  function elegir(lista, modo) {
    const n = lista.length;
    if (n <= 1) return lista[0];
    const guardado = parseInt(leer(CLAVE_ELEGIDO + modo), 10);
    if (Number.isInteger(guardado) && guardado >= 0 && guardado < n) return lista[guardado];
    const previo = parseInt(leer(CLAVE_PREVIO + modo), 10);
    let nuevo = Math.floor(Math.random() * n);
    if (nuevo === previo) nuevo = (nuevo + 1 + Math.floor(Math.random() * (n - 1))) % n;
    guardar(CLAVE_ELEGIDO + modo, String(nuevo));
    return lista[nuevo];
  }

  // Descarta el elegido de cada modo: el próximo que se juegue será uno nuevo.
  function sortearDeNuevo() {
    MODOS.forEach((modo) => {
      const actual = leer(CLAVE_ELEGIDO + modo);
      if (actual !== null) guardar(CLAVE_PREVIO + modo, actual);
      borrar(CLAVE_ELEGIDO + modo);
    });
  }

  window.modoLibre = { activo: activo, elegir: elegir };

  // ---------- Pantalla de inicio: interruptor + nuevo sorteo ----------
  function iniciarEnInicio(barra) {
    const etiqueta = document.createElement("label");
    etiqueta.className = "interruptor-libre";
    etiqueta.title = "Modo libre: Clásico y Frase cambian cada vez que volvés al inicio, sin depender del día";
    etiqueta.innerHTML =
      '<input type="checkbox" role="switch" aria-label="Modo libre">' +
      '<span class="interruptor-pista" aria-hidden="true"></span>' +
      '<span class="interruptor-texto">Modo libre</span>';
    const casilla = etiqueta.querySelector("input");
    casilla.checked = activo();
    casilla.addEventListener("change", () => {
      guardar(CLAVE_ACTIVO, casilla.checked ? "1" : "0");
      if (casilla.checked) sortearDeNuevo();
    });
    barra.insertBefore(etiqueta, barra.firstChild);

    // Cada vez que se llega al inicio con el modo libre activo: personaje y frase nuevos.
    if (activo()) sortearDeNuevo();
    // Si el navegador muestra el inicio desde su caché (botón "atrás"), también se sortea.
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        casilla.checked = activo();
        if (activo()) sortearDeNuevo();
      }
    });
  }

  function iniciar() {
    const barra = document.querySelector(".barra-superior[data-modo-libre]");
    if (barra) iniciarEnInicio(barra);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
