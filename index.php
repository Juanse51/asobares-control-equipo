<?php
// GESTOR DE TAREAS SIN MYSQL (Usa archivo datos.json)
session_start();
$archivo_db = 'datos.json';

// 1. Inicializar base de datos si no existe
if (!file_exists($archivo_db)) { file_put_contents($archivo_db, json_encode(['usuarios' => [], 'tareas' => []])); }
$db = json_decode(file_get_contents($archivo_db), true);

// 2. Lógica de Guardado
function guardarDB($db, $archivo) { file_put_contents($archivo, json_encode($db, JSON_PRETTY_PRINT)); }

// 3. Manejo de Login y Registro Básico (Usuario: admin, Clave: 123 por defecto si está vacío)
if (empty($db['usuarios'])) {
    $db['usuarios'][] = ['user' => 'admin', 'pass' => '123', 'rol' => 'admin'];
    $db['usuarios'][] = ['user' => 'equipo', 'pass' => '123', 'rol' => 'empleado'];
    guardarDB($db, $archivo_db);
}

// PROCESAR FORMULARIOS
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Login
    if (isset($_POST['login'])) {
        foreach ($db['usuarios'] as $u) {
            if ($u['user'] == $_POST['user'] && $u['pass'] == $_POST['pass']) {
                $_SESSION['user'] = $u['user'];
                $_SESSION['rol'] = $u['rol'];
            }
        }
    }
    // Nueva Tarea
    if (isset($_POST['nueva_tarea']) && isset($_SESSION['user'])) {
        $nueva = [
            'id' => uniqid(),
            'titulo' => $_POST['titulo'],
            'prioridad' => $_POST['prioridad'],
            'estado' => 'Pendiente',
            'asignado' => $_POST['asignado'],
            'creador' => $_SESSION['user']
        ];
        $db['tareas'][] = $nueva;
        guardarDB($db, $archivo_db);
    }
    // Cambiar Estado (Mover tarea)
    if (isset($_POST['cambiar_estado'])) {
        foreach ($db['tareas'] as &$t) {
            if ($t['id'] == $_POST['id_tarea']) {
                $t['estado'] = $_POST['nuevo_estado'];
            }
        }
        guardarDB($db, $archivo_db);
    }
    // Logout
    if (isset($_POST['logout'])) { session_destroy(); header("Refresh:0"); exit; }
}

// SI NO ESTÁ LOGUEADO, MOSTRAR LOGIN
if (!isset($_SESSION['user'])) {
?>
    <!DOCTYPE html>
    <html>
    <head><style>body{font-family:sans-serif; background:#f0f2f5; display:flex; justify-content:center; align-items:center; height:100vh;} form{background:white; padding:2rem; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1); display:flex; flex-direction:column; gap:10px;} input,button{padding:10px;}</style></head>
    <body>
        <form method="POST">
            <h2 style="text-align:center">Acceso Equipo</h2>
            <input type="text" name="user" placeholder="Usuario (admin o equipo)" required>
            <input type="password" name="pass" placeholder="Contraseña (123)" required>
            <button type="submit" name="login" style="background:#007bff; color:white; border:none; cursor:pointer">Entrar</button>
        </form>
    </body>
    </html>
<?php exit; } ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Tareas</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: sans-serif; background: #f4f6f8; margin: 0; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
        .task-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
        .card { padding: 15px; border-radius: 6px; background: #fff; border: 1px solid #eee; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #ccc; }
        .p-Alta { border-left-color: #dc3545; } .p-Media { border-left-color: #ffc107; } .p-Baja { border-left-color: #28a745; }
        .badge { padding: 3px 8px; border-radius: 10px; font-size: 0.8em; background: #eee; }
        .btn { padding: 5px 10px; cursor: pointer; }
        .stats-area { display: <?php echo ($_SESSION['rol'] == 'admin') ? 'block' : 'none'; ?>; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h3>Hola, <?php echo ucfirst($_SESSION['user']); ?> (<?php echo ucfirst($_SESSION['rol']); ?>)</h3>
        <form method="POST"><button name="logout" class="btn" style="background:#dc3545; color:white; border:none;">Salir</button></form>
    </div>

    <div class="stats-area">
        <h3>Rendimiento del Equipo</h3>
        <div style="height: 200px; width: 100%;">
            <canvas id="miGrafico"></canvas>
        </div>
    </div>

    <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <form method="POST" style="display: flex; gap: 10px; flex-wrap: wrap;">
            <input type="text" name="titulo" placeholder="Nueva tarea..." required style="flex-grow: 1; padding: 8px;">
            <select name="prioridad" style="padding: 8px;">
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
            <select name="asignado" style="padding: 8px;">
                <option value="equipo">Equipo General</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit" name="nueva_tarea" class="btn" style="background:#28a745; color:white; border:none;">+ Agregar</button>
        </form>
    </div>

    <div class="task-grid">
        <?php foreach (array_reverse($db['tareas']) as $t): ?>
            <div class="card p-<?php echo $t['prioridad']; ?>">
                <div style="display:flex; justify-content:space-between;">
                    <strong><?php echo $t['titulo']; ?></strong>
                    <span class="badge"><?php echo $t['estado']; ?></span>
                </div>
                <small>Asignado a: <?php echo $t['asignado']; ?></small>
                
                <form method="POST" style="margin-top: 10px;">
                    <input type="hidden" name="id_tarea" value="<?php echo $t['id']; ?>">
                    <?php if($t['estado'] != 'Completado'): ?>
                        <input type="hidden" name="nuevo_estado" value="Completado">
                        <button type="submit" name="cambiar_estado" class="btn" style="font-size:0.8em; width:100%;">Marcar Completado</button>
                    <?php else: ?>
                        <input type="hidden" name="nuevo_estado" value="Pendiente">
                        <button type="submit" name="cambiar_estado" class="btn" style="font-size:0.8em; width:100%;">Reabrir</button>
                    <?php endif; ?>
                </form>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<script>
    // Configuración del gráfico (Solo se dibuja si el canvas existe)
    const ctx = document.getElementById('miGrafico');
    if (ctx) {
        <?php 
            $completadas = 0; $pendientes = 0;
            foreach($db['tareas'] as $t) { if($t['estado']=='Completado') $completadas++; else $pendientes++; }
        ?>
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Completadas', 'Pendientes'],
                datasets: [{
                    label: 'Estado de Tareas',
                    data: [<?php echo $completadas; ?>, <?php echo $pendientes; ?>],
                    backgroundColor: ['#28a745', '#ffc107']
                }]
            },
            options: { maintainAspectRatio: false }
        });
    }
</script>
</body>
</html>