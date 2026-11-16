<?php
/* config.php - conexión a la base de datos (SQLite), sesión y helpers de seguridad.
   Se incluye al principio de cada página PHP: require __DIR__ . '/../php/config.php'; */

declare(strict_types=1);

/* ---------- Sesión ---------- */
if (session_status() === PHP_SESSION_NONE) {
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => $https,
        'httponly' => true,       // el JavaScript no puede leer la cookie
        'samesite' => 'Lax',
    ]);
    session_start();
}

/* ---------- Base de datos ---------- */
function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $dir = __DIR__ . '/../data';
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        $pdo = new PDO('sqlite:' . $dir . '/usuarios.sqlite');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->exec('CREATE TABLE IF NOT EXISTS usuarios (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario       TEXT NOT NULL UNIQUE COLLATE NOCASE,
            email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
            password_hash TEXT NOT NULL,
            creado_en     TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )');

        /* Columnas de la racha (se agregan solo si la base ya existía sin ellas) */
        $cols = array_column($pdo->query('PRAGMA table_info(usuarios)')->fetchAll(), 'name');
        $nuevas = [
            'racha'           => 'INTEGER NOT NULL DEFAULT 0',   // racha actual
            'ultima_victoria' => 'INTEGER',                      // timestamp (segundos) de la última victoria
            'dia_clasico'     => 'TEXT',                         // último día (Y-m-d) en que sumó ganando Clásico
            'dia_frase'       => 'TEXT',                         // último día (Y-m-d) en que sumó ganando Frase
        ];
        foreach ($nuevas as $nombre => $def) {
            if (!in_array($nombre, $cols, true)) {
                $pdo->exec("ALTER TABLE usuarios ADD COLUMN $nombre $def");
            }
        }
    }
    return $pdo;
}

/* ---------- Racha ----------
   - Suma 1 cada vez que el usuario gana el modo Clásico o el modo Frase.
   - Cuenta una sola vez por modo y por día (el personaje/frase es el mismo todo el día,
     si no se podría "farmear" la racha recargando la página y ganando de nuevo).
   - Si pasan 24 horas desde la última victoria sin ganar ninguno de los dos modos, vuelve a 0. */
const RACHA_VENCE_SEGUNDOS = 24 * 3600;
date_default_timezone_set('America/Argentina/Buenos_Aires');   // define qué es "un día" para el tope por modo

function racha_actual(int $id): int
{
    $pdo = db();
    $st = $pdo->prepare('SELECT racha, ultima_victoria FROM usuarios WHERE id = ?');
    $st->execute([$id]);
    $f = $st->fetch();
    if (!$f) {
        return 0;
    }
    $racha = (int)$f['racha'];
    if ($racha > 0 && (empty($f['ultima_victoria']) || time() - (int)$f['ultima_victoria'] > RACHA_VENCE_SEGUNDOS)) {
        $pdo->prepare('UPDATE usuarios SET racha = 0 WHERE id = ?')->execute([$id]);
        return 0;
    }
    return $racha;
}

/* $modo: 'clasico' o 'frase'. Devuelve ['racha' => int, 'sumo' => bool] */
function racha_registrar_victoria(int $id, string $modo): array
{
    $col = $modo === 'clasico' ? 'dia_clasico' : 'dia_frase';   // nombre fijo, nunca viene del usuario
    $pdo = db();
    $pdo->exec('BEGIN IMMEDIATE');                              // evita carreras entre dos pestañas
    try {
        $st = $pdo->prepare("SELECT racha, ultima_victoria, $col AS dia FROM usuarios WHERE id = ?");
        $st->execute([$id]);
        $f = $st->fetch();
        $racha = (int)($f['racha'] ?? 0);
        $ahora = time();
        if ($racha > 0 && (empty($f['ultima_victoria']) || $ahora - (int)$f['ultima_victoria'] > RACHA_VENCE_SEGUNDOS)) {
            $racha = 0;                                         // se le pasaron las 24 h
        }
        $hoy  = date('Y-m-d');
        $sumo = $f && $f['dia'] !== $hoy;
        if ($sumo) {
            $racha++;
        }
        $pdo->prepare("UPDATE usuarios SET racha = ?, ultima_victoria = ?, $col = ? WHERE id = ?")
            ->execute([$racha, $sumo ? $ahora : ($f['ultima_victoria'] ?? $ahora), $sumo ? $hoy : $f['dia'], $id]);
        $pdo->exec('COMMIT');
    } catch (Throwable $ex) {
        $pdo->exec('ROLLBACK');
        throw $ex;
    }
    return ['racha' => $racha, 'sumo' => $sumo];
}

/* ---------- Helpers ---------- */
function e(string $texto): string               // escapar texto antes de mostrarlo en HTML
{
    return htmlspecialchars($texto, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function usuario_actual(): ?array               // datos del usuario logueado (o null)
{
    if (empty($_SESSION['usuario_id'])) {
        return null;
    }
    $st = db()->prepare('SELECT id, usuario, email, creado_en FROM usuarios WHERE id = ?');
    $st->execute([$_SESSION['usuario_id']]);
    return $st->fetch() ?: null;
}

function iniciar_sesion_de(int $id): void       // marca la sesión como logueada
{
    session_regenerate_id(true);                // evita fijación de sesión
    $_SESSION['usuario_id'] = $id;
}

function csrf_token(): string                   // token para proteger los formularios
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_campo(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

function csrf_valido(): bool
{
    return isset($_POST['csrf'], $_SESSION['csrf'])
        && is_string($_POST['csrf'])
        && hash_equals($_SESSION['csrf'], $_POST['csrf']);
}

function redirigir(string $url): never
{
    header('Location: ' . $url);
    exit;
}
