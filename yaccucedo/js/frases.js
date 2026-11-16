// frases.js
// Base de datos de frases para el modo "Frase" de INVENCIDLE.
//
// Este modo funciona como el modo "Quote" de Narutodle: cada día se elige
// una frase al azar (pero fija para todos, según la fecha) y hay que
// adivinar QUÉ PERSONAJE la dijo, escribiendo su nombre.
//
// IMPORTANTE: todas las frases de acá fueron sacadas de la SERIE ANIMADA
// (Prime Video), no de los cómics, porque en varios casos el diálogo es
// distinto entre una versión y otra. Si agregás una frase nueva, fijate
// que sea una línea que el personaje diga en la serie.
//
// ---------- Cómo se relaciona esto con personajes.js ----------
// El campo "personaje" de cada frase tiene que ser EXACTAMENTE IGUAL
// (mismas mayúsculas, mismos espacios) al campo "nombre" de ese
// personaje en personajes.js. El juego usa ese nombre para buscar su
// foto y mostrarla cuando se acierta.
//
// Por ejemplo, si en personajes.js el personaje está cargado como:
//   { nombre: "Rudy Connors (Robot)", ... }
// entonces acá tiene que decir:
//   personaje: "Rudy Connors (Robot)"
//
// Si escribís mal el nombre, el juego igual va a funcionar (compara
// texto), pero no va a poder mostrar la foto del personaje al final.
//
// ---------- Cómo agregar una frase nueva ----------
// Copiá un bloque como el de abajo y completá:
//   frase:     el diálogo, entre comillas. Tratá de que sea una sola
//              oración o dos cortas, no un párrafo entero.
//   frase_es:  la misma frase en español. Se muestra al tocar la bandera
//              en el modo Frase. Si la dejás vacía, se muestra la original.
//   personaje: el nombre exacto (ver de arriba).
//   temporada: el número de temporada en la que se dice esa frase.
//              Se usa como pista después de algunos intentos fallidos.
//
// ---------- Cómo sacar una frase de la lista (sin borrar el bloque) ----------
// Podés comentarla poniendo /* al principio y */ al final del bloque,
// así queda guardada por si la querés volver a usar más adelante.

// link de frases: https://www.ranker.com/list/best-invincible-quotes/sergio-pereira

