// personajes.js
// Base de datos de personajes de Invencible para el modo "Clásico".
//
// Los atributos y su orden están tomados de la página "¿Cómo se juega?":
//   1. Género
//   2. Especie
//   3. Planeta de origen
//   4. Edad
//   5. Altura (cm)
//   6. Pelo
//   7. Habilidades (Capacidades aumentadas, Emisor, Mutante, Cambiaforma o Ninguna)
//   8. Temporada en la que apareció
//   (extra) colores: los 2 colores principales del personaje, en formato
//           hexadecimal. Se usan en la pista opcional del modo Clásico.
//
// "habilidades" es un array porque un personaje puede tener más de una.
// Si sumás un personaje nuevo, respetá esta misma forma.
//
// ---------- Cómo modificar un personaje o agregar su foto ----------
// Cada personaje es un objeto simple: para cambiar un nombre, una edad,
// un planeta, etc. basta con editar el valor correspondiente acá abajo.
//
// "foto" es la ruta a la imagen del personaje. Todas las fotos van
// adentro de la carpeta imagenes/personajes/. Para agregar una:
//   1. Guardá la imagen (jpg, png o webp) dentro de imagenes/personajes/
//      Se recomienda que sea cuadrada (por ejemplo 300x300) para que
//      no se vea deformada en el recuadro.
//   2. Poné el nombre de ese archivo en la propiedad "foto" del
//      personaje, por ejemplo: foto: "../imagenes/personajes/mark.jpg"
//   3. Si un personaje todavía no tiene foto propia, dejá
//      "../imagenes/personajes/placeholder.svg" (es la silueta gris)
//      y el juego la va a mostrar sin romperse.

