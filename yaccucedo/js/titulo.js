// titulo.js - el título se va manchando de sangre, igual que la title card de Invencible.
//
// Son 7 manchas, siempre las mismas y en el mismo orden que en el video
// (imagenes/sangre/mancha1.png ... mancha7.png). Cada imagen ya incluye las anteriores,
// así que mostrar la N es mostrar "hasta la mancha N" (la 7ª es distinta: ver abajo). Se usan como fondo del texto
// recortado con la forma de las letras (background-clip: text), por eso la sangre
// nunca se sale de las letras.
//
//   - Mouse: mientras el cursor está sobre el título aparece una mancha nueva cada
//            MS_ENTRE_MANCHAS. Al sacar el cursor quedan las que ya salieron y, al volver
//            a pasar, sigue con la siguiente. Se borran recién al recargar la página.
//   - Celular/tablet: cada toque sobre el título agrega la siguiente mancha
//            (en esos dispositivos el toque NO navega al inicio; para eso está el footer).
(function () {
  const TOTAL_MANCHAS = 7;
  const MS_ENTRE_MANCHAS = 900;     // rapidez con que aparecen con el mouse

  // Dónde está la tinta de las letras dentro de la caja del texto (medido con la fuente),
  // para que el dibujo del video quede justo encima de las letras.
  const TINTA = { ancho: 0.997, alto: 0.841, arriba: 0.048 };

  const base = document.currentScript ? document.currentScript.src : location.href;
  const urls = [];
  for (let i = 1; i <= TOTAL_MANCHAS; i++) {
    urls.push(new URL("../imagenes/sangre/mancha" + i + ".png", base).href);
    new Image().src = urls[i - 1];            // precarga
  }

  function iniciar(h1) {
    h1.classList.add("titulo-sangre");

    // elemento que contiene el texto: el link si hay, o un span
    let el = h1.querySelector("a");
    if (!el) {
      el = document.createElement("span");
      el.className = "titulo-texto";
      el.textContent = h1.textContent.trim();
      h1.textContent = "";
      h1.appendChild(el);
    } else {
      el.textContent = el.textContent.trim();
    }

    el.style.backgroundSize = (TINTA.ancho * 100) + "% " + (TINTA.alto * 100) + "%";
    el.style.backgroundPosition = "0% " + (TINTA.arriba / (1 - TINTA.alto) * 100) + "%";

    let manchas = 0;
    function siguiente() {
      if (manchas >= TOTAL_MANCHAS) return false;
      manchas++;
      // La 7ª mancha cubre todas las letras de rojo (con las salpicaduras amarillas que quedan
      // en el video): se pinta con las letras de la propia fuente, así queda perfectamente alineada.
      el.style.backgroundColor = manchas === TOTAL_MANCHAS ? "#b50f14" : "";
      el.style.backgroundImage = 'url("' + urls[manchas - 1] + '")';
      return manchas < TOTAL_MANCHAS;
    }

    // ---- mouse ----
    let timer = null;
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || timer) return;
      if (!siguiente()) return;
      timer = setInterval(() => { if (!siguiente()) { clearInterval(timer); timer = null; } }, MS_ENTRE_MANCHAS);
    });
    el.addEventListener("pointerleave", () => { clearInterval(timer); timer = null; });

    // ---- celular/tablet: un toque = una mancha ----
    el.addEventListener("click", (e) => {
      const tactil = e.pointerType === "touch" || e.pointerType === "pen" || window.matchMedia("(hover: none)").matches;
      if (!tactil) return;
      e.preventDefault();
      siguiente();
    });
  }

  function arrancar() { document.querySelectorAll("h1").forEach(iniciar); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arrancar);
  else arrancar();
})();
