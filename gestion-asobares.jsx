import React, { useState } from 'react';

// Logo Asobares como SVG
const AsobaresLogo = ({ size = 180 }) => (
  <svg viewBox="0 0 400 80" width={size} height={size * 0.2}>
    <g fill="#E63329">
      <path d="M30 10 C10 10 0 25 0 40 C0 55 10 70 30 70 C40 70 48 65 52 58 L52 70 L65 70 L65 40 L30 40 L30 52 L50 52 C48 60 40 65 30 65 C18 65 10 55 10 40 C10 25 18 15 30 15 C38 15 45 20 48 28 L60 24 C55 14 44 10 30 10Z"/>
      <path d="M75 10 L75 70 L88 70 L88 45 L115 45 C130 45 140 38 140 27.5 C140 17 130 10 115 10 L75 10Z M88 20 L112 20 C122 20 128 23 128 27.5 C128 32 122 35 112 35 L88 35 L88 20Z"/>
      <text x="150" y="55" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold">asobares</text>
    </g>
    <text x="150" y="75" fontFamily="Arial, sans-serif" fontSize="12" fill="#E63329">Asociación de Bares y Restaurantes de Colombia</text>
  </svg>
);

// Usuarios iniciales con cargos de Asobares
const initialUsers = [
  { id: 1, username: 'admin', name: 'Administrador', password: 'admin123', role: 'admin', cargo: 'Administrador', avatar: '👔' },
  { id: 2, username: 'eduardo.montoya', name: 'Eduardo Montoya', password: 'asobares123', role: 'user', cargo: 'Dirección Ejecutiva', avatar: '👨‍💼' },
  { id: 3, username: 'nereida.sanchez', name: 'Nereida Sanchez', password: 'asobares123', role: 'user', cargo: 'Dirección de Proyectos', avatar: '👩‍💼' },
  { id: 4, username: 'carlos.ulloa', name: 'Carlos Ulloa', password: 'asobares123', role: 'user', cargo: 'Dirección Clúster DJ', avatar: '👨‍🎵' },
  { id: 5, username: 'felipe.calderon', name: 'Felipe Calderón', password: 'asobares123', role: 'user', cargo: 'Dirección Círculo Gastro', avatar: '👨‍🍳' },
  { id: 6, username: 'lina.vasquez', name: 'Lina Vásquez', password: 'asobares123', role: 'user', cargo: 'Soporte Organizacional Afiliados', avatar: '👩‍💻' },
  { id: 7, username: 'sebastian.henao', name: 'Sebastián Henao', password: 'asobares123', role: 'user', cargo: 'Diseño Web', avatar: '👨‍🎨' },
  { id: 8, username: 'wilson.cardenas', name: 'Wilson Cardenas', password: 'asobares123', role: 'user', cargo: 'Community Manager & Graf', avatar: '📱' },
  { id: 9, username: 'andrea.chaparro', name: 'Andrea Chaparro', password: 'asobares123', role: 'user', cargo: 'Dirección Jurídica', avatar: '⚖️' },
];

// Cargos disponibles
const cargos = [
  'Dirección Ejecutiva',
  'Dirección de Proyectos', 
  'Dirección Clúster DJ',
  'Dirección Círculo Gastro',
  'Soporte Organizacional Afiliados',
  'Diseño Web',
  'Community Manager & Graf',
  'Dirección Jurídica',
];

// Ejes estratégicos
const ejesEstrategicos = [
  'Asobares',
  'Proyectos',
  'Cluster DJ',
  'Círculo Gastro',
  'Mi destino tu noche',
  'Fontur',
  'Alianza OSA',
  'Asobares Medellín',
  'Formación',
  'Comunicaciones',
  'Otro',
];

// Meses
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Estados
const statusLabels = {
  'planeado': { label: 'Planeado', color: '#3b82f6', bg: '#dbeafe' },
  'en-curso': { label: 'En Curso', color: '#f59e0b', bg: '#fef3c7' },
  'completado': { label: 'Completado', color: '#10b981', bg: '#d1fae5' },
  'retrasado': { label: 'Retrasado', color: '#ef4444', bg: '#fee2e2' },
};