const frases = [
  {
    frase: "You, Dad. I'd still have you.",
    frase_es: "A ti, papá. Todavía te tendría a ti.",
    personaje: "Mark Grayson",
    temporada: 1
  },
  {
    frase: "Still having fun?.",
    frase_es: "¿Todavía te estás divirtiendo?",
    personaje: "Mark Grayson",
    temporada: 3
  },
  {
    frase: "Guess who's finally getting his powers?.",
    frase_es: "¿Adivina quién por fin está consiguiendo sus poderes?",
    personaje: "Mark Grayson",
    temporada: 1
  },
  {
    frase: "It's Time For A Change.",
    frase_es: "Es momento de un cambio.",
    personaje: "Mark Grayson",
    temporada: 3
  },
  {
    frase: "Cecil, i need you Cecil!.",
    frase_es: "¡Cecil, te necesito, Cecil!",
    personaje: "Mark Grayson",
    temporada: 3
  },
  {
    frase: "Is that all you got?",
    frase_es: "¿Eso es todo lo que tienes?",
    personaje: "Mark Grayson",
    temporada: 3
  },
  {
    frase: "Your life has been soft and painless.",
    frase_es: "Tu vida ha sido suave e indolora.",
    personaje: "Nolan Grayson",
    temporada: 1
  },
  {
    frase: "I think, i miss my wife.",
    frase_es: "Creo que extraño a mi esposa.",
    personaje: "Nolan Grayson",
    temporada: 2
  },
  {
    frase: "Are you sure?.",
    frase_es: "¿Estás seguro?",
    personaje: "Nolan Grayson",
    temporada: 1
  },
  {
    frase: "Welcome to the Guardians of the Globe. Try not to die.",
    frase_es: "Bienvenido a los Guardianes del Globo. Intenta no morir.",
    personaje: "Cecil Stedman",
    temporada: 1
  },
    {
    frase: "We can be the good guys, or can be the guys who save the world. But we can't be both.",
    frase_es: "Podemos ser los buenos... o podemos ser los que salvan al mundo. No podemos ser ambas cosas.",
    personaje: "Cecil Stedman",
    temporada: 3
  },
  {
    frase: "You're not a monster, Mark. You're just... you're just human. Mostly.",
    frase_es: "No eres un monstruo, Mark. Solo eres... solo eres humano. Casi.",
    personaje: "Debbie Grayson",
    temporada: 2
  },
    {
    frase: "You need to decide what kind of hero you want to be.",
    frase_es: "Debes decidir que tipo de heroe quieres ser.",
    personaje: "Debbie Grayson",
    temporada: 1
  },
  {
    frase: "I'm the one who took you... with me.",
    frase_es: "Fui yo quien te llevó... conmigo.",
    personaje: "Rex",
    temporada: 3
  },
  {
    frase: "My entire goddam skeleton dickhead.",
    frase_es: "Todo mi maldito esqueleto, imbécil.",
    personaje: "Rex",
    temporada: 3
  },
  {
    frase: "It's my favorite finger.",
    frase_es: "Es mi dedo favorito.",
    personaje: "Rex",
    temporada: 3
  },
  {
    frase: "Ya know in my planet a sock on the door means somebody's fu**ing.",
    frase_es: "¿Sabes? En mi planeta un calcetín en la puerta significa que alguien está cogi**do.",
    personaje: "Allen the alien",
    temporada: 2
  },
  {
    frase: "Mark Isn't Like Other Viltrumites. He's A Good Guy.",
    frase_es: "Mark no es como los otros viltrumitas. El es un buen tipo.",
    personaje: "Allen the alien",
    temporada: 2
  },
  {
    frase: "Where is omniman!?.",
    frase_es: "¿¡Dónde está Omni-Man!?",
    personaje: "Inmortal",
    temporada: 1
  },
  {
    frase: "I'm not an idiot. I figured it out weeks ago.",
    frase_es: "No soy idiota. Lo averigüé hace semanas.",
    personaje: "Amber Bennett",
    temporada: 1
  },
  {
    frase: "You look... kind of recently on fire.",
    frase_es: "Te ves... como que te prendieron fuego hace poco.",
    personaje: "William Clockwell",
    temporada: 1
  },
  {
    frase: "You Being A Superhero Is The Coolest Thing That Ever Happened To Me.",
    frase_es: "Que seas un superhéroe es lo más genial que me ha pasado nunca.",
    personaje: "William Clockwell",
    temporada: 1
  },
  {
    frase: "Stand ready for my arrival, worm.",
    frase_es: "Prepárate para mi llegada, gusano.",
    personaje: "Conquest",
    temporada: 3
  },
  {
    frase: "I am so lonely.",
    frase_es: "Estoy tan solo.",
    personaje: "Conquest",
    temporada: 3
  },
  {
    frase: "Viltrumites do not kill for pleasure.",
    frase_es: "Los viltrumitas no matan por placer.",
    personaje: "Anissa",
    temporada: 2
  },
  {
    frase: "You've survived your first true battle.",
    frase_es: "Sobreviviste a tu primera verdadera batalla.",
    personaje: "Kregg",
    temporada: 2
  },
  {
    frase: "I don't use screws. My fastenings are all magnetic interlocks.",
    frase_es: "No uso tornillos. Mis sujeciones son todas cierres magnéticos.",
    personaje: "Rudy Connors (Robot)",
    temporada: 1
  },
  {
    frase: "I'm fine. What's happening with Mark and Omni-Man?",
    frase_es: "Estoy bien. ¿Qué está pasando con Mark y Omni-Man?",
    personaje: "Eve Wilkins",
    temporada: 1
  },
  {
    frase: "Leave no one alive.",
    frase_es: "No dejes a nadie con vida.",
    personaje: "Thragg",
    temporada: 4
  },
  {
    frase: "Killing you is an act of mercy.",
    frase_es: "Matarte es un acto de misericordia.",
    personaje: "Battle Beast",
    temporada: 1
  },
  {
    frase: "Isn't there a dick size requirement?",
    frase_es: "¿No hay un requisito de tamaño de pe**?",
    personaje: "Monster Girl",
    temporada: 1
  },
  {
    frase: "Somebody ought to teach you some motherfucking.",
    frase_es: "Alguien debería enseñarte algo de malditos.",
    personaje: "Rex",
    temporada: 1
  },
  {
    frase: "This Some Bulls**t.",
    frase_es: "Esto es una mier**.",
    personaje: "Titan",
    temporada: 1
  },
  {
    frase: "This is still some bulls**t.",
    frase_es: "Esto sigue siendo una mier**.",
    personaje: "Titan",
    temporada: 3
  },
  {
    frase: "We will honor our fallen, rebuild ourselves at any cost and destroy those who throught they could extinguish us. We are viltrumites. We are whitout end.",
    frase_es: "Honraremos a nuestros caídos, nos reconstruiremos a cualquier precio y destruiremos a quienes pensaron que podían aniquilarnos. Somos viltrumitas. Somos eternos.",
    personaje: "Thragg",
    temporada: 4
  },
  {
    frase: "You dont have a choice. And yet, you must still make one. Do you and your planet accept my terms? Or do you choose annihilation for both our people?",
    frase_es: "No tienes opción. Y, sin embargo, debes elegir. ¿Aceptan tú y tu planeta mis condiciones? ¿O prefieren la aniquilación de ambos pueblos?",
    personaje: "Thragg",
    temporada: 4
  },
  {
    frase: "You're a walking nuclear bomb, Mark. The most powerful thing on this planet, and you cant even buy a drink yet. I didnt try to handle you i wouldnt be doing my job.",
    frase_es: "Eres una bomba nuclear andante, Mark. La criatura más poderosa del planeta, y ni siquiera puedes comprarte una bebida. Si no intentara controlarte, no estaría haciendo bien mi trabajo.",
    personaje: "Cecil Stedman",
    temporada: 4
  },
  {
    frase: "We cannot fight against change. But we can support our loved ones as they face it.",
    frase_es: "No podemos luchar contra el cambio. Pero podemos apoyar a nuestros seres queridos mientras lo afrontan.",
    personaje: "Debbie Grayson",
    temporada: 4
  },
  {
    frase: "When you know someone for so long, they're always the same to you. It's hard to let them change or madure.",
    frase_es: "Cuando conoces a alguien durante tanto tiempo, siempre te parece la misma persona. Es difícil dejar que cambie o madure.",
    personaje: "Eve Wilkins",
    temporada: 4
  },
  {
    frase: "It doesnt matter if you're a superhero or an ordinary joe. Relationship arent easy.",
    frase_es: "Da igual si eres un superhéroe o una persona común y corriente. Las relaciones no son fáciles.",
    personaje: "Art Rosenbaum",
    temporada: 2
  },
  {
    frase: "I... dress heroes, Nolan.",
    frase_es: "Yo visto a héroes, Nolan.",
    personaje: "Art Rosenbaum",
    temporada: 4
  },
  {
    frase: "Nolan has superpowers. He’s indestructible. That’s not strength—that’s just having it easy. You, on the other hand—you truly have strength. Living with Nolan, standing up to him, raising Mark the way you did... Hell, you’re the real reason we’re all still alive and not enslaved—or worse.",
    frase_es: "Nolan tiene superpoderes. Es indestructible. Eso no es fuerza. Eso es tenerlo fácil. Tú sí que tienes fuerza. Vivir con Nolan, enfrentarte a él, criar a Mark como lo hiciste. Diablos, tú eres la verdadera razón por la que todos seguimos vivos y no somos esclavos, o algo peor.",
    personaje: "Art Rosenbaum",
    temporada: 1
  },

  // ---------- Agregá tus frases nuevas ACÁ ABAJO ----------
  // Ejemplo (borrá el /* y el */ para activarlo una vez que lo completes):
  /*
  {
    frase: "Escribí acá la cita textual del personaje",
    
    personaje: "Nombre exacto como está en personajes.js",
    temporada: 1
  },
  */
];
