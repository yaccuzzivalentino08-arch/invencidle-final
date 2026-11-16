// aleatorio.js
// Elige el elemento "del día" en orden ALEATORIO pero igual para todos los
// jugadores que juegan el mismo día (como Wordle).
//
// Cómo funciona:
//   - Los días se agrupan en "ciclos" del tamaño de la lista (N elementos = N días).
//   - Cada ciclo usa una mezcla distinta de la lista (Fisher-Yates con semilla),
//     así no se repite ningún elemento hasta haber pasado por todos.
//   - La mezcla depende solo del número de ciclo y del modo, no de quién juega,
//     por eso todos ven lo mismo el mismo día.
//   - Se evita que el último de un ciclo sea igual al primero del siguiente.
//
// Si el "Modo libre" está activado, se usa otro criterio (ver modo-libre.js).
//
// Uso: elegirDelDia(lista, "nombre-del-modo", fechaBase)
(function () {
  // Generador pseudoaleatorio con semilla (mulberry32).
  function crearRandom(semilla) {
    let a = semilla >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Convierte un texto en un número (hash simple) para usarlo como semilla.
  function hashTexto(texto) {
    let h = 2166136261;
    for (let i = 0; i < texto.length; i++) {
      h ^= texto.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // Devuelve una mezcla (orden de índices) para un ciclo determinado.
  function mezclaDelCiclo(n, ciclo, modo) {
    const orden = Array.from({ length: n }, (_, i) => i);
    const azar = crearRandom(hashTexto(modo + ":" + ciclo));
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(azar() * (i + 1));
      [orden[i], orden[j]] = [orden[j], orden[i]];
    }
    return orden;
  }

  window.elegirDelDia = function (lista, modo, fechaBase) {
    const n = lista.length;
    if (n === 0) return undefined;
    if (n === 1) return lista[0];

    // Modo libre (interruptor de la pantalla de inicio, ver modo-libre.js):
    // no depende del día, cambia cada vez que se vuelve al inicio.
    if (window.modoLibre && window.modoLibre.activo()) return window.modoLibre.elegir(lista, modo);

    // Días completos desde la fecha base, usando la fecha LOCAL del jugador
    // (en UTC para que los cambios de horario no rompan el conteo).
    const hoy = new Date();
    const hoyUTC = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const baseUTC = Date.UTC(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate());
    const dias = Math.max(0, Math.round((hoyUTC - baseUTC) / 86400000));

    const ciclo = Math.floor(dias / n);
    const posicion = dias % n;

    const orden = mezclaDelCiclo(n, ciclo, modo);

    // Evitar repetir el mismo elemento entre el final del ciclo anterior y el inicio de este.
    if (ciclo > 0 && posicion === 0) {
      const anterior = mezclaDelCiclo(n, ciclo - 1, modo);
      if (orden[0] === anterior[n - 1]) {
        [orden[0], orden[1]] = [orden[1], orden[0]];
      }
    }
    return lista[orden[posicion]];
  };
})();
