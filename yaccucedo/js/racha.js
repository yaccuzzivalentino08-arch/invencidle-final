// racha.js
// Muestra la racha del jugador (🔥 + número) arriba a la derecha de la barra superior
// y expone window.registrarVictoria(modo) para que clasico.js y frase.js la avisen al ganar.
// Solo se muestra si hay sesión iniciada.
(function () {
  const urlApi = new URL("../php/racha.php", document.currentScript.src).href;
  let csrf = "";
  let logueado = false;
  let contador = null;

  function crearIndicador() {
    const barra = document.querySelector(".barra-superior");
    if (!barra) return null;
    const caja = document.createElement("span");
    caja.className = "racha";
    caja.hidden = true;
    caja.title = "Tu racha: sumá ganando Clásico y Frase. Se pierde si pasan 24 h sin ganar.";
    caja.setAttribute("aria-label", "Racha");
    caja.innerHTML = '<span class="racha-llama" aria-hidden="true">🔥</span><span class="racha-numero">0</span>';
    barra.appendChild(caja);
    return caja;
  }

  function mostrar(racha, animar) {
    if (!contador) return;
    contador.hidden = false;
    contador.querySelector(".racha-numero").textContent = racha;
    contador.classList.toggle("racha-activa", racha > 0);
    if (animar) {
      contador.classList.remove("racha-sube");
      void contador.offsetWidth;            // reinicia la animación
      contador.classList.add("racha-sube");
    }
  }

  async function cargar() {
    try {
      const r = await fetch(urlApi, { credentials: "same-origin", cache: "no-store" });
      const d = await r.json();
      logueado = !!d.logueado;
      csrf = d.csrf || "";
      if (logueado) mostrar(d.racha, false);
    } catch (e) { /* sin servidor PHP: simplemente no se muestra */ }
  }

  // Llamar cuando el jugador gana: modo = "clasico" | "frase"
  window.registrarVictoria = async function (modo) {
    if (!logueado || !csrf) return;
    try {
      const r = await fetch(urlApi, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({ modo })
      });
      const d = await r.json();
      if (d && typeof d.racha === "number") mostrar(d.racha, d.sumo);
    } catch (e) { /* ignorar */ }
  };

  function iniciar() {
    contador = crearIndicador();
    if (contador) cargar();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