const personajes = [
  {
    nombre: "Mark Grayson",
    foto: "../imagenes/personajes/mark-grayson.avif",
    genero: "Masculino",
    especie: "Híbrido (Viltrumita/Humano)",
    planeta: "Tierra",
    edad: 17,
    altura: 178,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 1,
    colores: ["#1f6fd1", "#f4c20d"]
  },
  {
    nombre: "Nolan Grayson",
    foto: "../imagenes/personajes/Nolan-grayson.jpg",
    genero: "Masculino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: 1000,
    altura: 188,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 1,
    colores: ["#f2f2f2", "#b3202a"]
  },
  {
    nombre: "Debbie Grayson",
    foto: "../imagenes/personajes/debbie-grayson.jpg",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 42,
    altura: 165,
    pelo: "Castaño",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#59bb8c", "#f0e6d2"]
  },
  {
    nombre: "Amber Bennett",
    foto: "../imagenes/personajes/Amber-Bennett.webp",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 17,
    altura: 163,
    pelo: "Negro",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#31453a", "#2b2b2b"]
  },
  {
    nombre: "William Clockwell",
    foto: "../imagenes/personajes/william-clockwell.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 17,
    altura: 170,
    pelo: "Castaño",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#cb6340", "#db9f7d"]
  },
  {
    nombre: "Eve Wilkins",
    foto: "../imagenes/personajes/eve-wilkins.webp",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 17,
    altura: 165,
    pelo: "Rubio",
    habilidades: ["Emisor"],
    temporada: 1,
    colores: ["#f05f7c", "#de673f"]
  },
  {
    nombre: "Cecil Stedman",
    foto: "../imagenes/personajes/cecil-stedman.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 58,
    altura: 175,
    pelo: "Canoso",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#010715", "#c8b9b6"]
  },
  {
    nombre: "Donald Ferguson",
    foto: "../imagenes/personajes/donald-ferguson.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 50,
    altura: 180,
    pelo: "Colorado",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#656d73", "#876d58"]
  },
  {
    nombre: "Thaedus",
    foto: "../imagenes/personajes/thaedus.jpg",
    genero: "Masculino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: 10000,
    altura: 191,
    pelo: "Canoso",
    habilidades: ["Capacidades aumentadas"],
    temporada: 4,
    colores: ["#c4a14f", "#ad8e71"]
  },
  {
    nombre: "Rudy Connors (Robot)",
    foto: "../imagenes/personajes/robot.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 16,
    altura: 175,
    pelo: "Castaño",
    habilidades: ["Inteligencia superior"],
    temporada: 1,
    colores: ["#e4794b", "#c1d66f"]
  },
  {
    nombre: "Kate (Dupli-Kate)",
    foto: "../imagenes/personajes/dupli.webp",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 24,
    altura: 168,
    pelo: "Negro",
    habilidades: ["Mutante"],
    temporada: 1,
    colores: ["#261e2b", "#bcadc2"]
  },
  {
    nombre: "Amanda (Monster Girl)",
    foto: "../imagenes/personajes/monster.webp",
    genero: "Femenino",
    especie: "Humano mutado",
    planeta: "Tierra",
    edad: 19,
    altura: 160,
    pelo: "Castaño",
    habilidades: ["Cambia forma"],
    temporada: 1,
    colores: ["#b8cb6b", "#909148"]
  },
  {
    nombre: "Angstrom Levy",
    foto: "../imagenes/personajes/levy.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 45,
    altura: 178,
    pelo: "Negro",
    habilidades: ["Emisor"],
    temporada: 2,
    colores: ["#522a0f", "#620801"]
  },
  {
    nombre: "Anissa",
    foto: "../imagenes/personajes/anissa.jpg",
    genero: "Femenino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: 1000,
    altura: 175,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 2,
    colores: ["#ebfefc", "#bedfe8"]
  },
  {
    nombre: "Allen the Alien",
    foto: "../imagenes/personajes/allen-the-alien.jpg",
    genero: "Masculino",
    especie: "Extraterrestre",
    planeta: "Thraxa",
    edad: 300,
    altura: 210,
    pelo: "Sin pelo",
    habilidades: ["Capacidades aumentadas"],
    temporada: 2,
    colores: ["#e2831f", "#3cce6f"]
  },
  {
    nombre: "Thragg",
    foto: "../imagenes/personajes/thragg.webp",
    genero: "Masculino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: +2000,
    altura: 198,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 4,
    colores: ["#ce4623", "#a6acaa"]
  },
  {
    nombre: "Conquest",
    foto: "../imagenes/personajes/conquest.webp",
    genero: "Masculino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: 5000,
    altura: 203,
    pelo: "Canoso",
    habilidades: ["Capacidades aumentadas"],
    temporada: 3,
    colores: ["#ebfefc", "#bedfe8"]
  },
  {
    nombre: "Inmortal",
    foto: "../imagenes/personajes/inmortal.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 2000,
    altura: 193,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 1,
    colores: ["#1b1b2f", "#d4af37"]
  },
  {
    nombre: "Oliver Grayson",
    foto: "../imagenes/personajes/oliver-grayson.webp",
    genero: "Masculino",
    especie: "Híbrido (Viltrumita/Thraxano)",
    planeta: "Thraxa",
    edad: 2,
    altura: 168,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 4,
    colores: ["#b23937", "#393a40"]
  },
  {
    nombre: "Tech Jacket",
    foto: "../imagenes/personajes/tech-jacket.webp",
    genero: "Femenino",
    especie: "Gelderiano",
    planeta: "Geldaria",
    edad: 15,
    altura: 175,
    pelo: "Negro",
    habilidades: ["Inteligencia Superior"],
    temporada: 3,
    colores: ["#48484a", "#b8cacd"]
  },
  {
    nombre: "BattleBeast",
    foto: "../imagenes/personajes/battlebeast.jpg",
    genero: "Masculino",
    especie: "Dorniano",
    planeta: "Dornn",
    edad: +1000,
    altura: 218,
    pelo: "Blanco",
    habilidades: ["Capacidades aumentadas"],
    temporada: 1,
    colores: ["#edf6fd", "#3b3e45"]
  },
  {
    nombre: "Powerplex",
    foto: "../imagenes/personajes/powerplex.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 30,
    altura: 180,
    pelo: "Rubio",
    habilidades: ["Emisor"],
    temporada: 3,
    colores: ["#ab494e", "#362627"]
  },
  {
    nombre: "Rex",
    foto: "../imagenes/personajes/rex.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 18,
    altura: 180,
    pelo: "Colorado",
    habilidades: ["Emisor"],
    temporada: 1,
    colores: ["#b3351b", "#eae786"]
  },
  {
    nombre: "Shapesmith",
    foto: "../imagenes/personajes/shapesmith.jpg",
    genero: "Masculino",
    especie: "Marciano",
    planeta: "Marte",
    edad: 20,
    altura: 196,
    pelo: "Blanco",
    habilidades: ["Mutante"],
    temporada: 1,
    colores: ["#dfb163", "#5f6c99"]
  },
  {
    nombre: "Bulletproof",
    foto: "../imagenes/personajes/bulletproof.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 30,
    altura: 183,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 2,
    colores: ["#e8cf58", "#c46225"]
  },
  { 
    nombre: "Lucan",
    foto: "../imagenes/personajes/lucan.jpg",
    genero: "Masculino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: +2000,
    altura: 193,
    pelo: "Sin pelo",
    habilidades: ["Capacidades aumentadas"],
    temporada: 2,
    colores: ["#6b6b6b", "#b8860b"]
  },
  {
    nombre: "Kregg",
    foto: "../imagenes/personajes/kregg.jpg",
    genero: "Masculino",
    especie: "Viltrumita",
    planeta: "Viltrum",
    edad: 4500,
    altura: 193,
    pelo: "Negro",
    habilidades: ["Capacidades aumentadas"],
    temporada: 2,
    colores: ["#b03a2e", "#2b2b2b"]
  },
  {
    nombre: "Darkwing",
    foto: "../imagenes/personajes/darkwing.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 30,
    altura: 188,
    pelo: "Negro",
    habilidades: ["Niguna"],
    temporada: 1,
    colores: ["#1b1b1b", "#2e4a8b"]
  },
  {
    nombre: "Greenghost",
    foto: "../imagenes/personajes/greenghost.jpg",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 25,
    altura: 183,
    pelo: "Sin pelo",
    habilidades: ["Cambia forma"],
    temporada: 1,
    colores: ["#2ecc71", "#f2f2f2"]
  },
   {
    nombre: "War Woman",
    foto: "../imagenes/personajes/warwoman.jpg",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 1000,
    altura: 183,
    pelo: "Marron",
    habilidades: ["Capacidades aumentadas"],
    temporada: 1,
    colores: ["#c0392b", "#d4af37"]
  },
  {
    nombre: "Red Rush",
    foto: "../imagenes/personajes/redrush.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 35,
    altura: 180,
    pelo: "Castaño",
    habilidades: ["Capacidades aumentadas"],
    temporada: 1,
    colores: ["#d62828", "#f4c20d"]
  },
  {
    nombre: "Martian Man",
    foto: "../imagenes/personajes/martianman.jpg",
    genero: "Masculino",
    especie: "Marciano",
    planeta: "Marte",
    edad: 50,
    altura: 198,
    pelo: "Sin pelo",
    habilidades: ["Mutante"],
    temporada: 1,
    colores: ["#2e8b57", "#b22222"]
  },
  {
    nombre: "Aquarus",
    foto: "../imagenes/personajes/Aquarus.jpg",
    genero: "Masculino",
    especie: "Atlantes",
    planeta: "Tierra",
    edad: 40,
    altura: 191,
    pelo: "Sin pelo",
    habilidades: ["Mutante"],
    temporada: 1,
    colores: ["#2e86c1", "#1abc9c"]
  },
  {
    nombre: "Damien Darkblood",
    foto: "../imagenes/personajes/damien.webp",
    genero: "Masculino",
    especie: "Demonio",
    planeta: "Tierra",
    edad: +10000,
    altura: 180,
    pelo: "Sin pelo",
    habilidades: ["Mutante"],
    temporada: 1,
    colores: ["#7b1e1e", "#1a1a1a"]
  },
  {
    nombre: "Titan",
    foto: "../imagenes/personajes/titan.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 30,
    altura: 188,
    pelo: "Sin pelo",
    habilidades: ["Cambia forma"],
    temporada: 1,
    colores: ["#7f8c8d", "#8b1a1a"]
  },
  {
    nombre: "Shrinking Rae",
    foto: "../imagenes/personajes/rae.jpg",
    genero: "Femenino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 19,
    altura: 180,
    pelo: "Marron",
    habilidades: ["Cambia forma"],
    temporada: 1,
    colores: ["#8e44ad", "#f2f2f2"]
  },
  {
    nombre: "Mauler twins",
    foto: "../imagenes/personajes/twins.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 40,
    altura: 229,
    pelo: "Sin pelo",
    habilidades: ["Mutante"],
    temporada: 1,
    colores: ["#7f8c8d", "#2b2b2b"]
  },
  {
    nombre: "Señor Liu",
    foto: "../imagenes/personajes/liu.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 74,
    altura: 160,
    pelo: "Canoso",
    habilidades: ["Cambia forma"],
    temporada: 1,
    colores: ["#2b2b2b", "#c0392b"]
  },
  {
    nombre: "Doc Seismic",
    foto: "../imagenes/personajes/doc.jpg",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 50,
    altura: 178,
    pelo: "Sin pelo",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#a0522d", "#2b2b2b"]
  },
  {
    nombre: "Art Rosenbaum",
    foto: "../imagenes/personajes/art.webp",
    genero: "Masculino",
    especie: "Humano",
    planeta: "Tierra",
    edad: 55,
    altura: 185,
    pelo: "Canoso",
    habilidades: ["Ninguna"],
    temporada: 1,
    colores: ["#B1AAA0", "#645A50"]
  },
];