// Tareas iniciales basadas en el Excel
const initialTasks = [
  { id: 1, mes: 'Diciembre', cargo: 'Diseño Web', responsable: 7, proyecto: 'Montar Landing Círculo Gastro', ejeEstrategico: 'Círculo Gastro', fechaInicio: '2025-12-15', fechaFin: '2025-12-26', estado: 'planeado', resultado: 'En proceso', descripcion: 'Crear Landing con la información del Círculo gastro', objetivo: 'Dejarla terminada', kpi: '', meta: '', actividades: '', requerimientos: 'Pdf presentacion círculo gastro', aliados: '', formacion: '', compromisos: '', observaciones: '' },
  { id: 2, mes: 'Diciembre', cargo: 'Dirección de Proyectos', responsable: 3, proyecto: 'Liquidaciones Derecho de Autor', ejeEstrategico: 'Proyectos', fechaInicio: '2026-12-16', fechaFin: '2026-12-20', estado: 'completado', resultado: 'Completado', descripcion: 'Se entregaron los recibos y quedo la solicitud de envio de base', objetivo: 'Entregar las Liquidaciones', kpi: '', meta: '', actividades: 'Solicitud de liquidaciones', requerimientos: '', aliados: 'OSA', formacion: '', compromisos: 'Solicitar las liquidaciones segun compromisos de expobar', observaciones: '' },
  { id: 3, mes: 'Diciembre', cargo: 'Dirección de Proyectos', responsable: 3, proyecto: 'Actualización Pagina Web Niglife', ejeEstrategico: 'Proyectos', fechaInicio: '2026-12-17', fechaFin: '2026-12-23', estado: 'retrasado', resultado: 'Pendiente', descripcion: 'Actualizar logos y dirección', objetivo: '', kpi: '', meta: '', actividades: 'Actualizar logos y dirección', requerimientos: 'Enviado a CM', aliados: '', formacion: '', compromisos: '', observaciones: '' },
  { id: 4, mes: 'Diciembre', cargo: 'Diseño Web', responsable: 7, proyecto: 'Actualizar web Asobares', ejeEstrategico: 'Asobares', fechaInicio: '2025-12-19', fechaFin: '2025-12-22', estado: 'planeado', resultado: 'En proceso', descripcion: 'Actualizar datos del equipo de trabajo', objetivo: 'Dejar los datos del equipo completos', kpi: '', meta: '', actividades: '', requerimientos: '', aliados: '', formacion: '', compromisos: '', observaciones: '' },
  { id: 5, mes: 'Enero', cargo: 'Dirección Clúster DJ', responsable: 4, proyecto: 'Actualización Base de Datos', ejeEstrategico: 'Cluster DJ', fechaInicio: '2026-01-05', fechaFin: '2026-01-10', estado: 'completado', resultado: 'En proceso', descripcion: 'Actualizar la base de datos eliminando repetidos', objetivo: '', kpi: '', meta: '', actividades: '', requerimientos: '', aliados: '', formacion: '', compromisos: '', observaciones: '' },
];

