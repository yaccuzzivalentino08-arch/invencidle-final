<?php
require __DIR__ . '/../php/config.php';

$u = usuario_actual();
if (!$u) {
    redirigir('iniciar_sesion.php');
}
$esNuevo = isset($_GET['nuevo']);
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>INVENCIDLE - Mi cuenta</title>
    <link rel="stylesheet" href="../css/iniciar.css">
    <link rel="stylesheet" href="../css/footer.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Oswald:wght@200..700&display=swap" rel="stylesheet">
    <link rel="icon" href="../favicon.svg" type="image/svg+xml">
    <link rel="icon" href="../favicon.ico" sizes="32x32">
    <link rel="apple-touch-icon" href="../apple-touch-icon.png">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="stylesheet" href="../css/titulo.css">
    <script src="../js/titulo.js" defer></script>
    <script src="../js/racha.js" defer></script>

</head>
<body class="footer-arriba">
    <div class="barra-superior" role="navigation" aria-label="Contacto">
        <a href="mailto:tucorreo@gmail.com">tucorreo@gmail.com</a>
        <a href="nosotros.html">Sobre nosotros</a>
    </div>
    <header>
        <h1 class="titulo-sangre"><a href="../index.html">INVENCIDLE</a></h1>
    </header>
    <main>
        <section class="tarjeta-cuenta">
            <h2><?= $esNuevo ? '¡Cuenta creada!' : 'Mi cuenta' ?></h2>
            <p class="bienvenida">Hola, <strong><?= e($u['usuario']) ?></strong></p>
            <p class="dato-cuenta"><?= e($u['email']) ?></p>
            <p class="dato-cuenta">Miembro desde <?= e(substr($u['creado_en'], 0, 10)) ?></p>
            <a href="jugar.html" class="boton-cuenta">Jugar</a>
            <form method="post" action="logout.php" class="form-salir">
                <?= csrf_campo() ?>
                <button type="submit">Cerrar sesión</button>
            </form>
        </section>
    </main>
    <footer class="footer-sitio">
        <nav class="footer-links" aria-label="Mapa del sitio">
            <a href="../index.html">Inicio</a>
            <a href="jugar.html">Jugar</a>
            <a href="clasico.html">Clásico</a>
            <a href="frase.html">Frase</a>
            <a href="como_se_juega.html">Cómo se juega</a>
            <a href="iniciar_sesion.php">Iniciar sesión</a>
            <a href="nosotros.html">Sobre nosotros</a>
        </nav>
        <p class="footer-titulo">Adivina el personaje de invencible de hoy</p>
        <p class="footer-dato">Hasta ahora hay 39 personajes</p>
        <p class="footer-autores">by Yaccuzzi y Saucedo</p>
    </footer>
</body>
</html>
