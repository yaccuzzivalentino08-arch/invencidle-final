<?php
require __DIR__ . '/../php/config.php';

// Si ya está logueado, directo a su cuenta
if (usuario_actual()) {
    redirigir('cuenta.php');
}

$error   = '';
$usuario = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario  = trim((string)($_POST['usuario'] ?? ''));
    $password = (string)($_POST['password'] ?? '');

    if (!csrf_valido()) {
        $error = 'La sesión del formulario expiró. Probá de nuevo.';
    } elseif ($usuario === '' || $password === '') {
        $error = 'Completá usuario y contraseña.';
    } else {
        // Se puede entrar con el nombre de usuario o con el email
        $st = db()->prepare('SELECT id, password_hash FROM usuarios WHERE usuario = ? OR email = ?');
        $st->execute([$usuario, $usuario]);
        $fila = $st->fetch();

        if ($fila && password_verify($password, $fila['password_hash'])) {
            iniciar_sesion_de((int)$fila['id']);
            redirigir('cuenta.php');
        }
        usleep(400000);   // frena un poco los intentos de adivinar contraseñas
        $error = 'Usuario o contraseña incorrectos.';   // mismo mensaje para ambos casos
    }
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>INVENCIDLE - Iniciar sesión</title>
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
        <form method="post" action="iniciar_sesion.php" novalidate>
            <h2>Iniciar sesión</h2>
            <?php if ($error): ?><p class="msg msg-error" role="alert"><?= e($error) ?></p><?php endif; ?>
            <?= csrf_campo() ?>
            <label for="usuario">Usuario o email:</label>
            <input type="text" id="usuario" name="usuario" value="<?= e($usuario) ?>" autocomplete="username" required autofocus>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" autocomplete="current-password" required>
            <button type="submit">Entrar</button>
            <p class="aux">¿No tenés cuenta? <a href="registro.php">Registrate</a></p>
        </form>
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