export default function GestionAsobares() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState('dashboard');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterMes, setFilterMes] = useState('all');
  const [filterEstado, setFilterEstado] = useState('all');
  const [filterCargo, setFilterCargo] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = () => {
    const user = users.find(u => u.username === loginUsername && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setLoginError('');
      showNotification(`¡Bienvenido, ${user.name}!`);
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('dashboard');
    setLoginUsername('');
    setLoginPassword('');
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
      showNotification('Tarea actualizada correctamente');
    } else {
      const newTask = {
        ...taskData,
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
      };
      setTasks([...tasks, newTask]);
      showNotification('Tarea creada correctamente');
    }
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    showNotification('Tarea eliminada');
  };

  const handleCreateUser = (userData) => {
    const avatars = ['👤', '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻'];
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      role: 'user',
    };
    setUsers([...users, newUser]);
    setShowUserModal(false);
    showNotification('Usuario creado correctamente');
  };

  const filteredTasks = tasks.filter(task => {
    if (filterMes !== 'all' && task.mes !== filterMes) return false;
    if (filterEstado !== 'all' && task.estado !== filterEstado) return false;
    if (filterCargo !== 'all' && task.cargo !== filterCargo) return false;
    if (searchTerm && !task.proyecto.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    completado: tasks.filter(t => t.estado === 'completado').length,
    enCurso: tasks.filter(t => t.estado === 'en-curso').length,
    planeado: tasks.filter(t => t.estado === 'planeado').length,
    retrasado: tasks.filter(t => t.estado === 'retrasado').length,
  };

  const cumplimiento = stats.total > 0 ? Math.round((stats.completado / stats.total) * 100) : 0;

  const userStats = users.filter(u => u.role !== 'admin').map(user => {
    const userTasks = tasks.filter(t => t.responsable === user.id);
    return {
      ...user,
      total: userTasks.length,
      completado: userTasks.filter(t => t.estado === 'completado').length,
      enCurso: userTasks.filter(t => t.estado === 'en-curso').length,
      planeado: userTasks.filter(t => t.estado === 'planeado').length,
      retrasado: userTasks.filter(t => t.estado === 'retrasado').length,
      cumplimiento: userTasks.length > 0 
        ? Math.round((userTasks.filter(t => t.estado === 'completado').length / userTasks.length) * 100) 
        : 0,
    };
  });

  // LOGIN SCREEN
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        padding: '20px',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '48px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 60px rgba(230, 51, 41, 0.2)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <svg viewBox="0 0 100 50" width="160" height="80">
                <g fill="#E63329">
                  <path d="M12 8C5 8 0 14 0 22C0 30 5 36 12 36C16 36 19 34 21 31L21 36L27 36L27 22L12 22L12 28L24 28C23 32 18 35 12 35C6 35 2 30 2 22C2 14 6 9 12 9C16 9 19 11 21 15L26 13C23 9 18 8 12 8Z"/>
                  <path d="M32 8L32 36L38 36L38 24L52 24C60 24 65 20 65 14C65 8 60 4 52 4L32 8Z M38 12L50 12C56 12 60 14 60 18C60 22 56 24 50 24L38 24L38 12Z"/>
                  <text x="70" y="28" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900">asobares</text>
                </g>
              </svg>
            </div>
            <h1 style={{ margin: '0 0 8px', fontSize: '24px', color: '#1a1a2e', fontWeight: '700' }}>
              Gestión de Equipo
            </h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
              Asociación de Bares y Restaurantes de Colombia
            </p>
          </div>

          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                Usuario
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="nombre.apellido"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#E63329'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#E63329'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {loginError && (
              <p style={{ color: '#E63329', fontSize: '14px', margin: '0 0 16px', textAlign: 'center', fontWeight: '500' }}>
                {loginError}
              </p>
            )}
            <button
              type="button"
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(230, 51, 41, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(230, 51, 41, 0.4)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(230, 51, 41, 0.3)'; }}
            >
              Iniciar Sesión
            </button>
          </div>

          <div style={{
            marginTop: '28px',
            padding: '16px',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)',
            borderRadius: '12px',
            border: '1px solid #fecaca',
          }}>
            <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: '700', color: '#b91c1c' }}>
              🔑 Credenciales de prueba:
            </p>
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#991b1b', fontFamily: 'monospace' }}>
              Admin: admin / admin123
            </p>
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#991b1b', fontFamily: 'monospace' }}>
              Usuario: sebastian.henao / asobares123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: '#f8f9fa' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '16px 24px',
          borderRadius: '10px',
          background: notification.type === 'success' ? '#10b981' : '#E63329',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 1000,
        }}>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: '280px',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        boxSizing: 'border-box',
      }}>
        <div style={{ padding: '0 8px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
          <svg viewBox="0 0 100 30" width="140" height="42">
            <g fill="#E63329">
              <path d="M8 5C3 5 0 9 0 14C0 19 3 23 8 23C11 23 13 21 14 19L14 23L18 23L18 14L8 14L8 18L16 18C15 20 12 22 8 22C4 22 1 19 1 14C1 9 4 6 8 6C11 6 13 7 14 10L17 9C15 6 12 5 8 5Z"/>
              <path d="M21 5L21 23L25 23L25 15L35 15C41 15 44 12 44 9C44 6 41 3 35 3L21 5Z M25 8L34 8C38 8 41 9 41 12C41 15 38 16 34 16L25 16L25 8Z"/>
              <text x="48" y="18" fontFamily="Arial Black, sans-serif" fontSize="14" fontWeight="900">asobares</text>
            </g>
          </svg>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '8px 0 0', letterSpacing: '0.5px' }}>GESTIÓN DE EQUIPO</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {[
            { id: 'dashboard', icon: '📊', label: 'Dashboard' },
            { id: 'tasks', icon: '📋', label: 'Tareas' },
            { id: 'board', icon: '📌', label: 'Tablero Kanban' },
            { id: 'calendario', icon: '📅', label: 'Calendario' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '10px',
                border: 'none',
                background: view === item.id ? 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)' : 'transparent',
                color: view === item.id ? 'white' : '#94a3b8',
                fontSize: '15px',
                fontWeight: view === item.id ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          {currentUser.role === 'admin' && (
            <>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '12px 0' }}></div>
              <p style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', padding: '0 16px', margin: '0 0 8px', letterSpacing: '1px' }}>ADMINISTRACIÓN</p>
              <button
                onClick={() => setView('team')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: view === 'team' ? 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)' : 'transparent',
                  color: view === 'team' ? 'white' : '#94a3b8',
                  fontSize: '15px',
                  fontWeight: view === 'team' ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '18px' }}>👥</span>
                Equipo
              </button>
              <button
                onClick={() => setView('analytics')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: view === 'analytics' ? 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)' : 'transparent',
                  color: view === 'analytics' ? 'white' : '#94a3b8',
                  fontSize: '15px',
                  fontWeight: view === 'analytics' ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '18px' }}>📈</span>
                KPIs y Analíticas
              </button>
            </>
          )}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '36px' }}>{currentUser.avatar}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</p>
              <p style={{ color: '#E63329', fontSize: '11px', margin: '2px 0 0', fontWeight: '500' }}>{currentUser.cargo}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: '#94a3b8',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '32px' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
              {view === 'dashboard' && 'Dashboard'}
              {view === 'tasks' && 'Gestión de Tareas'}
              {view === 'board' && 'Tablero Kanban'}
              {view === 'calendario' && 'Calendario'}
              {view === 'team' && 'Gestión de Equipo'}
              {view === 'analytics' && 'KPIs y Analíticas'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0' }}>
              {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => { setEditingTask(null); setShowTaskModal(true); }}
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(230, 51, 41, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span> Nueva Tarea
          </button>
        </header>

        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {[
                { icon: '📋', value: stats.total, label: 'Total Tareas', color: '#1a1a2e' },
                { icon: '✅', value: stats.completado, label: 'Completadas', color: '#10b981' },
                { icon: '🔄', value: stats.enCurso, label: 'En Curso', color: '#f59e0b' },
                { icon: '📝', value: stats.planeado, label: 'Planeadas', color: '#3b82f6' },
                { icon: '⚠️', value: stats.retrasado, label: 'Retrasadas', color: '#E63329' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  borderLeft: `4px solid ${stat.color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{stat.icon}</span>
                  </div>
                  <p style={{ fontSize: '36px', fontWeight: '700', color: stat.color, margin: 0, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0', fontWeight: '500' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Cumplimiento General */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 20px' }}>Cumplimiento General</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                      <circle cx="75" cy="75" r="60" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                      <circle
                        cx="75" cy="75" r="60" fill="none" stroke="#E63329" strokeWidth="12"
                        strokeDasharray={`${(cumplimiento / 100) * 377} 377`}
                        strokeLinecap="round"
                        transform="rotate(-90 75 75)"
                        style={{ transition: 'stroke-dasharray 0.5s' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <span style={{ fontSize: '36px', fontWeight: '700', color: '#1a1a2e' }}>{cumplimiento}%</span>
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginTop: '16px' }}>Tareas completadas</p>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 20px' }}>Tareas Recientes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tasks.slice(0, 4).map(task => {
                    const responsable = users.find(u => u.id === task.responsable);
                    return (
                      <div key={task.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                          <span style={{ fontSize: '24px' }}>{responsable?.avatar}</span>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a2e', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.proyecto}</p>
                            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                              {responsable?.name} • {task.ejeEstrategico}
                            </p>
                          </div>
                        </div>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: statusLabels[task.estado].bg,
                          color: statusLabels[task.estado].color,
                          whiteSpace: 'nowrap',
                        }}>
                          {statusLabels[task.estado].label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tareas Retrasadas */}
            {stats.retrasado > 0 && (
              <div style={{ background: '#fef2f2', borderRadius: '16px', padding: '24px', border: '1px solid #fecaca' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#b91c1c', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚠️ Tareas Retrasadas ({stats.retrasado})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tasks.filter(t => t.estado === 'retrasado').map(task => {
                    const responsable = users.find(u => u.id === task.responsable);
                    return (
                      <div key={task.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        background: 'white',
                        borderRadius: '10px',
                      }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{task.proyecto}</p>
                          <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                            {responsable?.name} • Vence: {task.fechaFin}
                          </p>
                        </div>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', background: '#fee2e2', color: '#b91c1c' }}>
                          {task.cargo}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tasks List View */}
        {view === 'tasks' && (
          <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <select value={filterMes} onChange={(e) => setFilterMes(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer' }}>
                <option value="all">Todos los meses</option>
                {meses.map(mes => <option key={mes} value={mes}>{mes}</option>)}
              </select>
              <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer' }}>
                <option value="all">Todos los estados</option>
                {Object.entries(statusLabels).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
              </select>
              <select value={filterCargo} onChange={(e) => setFilterCargo(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer' }}>
                <option value="all">Todos los cargos</option>
                {cargos.map(cargo => <option key={cargo} value={cargo}>{cargo}</option>)}
              </select>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Proyecto / Acción</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Responsable</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Eje</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fechas</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map(task => {
                    const responsable = users.find(u => u.id === task.responsable);
                    return (
                      <tr key={task.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{task.proyecto}</p>
                          <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>{task.descripcion}</p>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>{responsable?.avatar}</span>
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a2e', margin: 0 }}>{responsable?.name}</p>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{task.cargo}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', background: '#f1f5f9', color: '#475569' }}>
                            {task.ejeEstrategico}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <p style={{ fontSize: '12px', color: '#1a1a2e', margin: 0 }}>📅 {task.fechaInicio}</p>
                          <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>🏁 {task.fechaFin}</p>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: statusLabels[task.estado].bg, color: statusLabels[task.estado].color }}>
                            {statusLabels[task.estado].label}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <button onClick={() => { setEditingTask(task); setShowTaskModal(true); }} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#f1f5f9', cursor: 'pointer', marginRight: '8px', fontSize: '14px' }}>✏️</button>
                          <button onClick={() => handleDeleteTask(task.id)} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#fee2e2', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredTasks.length === 0 && (
                <p style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>No se encontraron tareas</p>
              )}
            </div>
          </div>
        )}

        {/* Kanban Board View */}
        {view === 'board' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {Object.entries(statusLabels).map(([statusKey, statusVal]) => (
              <div key={statusKey} style={{ background: '#f1f5f9', borderRadius: '16px', padding: '16px', minHeight: '500px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '16px', borderTop: `4px solid ${statusVal.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>{statusVal.label}</h3>
                    <span style={{ background: statusVal.bg, color: statusVal.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                      {tasks.filter(t => t.estado === statusKey).length}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tasks.filter(t => t.estado === statusKey).map(task => {
                    const responsable = users.find(u => u.id === task.responsable);
                    return (
                      <div
                        key={task.id}
                        onClick={() => { setEditingTask(task); setShowTaskModal(true); }}
                        style={{ background: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)'; }}
                      >
                        <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', background: '#f1f5f9', color: '#475569' }}>
                          {task.ejeEstrategico}
                        </span>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a2e', margin: '12px 0 8px' }}>{task.proyecto}</h4>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px', lineHeight: '1.4' }}>{task.descripcion}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '16px' }}>{responsable?.avatar}</span>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>{responsable?.name?.split(' ')[0]}</span>
                          </div>
                          <span style={{ fontSize: '10px', color: '#94a3b8' }}>🏁 {task.fechaFin}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendario View */}
        {view === 'calendario' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 24px' }}>Próximas Fechas de Entrega</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tasks.sort((a, b) => new Date(a.fechaFin) - new Date(b.fechaFin)).map(task => {
                const responsable = users.find(u => u.id === task.responsable);
                const fecha = new Date(task.fechaFin);
                const hoy = new Date();
                const diasRestantes = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
                return (
                  <div key={task.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${statusLabels[task.estado].color}`,
                  }}>
                    <div style={{ textAlign: 'center', minWidth: '60px' }}>
                      <p style={{ fontSize: '28px', fontWeight: '700', color: '#E63329', margin: 0 }}>{fecha.getDate()}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0, textTransform: 'uppercase' }}>
                        {fecha.toLocaleDateString('es-CO', { month: 'short' })}
                      </p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{task.proyecto}</p>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                        {responsable?.avatar} {responsable?.name} • {task.ejeEstrategico}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: statusLabels[task.estado].bg, color: statusLabels[task.estado].color }}>
                        {statusLabels[task.estado].label}
                      </span>
                      <p style={{ fontSize: '12px', color: diasRestantes < 0 ? '#E63329' : diasRestantes < 7 ? '#f59e0b' : '#64748b', margin: '8px 0 0', fontWeight: '500' }}>
                        {diasRestantes < 0 ? `Vencida hace ${Math.abs(diasRestantes)} días` : diasRestantes === 0 ? 'Vence hoy' : `Faltan ${diasRestantes} días`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Team Management View */}
        {view === 'team' && currentUser.role === 'admin' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>Miembros del Equipo</h2>
              <button onClick={() => setShowUserModal(true)} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                + Añadir Usuario
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {users.map(user => {
                const userTasks = tasks.filter(t => t.responsable === user.id);
                const completadas = userTasks.filter(t => t.estado === 'completado').length;
                const porcentaje = userTasks.length > 0 ? Math.round((completadas / userTasks.length) * 100) : 0;
                return (
                  <div key={user.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <span style={{ fontSize: '48px' }}>{user.avatar}</span>
                      <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: user.role === 'admin' ? '#fee2e2' : '#f1f5f9', color: user.role === 'admin' ? '#E63329' : '#64748b' }}>
                        {user.role === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 4px' }}>{user.name}</h3>
                    <p style={{ fontSize: '13px', color: '#E63329', margin: '0 0 4px', fontWeight: '500' }}>{user.cargo}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>@{user.username}</p>
                    <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a2e', display: 'block' }}>{userTasks.length}</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Tareas</span>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', display: 'block' }}>{completadas}</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Completadas</span>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: porcentaje >= 70 ? '#10b981' : porcentaje >= 40 ? '#f59e0b' : '#E63329', display: 'block' }}>{porcentaje}%</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Cumplimiento</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics View */}
        {view === 'analytics' && currentUser.role === 'admin' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 20px' }}>Distribución por Estado</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(statusLabels).map(([key, val]) => {
                    const count = tasks.filter(t => t.estado === key).length;
                    const percent = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', color: '#1a1a2e', fontWeight: '500' }}>{val.label}</span>
                          <span style={{ fontSize: '14px', color: '#64748b' }}>{count} ({Math.round(percent)}%)</span>
                        </div>
                        <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${percent}%`, background: val.color, borderRadius: '5px', transition: 'width 0.3s' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 20px' }}>Tareas por Eje Estratégico</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {ejesEstrategicos.filter(eje => tasks.some(t => t.ejeEstrategico === eje)).map(eje => {
                    const count = tasks.filter(t => t.ejeEstrategico === eje).length;
                    const percent = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={eje} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ flex: 1, fontSize: '13px', color: '#1a1a2e' }}>{eje}</span>
                        <div style={{ width: '120px', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${percent}%`, background: '#E63329', borderRadius: '4px' }}></div>
                        </div>
                        <span style={{ fontSize: '13px', color: '#64748b', width: '30px', textAlign: 'right' }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 20px' }}>Ranking de Desempeño por Cargo</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Rank</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Responsable</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Planeadas</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Completadas</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>% Cumplimiento</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Semáforo</th>
                  </tr>
                </thead>
                <tbody>
                  {userStats.sort((a, b) => b.cumplimiento - a.cumplimiento).map((member, idx) => (
                    <tr key={member.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px' }}>
                        <span style={{ fontSize: '18px' }}>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '24px' }}>{member.avatar}</span>
                          <div>
                            <p style={{ fontWeight: '600', margin: 0, color: '#1a1a2e' }}>{member.name}</p>
                            <p style={{ fontSize: '12px', color: '#E63329', margin: 0 }}>{member.cargo}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center', fontWeight: '600' }}>{member.total}</td>
                      <td style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#10b981' }}>{member.completado}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${member.cumplimiento}%`, background: member.cumplimiento >= 70 ? '#10b981' : member.cumplimiento >= 40 ? '#f59e0b' : '#E63329', borderRadius: '5px' }}></div>
                          </div>
                          <span style={{ fontWeight: '700', color: member.cumplimiento >= 70 ? '#10b981' : member.cumplimiento >= 40 ? '#f59e0b' : '#E63329' }}>{member.cumplimiento}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center', fontSize: '24px' }}>
                        {member.cumplimiento >= 70 ? '🟢' : member.cumplimiento >= 40 ? '🟡' : '🔴'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          users={users}
          onSave={handleSaveTask}
          onClose={() => { setShowTaskModal(false); setEditingTask(null); }}
        />
      )}

      {/* User Modal - Solo Admin */}
      {showUserModal && currentUser.role === 'admin' && (
        <UserModal
          cargos={cargos}
          onSave={handleCreateUser}
          onClose={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
}

function TaskModal({ task, users, onSave, onClose }) {
  const [mes, setMes] = useState(task?.mes || meses[new Date().getMonth()]);
  const [cargo, setCargo] = useState(task?.cargo || cargos[0]);
  const [responsable, setResponsable] = useState(task?.responsable || users.find(u => u.role !== 'admin')?.id || '');
  const [proyecto, setProyecto] = useState(task?.proyecto || '');
  const [ejeEstrategico, setEjeEstrategico] = useState(task?.ejeEstrategico || ejesEstrategicos[0]);
  const [fechaInicio, setFechaInicio] = useState(task?.fechaInicio || new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(task?.fechaFin || '');
  const [estado, setEstado] = useState(task?.estado || 'planeado');
  const [resultado, setResultado] = useState(task?.resultado || '');
  const [descripcion, setDescripcion] = useState(task?.descripcion || '');
  const [objetivo, setObjetivo] = useState(task?.objetivo || '');
  const [kpi, setKpi] = useState(task?.kpi || '');
  const [meta, setMeta] = useState(task?.meta || '');
  const [actividades, setActividades] = useState(task?.actividades || '');
  const [requerimientos, setRequerimientos] = useState(task?.requerimientos || '');
  const [aliados, setAliados] = useState(task?.aliados || '');
  const [compromisos, setCompromisos] = useState(task?.compromisos || '');
  const [observaciones, setObservaciones] = useState(task?.observaciones || '');
  const [activeTab, setActiveTab] = useState('general');

  const handleSubmit = () => {
    if (!proyecto.trim()) return;
    onSave({
      mes, cargo, responsable: parseInt(responsable), proyecto, ejeEstrategico,
      fechaInicio, fechaFin, estado, resultado, descripcion, objetivo,
      kpi, meta, actividades, requerimientos, aliados, compromisos, observaciones
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #f1f5f9', background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: 0 }}>{task ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}</h2>
          <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.2)', fontSize: '20px', color: 'white', cursor: 'pointer' }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: '#f8f9fa' }}>
          {[
            { id: 'general', label: '📋 General' },
            { id: 'detalles', label: '📝 Detalles' },
            { id: 'seguimiento', label: '📊 Seguimiento' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '14px',
                border: 'none',
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#E63329' : '#64748b',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #E63329' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Proyecto / Acción *</label>
                <input type="text" value={proyecto} onChange={(e) => setProyecto(e.target.value)} placeholder="Nombre del proyecto o acción" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Mes</label>
                  <select value={mes} onChange={(e) => setMes(e.target.value)} style={inputStyle}>
                    {meses.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Eje Estratégico</label>
                  <select value={ejeEstrategico} onChange={(e) => setEjeEstrategico(e.target.value)} style={inputStyle}>
                    {ejesEstrategicos.map(eje => <option key={eje} value={eje}>{eje}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Cargo</label>
                  <select value={cargo} onChange={(e) => setCargo(e.target.value)} style={inputStyle}>
                    {cargos.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Responsable</label>
                  <select value={responsable} onChange={(e) => setResponsable(e.target.value)} style={inputStyle}>
                    {users.filter(u => u.role !== 'admin').map(user => (
                      <option key={user.id} value={user.id}>{user.avatar} {user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>📅 Fecha Inicio</label>
                  <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>🏁 Fecha Fin</label>
                  <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Estado</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value)} style={inputStyle}>
                    {Object.entries(statusLabels).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detalles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Descripción de la Acción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describe la tarea..." rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Objetivo del Mes</label>
                <textarea value={objetivo} onChange={(e) => setObjetivo(e.target.value)} placeholder="¿Qué se espera lograr?" rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Indicador (KPI)</label>
                  <input type="text" value={kpi} onChange={(e) => setKpi(e.target.value)} placeholder="KPI de gestión" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Meta del Mes</label>
                  <input type="text" value={meta} onChange={(e) => setMeta(e.target.value)} placeholder="Meta a alcanzar" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Actividades a Ejecutar</label>
                <textarea value={actividades} onChange={(e) => setActividades(e.target.value)} placeholder="Lista de actividades..." rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Requerimientos (Humanos/Técnicos/Presupuesto)</label>
                <textarea value={requerimientos} onChange={(e) => setRequerimientos(e.target.value)} placeholder="¿Qué se necesita?" rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Aliados Comerciales / Institucionales</label>
                <input type="text" value={aliados} onChange={(e) => setAliados(e.target.value)} placeholder="Aliados involucrados" style={inputStyle} />
              </div>
            </div>
          )}

          {activeTab === 'seguimiento' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Resultado / Avance</label>
                <textarea value={resultado} onChange={(e) => setResultado(e.target.value)} placeholder="Describe el avance o resultado actual..." rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Compromisos Adquiridos</label>
                <textarea value={compromisos} onChange={(e) => setCompromisos(e.target.value)} placeholder="Compromisos pendientes..." rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Observaciones Presidencia</label>
                <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} placeholder="Observaciones adicionales..." rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#f8f9fa' }}>
          <button type="button" onClick={onClose} style={{ padding: '12px 24px', borderRadius: '10px', border: '2px solid #e5e7eb', background: 'white', color: '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancelar</button>
          <button type="button" onClick={handleSubmit} style={{ padding: '12px 32px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 15px rgba(230, 51, 41, 0.3)' }}>{task ? 'Guardar Cambios' : 'Crear Tarea'}</button>
        </div>
      </div>
    </div>
  );
}

function UserModal({ cargos, onSave, onClose }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cargo, setCargo] = useState(cargos[0]);

  const handleSubmit = () => {
    if (!name.trim() || !username.trim() || !password.trim()) return;
    onSave({ name, username, password, cargo });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '450px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #f1f5f9', background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)', borderRadius: '20px 20px 0 0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: 0 }}>👤 Nuevo Usuario</h2>
          <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.2)', fontSize: '20px', color: 'white', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Nombre completo *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del usuario" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Nombre de usuario *</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nombre.apellido" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Contraseña *</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Cargo</label>
            <select value={cargo} onChange={(e) => setCargo(e.target.value)} style={inputStyle}>
              {cargos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '12px 24px', borderRadius: '10px', border: '2px solid #e5e7eb', background: 'white', color: '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancelar</button>
            <button type="button" onClick={handleSubmit} style={{ padding: '12px 32px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #E63329 0%, #c41e16 100%)', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Crear Usuario</button>
          </div>
        </div>
      </div>
    </div>
  );
}
