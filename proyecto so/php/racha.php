<?php
/* racha.php - API JSON de la racha.
   GET  -> { logueado, racha, csrf }                  (para mostrar la 🔥 en el header)
   POST -> body JSON { modo: "clasico" | "frase" }    (cuando el jugador gana)
           header X-CSRF-Token obligatorio.           -> { logueado, racha, sumo } */
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function responder(array $datos, int $codigo = 200): never
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

$u = usuario_actual();
if (!$u) {
    responder(['logueado' => false]);
}
$id = (int)$u['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!isset($_SESSION['csrf']) || !is_string($token) || !hash_equals($_SESSION['csrf'], $token)) {
        responder(['error' => 'csrf'], 403);
    }
    $cuerpo = json_decode((string)file_get_contents('php://input'), true);
    $modo = is_array($cuerpo) ? ($cuerpo['modo'] ?? '') : '';
    if ($modo !== 'clasico' && $modo !== 'frase') {
        responder(['error' => 'modo invalido'], 400);
    }
    $r = racha_registrar_victoria($id, $modo);
    responder(['logueado' => true, 'racha' => $r['racha'], 'sumo' => $r['sumo']]);
}

responder(['logueado' => true, 'racha' => racha_actual($id), 'csrf' => csrf_token()]);
