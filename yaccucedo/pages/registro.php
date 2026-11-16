<?php
require __DIR__ . '/../php/config.php';

if (usuario_actual()) {
    redirigir('cuenta.php');
}

$errores = [];
$usuario = '';
$email   = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim((string)($_POST['usuario'] ?? ''));
    $email   = trim((string)($_POST['email'] ?? ''));
    $pass1   = (string)($_POST['password'] ?? '');
    $pass2   = (string)($_POST['password2'] ?? '');

    if (!csrf_valido()) {
        $errores[] = 'La sesión del formulario expiró. Probá de nuevo.';
    }
    if (!preg_match('/^[A-Za-z0-9_]{3,20}$/', $usuario)) {
        $errores[] = 'El usuario debe tener entre 3 y 20 caracteres: letras, números o guion bajo.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 120) {
        $errores[] = 'Ingresá un email válido.';
    }
    if (strlen($pass1) < 8) {
        $errores[] = 'La contraseña debe tener al menos 8 caracteres.';
    } elseif (strlen($pass1) > 72) {
        $errores[] = 'La contraseña no puede superar los 72 caracteres.';
    } elseif ($pass1 !== $pass2) {
        $errores[] = 'Las contraseñas no coinciden.';
    }

    if (!$errores) {
        $st = db()->prepare('SELECT usuario, email FROM usuarios WHERE usuario = ? OR email = ?');
        $st->execute([$usuario, $email]);
        foreach ($st->fetchAll() as $f) {
            if (strcasecmp($f['usuario'], $usuario) === 0) { $errores[] = 'Ese nombre de usuario ya está en uso.'; }
            if (strcasecmp($f['email'], $email) === 0)     { $errores[] = 'Ese email ya está registrado.'; }
        }
    }

    if (!$errores) {
        $st = db()->prepare('INSERT INTO usuarios (usuario, email, password_hash) VALUES (?, ?, ?)');
        $st->execute([$usuario, $email, password_hash($pass1, PASSWORD_DEFAULT)]);
        iniciar_sesion_de((int)db()->lastInsertId());
        redirigir('cuenta.php?nuevo=1');
    }
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>INVENCIDLE - Registro</title>
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
        <form method="post" action="registro.php" novalidate>
            <h2>Crear cuenta</h2>
            <?php foreach ($errores as $err): ?><p class="msg msg-error" role="alert"><?= e($err) ?></p><?php endforeach; ?>
            <?= csrf_campo() ?>
            <label for="usuario">Usuario:</label>
            <input type="text" id="usuario" name="usuario" value="<?= e($usuario) ?>" maxlength="20" autocomplete="username" required autofocus>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="<?= e($email) ?>" maxlength="120" autocomplete="email" required>
            <label for="password">Contraseña (mín. 8):</label>
            <input type="password" id="password" name="password" autocomplete="new-password" required>
            <label for="password2">Repetir contraseña:</label>
            <input type="password" id="password2" name="password2" autocomplete="new-password" required>
            <button type="submit">Registrarme</button>
            <p class="aux">¿Ya tenés cuenta? <a href="iniciar_sesion.php">Iniciá sesión</a></p>
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
