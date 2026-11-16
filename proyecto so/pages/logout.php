<?php
/* logout.php - cierra la sesión. Solo acepta POST con token CSRF
   (así otra web no puede desloguear al usuario con un simple link/imagen). */
require __DIR__ . '/../php/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && csrf_valido()) {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}
redirigir('iniciar_sesion.php');
