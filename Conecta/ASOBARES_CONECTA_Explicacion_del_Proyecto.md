# ASOBARES CONECTA — Explicación completa del proyecto

> Documento explicativo elaborado a partir de la revisión del código de `web/ASOBARES_CONECTA.html` (prototipo v0.3) y de la guía `README.md` incluida en el paquete. Complementa esa guía: aquí se explica **qué es, cómo funciona y cómo está construido**; el README detalla **qué falta implementar** para producción.

---

## 1. Qué es, en una frase

**ASOBARES CONECTA es una "mesa de negocios" interna de Asobares**: una aplicación web para que el equipo comercial gestione la relación con los **aliados** (empresas con convenio), conecte esos aliados con los **afiliados** (bares, restaurantes, DJs, artistas…) y convierta esas conexiones en **actividades y propuestas comerciales** que generen ingresos, con un **GO obligatorio de Presidencia** antes de presentar cualquier propuesta.

Hoy es un **prototipo local de un solo archivo HTML**: funciona en el navegador, guarda los datos en ese navegador y **no tiene servidor, usuarios reales, correo ni conexión con el CRM** (`https://gestion.asobares.org/`).

---

## 2. Contexto de negocio

### 2.1 El problema que resuelve

Asobares tiene aliados con convenio (proveedores de tecnología, sonido, formación, seguros, movilidad, etc.) y una base de afiliados con necesidades concretas. El valor de la asociación está en **cruzar ambos lados**, pero sin una herramienta:

- No se sabe qué aliados están "al día" y cuáles necesitan atención.
- No hay un flujo formal para que una idea se convierta en propuesta, se apruebe y se mida.
- No hay indicadores mensuales por plataforma (facturación, recaudo, sponsors, afiliados).
- No hay trazabilidad de quién hizo qué.

### 2.2 Objetivo

Fortalecer las alianzas existentes y generar ingresos adicionales. Cada iniciativa se clasifica en uno de tres tipos:

| Tipo | Significado | Regla en el código |
| --- | --- | --- |
| **Incluida en el convenio** | Actividad que el aliado ya paga con su convenio. | El ingreso adicional **debe ser 0**. |
| **Ampliación con cobro adicional** | Algo más allá del convenio, con cobro extra. | Se calcula margen = ingreso − costo. |
| **Negocio nuevo** | Oportunidad comercial nueva. | Igual que la anterior. |

### 2.3 Personas y roles

| Persona | Rol en la plataforma |
| --- | --- |
| **Eduardo Montoya** (Director Ejecutivo) | Responsable comercial. Lidera iniciativas y propuestas. |
| **Mariana Sánchez** (Soporte Organizacional) | Articula con los afiliados; recibe "tips" para conectarlos con aliados. |
| **Camilo Ospina Guzmán** (Presidente) | Único que da **GO** a propuestas y autoriza **eliminaciones** y **restauraciones**. |
| Jonathan Mejías, Carlos Ulloa, Felipe Calderón, Nereida Sánchez | Integrantes del equipo (p. ej. gestión de sponsors de Expobar). |
| **Sebastián** (webmaster) | Integración técnica: llevar el prototipo a producción. |

> ⚠️ En el prototipo los roles se **simulan** con el selector "Simular vista de". No hay autenticación: cualquiera puede elegir "Camilo Ospina".

### 2.4 Las plataformas (marcas) de Asobares

La aplicación trabaja con 7 "alcances", cada uno con su logo, colores y plantilla de PowerPoint propios:

1. **Asobares Bogotá & Colombia** (vista consolidada de la organización)
2. **Círculo Gastro** — gastronomía
3. **Mix & Shake** — coctelería / barras
4. **Clúster DJ** — DJs y artistas
5. **Expobar** — feria; se gestiona por sponsors
6. **Mi Destino Tu Noche (MDTN)** — plataforma de planes nocturnos y reservas
7. **Área en Vivo LAB** — música en vivo

Cada plataforma tiene **indicadores distintos** en el Panorama (ver §4.1).

---

## 3. Cómo se usa (flujo de trabajo del equipo)

```
           ┌────────────────────┐
           │  Aliados (24 del   │
           │  directorio web)   │
           └─────────┬──────────┘
                     │ servicios / compromisos
                     ▼
 Afiliado nuevo ──► Tips para Mariana ──► Tarea 48 h / Interacción
                     │
                     ▼
 Tips del lunes ──► Plan o actividad (sin presupuesto) ──► Resultado + participaciones
                     │
                     │ si requiere presupuesto
                     ▼
               Propuesta (borrador v1)
                     │ Solicitar GO
                     ▼
            Pendiente de GO ──► Camilo revisa las 6 diapositivas
                     │            y confirma revisión
         ┌───────────┼──────────────┐
         ▼           ▼              ▼
   GO aprobado   Ajustes        Descartada
         │       solicitados
         ▼
 Presentada al aliado → Aceptada → En ejecución → Ejecutada
                                       │
                                       └─► se crea automáticamente una actividad vinculada
```

### Ritmo semanal

- **Lunes 08:00 (hora Colombia):** se publica una nueva edición de "Tips del lunes", una sugerencia de acción por cada aliado activo.
- **Viernes — "Mesa del viernes" (60 min):** 15 min aliados · 15 min afiliados · 20 min iniciativas · 10 min responsables y fechas.
- **Mensual:** semáforo comercial por plataforma (facturación y nuevos aliados firmados).

---

## 4. Módulos de la aplicación

La navegación lateral (rutas por `#hash`) tiene estas secciones:

### 4.1 Panorama (`#inicio`)

Tablero principal. Se elige **plataforma** y **mes**.

- **Semáforo de gestión mensual:**
  - 🔴 **Rojo:** no hay facturación registrada en el mes.
  - 🟡 **Amarillo:** hay facturación pero ningún aliado nuevo firmado.
  - 🟢 **Verde:** hay ambas cosas.
- **Indicadores según la plataforma:**

| Plataforma | Indicadores |
| --- | --- |
| Asobares (consolidado) | Aliados confirmados, facturación del mes, interacciones con afiliados, actividades del mes, actividades realizadas, recaudo. Además, alerta comercial por cada plataforma. |
| Mix & Shake | Miembros de la comunidad, aliados con actividades, facturación y recaudo. |
| Círculo Gastro | Afiliados, inscritos, aliados con actividades y afiliados, aliados pagando, monto pagado. |
| Clúster DJ | DJs, artistas, aliados activos, facturación, aliados con actividades, aliados pagando / monto. |
| Expobar | Sponsors firmados, patrocinio en dinero, aportes en especie + **tabla de aportes por integrante** con semáforo. |
| Mi Destino Tu Noche | Planes publicados, reservas, clics, visitantes (último corte manual), sponsors, actividades con aliados y afiliados. |
| Área en Vivo LAB | Sponsors, actividades del mes, personas impactadas (participaciones), actividades a la fecha. |

- **Acciones rápidas:** registrar facturación, ver movimientos, registrar actividad, sumar sponsor o registrar miembro, actualizar métricas MDTN.

### 4.2 Aliados (`#aliados`)

- Directorio inicial de **24 aliados** tomado de `https://asobares.org/aliados/` el 20/09/2026 (SLS Idiomas, Siigo, Audionics, Cluvi, SAYCO, Mi Elegido VIP, etc.), cada uno con categoría, servicio, etiquetas temáticas y plataforma sugerida.
- Todos entran con estado **"Por confirmar"**: estar en el directorio web **no** significa tener convenio activo.
- Ficha editable: estado del convenio (Por confirmar / Activo / Inactivo / Prospecto), plataforma, fecha de firma, renovación, aporte mensual pactado, contacto, inconformidad, objetivo y compromisos.
- Un convenio **Activo exige fecha de firma**; la firma no puede ser futura y la renovación no puede ser anterior a la firma.
- Desde la ficha: planes y actividades vinculados, propuestas, interacciones con afiliados.

### 4.3 Planes y actividades (`#planes`)

- Una actividad puede tener **varios aliados** y **varios afiliados** participantes; se cuenta una sola vez en los totales.
- Si la actividad necesita **presupuesto adicional**, el sistema obliga a crearla como **Propuesta** y pasar por GO.
- Al registrar el resultado se pide evidencia y número de **participaciones** (no personas únicas). No se puede marcar como realizada una actividad con fecha futura.

### 4.4 Propuestas y tips (`#propuestas`)

- **Tips del lunes:** rotación semanal de 4 patrones (Consultorio de 20 minutos, Demostración con compradores, Un beneficio tres afiliados, Circuito de activaciones). Los tips "sencillos" crean una actividad; los de nivel "Mayor" abren una propuesta.
- **Plantillas PowerPoint** descargables por plataforma (6 diapositivas con logo y colores de la marca).
- **Formulario de propuesta:** título (≤100 caracteres), plataforma, aliados, tipo, responsable, objetivo, público, actividades, entregables, beneficios, indicadores, fecha, ingreso, costo (interno), condiciones y notas internas. Secciones ≤300 caracteres para que quepan en las diapositivas.
- **Cada edición crea una nueva versión** (v1, v2…), vuelve a "Borrador" y **exige un nuevo GO**.
- **Señales y fuentes:** ideas/tendencias con fuente pública verificable (solo URLs http/https).

### 4.5 Bandeja de GO (`#go`) y Revisión (`#revision`)

- Lista las propuestas **Pendientes de GO**.
- La vista de revisión muestra **las mismas 6 diapositivas** que se exportan a PowerPoint:
  1. Propuesta comercial (iniciativa / para quién)
  2. Objetivo y participantes
  3. Actividades y entregables
  4. Valor y medición
  5. Inversión y condiciones
  6. Próximos pasos
- Camilo debe **marcar "He revisado la propuesta completa vX"** antes de que se habilite el botón **Dar GO**. Esa confirmación queda ligada a la versión y a una "huella" del contenido; si algo cambia, se invalida.
- También puede **Pedir ajustes** o **Descartar**, siempre con un comentario obligatorio.
- La versión aprobada se congela (`approvedSnapshot`) y se guarda en el historial de versiones aprobadas, descargable.
- La versión externa **nunca incluye costos ni notas internas**.

### 4.6 Mesa del viernes (`#viernes`)

Agenda guiada de la reunión semanal: relaciones que requieren atención, necesidades de afiliados por resolver, decisiones pendientes de GO y próximas tareas.

### 4.7 Afiliados y oportunidades (`#afiliados`)

- Contadores: nuevos afiliados de la semana anterior, del mes y activos en Bogotá (deduplicados por identificador interno).
- Registro de afiliado/miembro: tipo (Afiliado, Inscrito, Miembro de comunidad, DJ, Artista), plataforma, ciudad, estado y **necesidad principal**.
- **Tips para Mariana:** al registrar un afiliado se cruzan sus necesidades con las etiquetas de los aliados (p. ej. "Sonido y convivencia" → Coningenierías, Audionics, Vértice Audio) y se sugieren hasta 3 aliados, con botón para asignarle a Mariana una tarea a **48 horas**.
- Registro de **interacciones** aliado ↔ afiliado y de **solicitudes de oportunidad**.

### 4.8 Seguimiento (`#tareas`)

Tareas con responsable y fecha límite; las vencidas aparecen como "Intervención prioritaria". Lista de renovaciones de convenio en los próximos 90 días.

### 4.9 Actividad del equipo (`#actividad`)

Bitácora de todas las acciones (quién, cuándo, en qué plataforma, qué hizo), filtrable por persona y plataforma. Permite añadir integrantes al equipo.

### 4.10 Eliminaciones y avisos (`#eliminaciones`)

- Nadie borra directamente: se **solicita la eliminación** con motivo.
- Camilo recibe una **notificación** (solo en el mismo navegador) y decide **autorizar** o **rechazar**.
- Si el registro cambió desde que se pidió su eliminación, la solicitud queda como "Requiere nueva solicitud".
- Lo eliminado se guarda en `deletedRecords` para trazabilidad.

### 4.11 Copia de seguridad

Botón en la barra lateral: exporta todos los datos a un JSON. **Restaurar** (reemplazar datos) solo está permitido en la vista de Presidencia.

---

## 5. Reglas de negocio importantes

- Directorio público ≠ convenio activo.
- **Facturación, recaudo, aporte mensual pactado y aportes en especie son conceptos distintos** y no se mezclan.
- Cada movimiento de facturación tiene **referencia única**; el pago no puede superar lo facturado; el recaudo se asigna al mes de la factura.
- En Expobar, el aporte en especie se muestra aparte del económico; un integrante sin sponsors firmados aparece en rojo.
- MDTN usa el **último corte acumulado** manual; no suma cortes entre sí.
- "Personas impactadas" son **participaciones**, no personas únicas.
- El **GO autoriza presentar** la propuesta al aliado; **no** equivale a contrato ni a ingreso confirmado.
- La "salud" de un aliado: **Intervención prioritaria** si tiene inconformidad o tareas vencidas; **Requiere atención** si no tiene plan este mes o renueva en ≤30 días; si no, **Al día**.

---

## 6. Ciclo de vida de una propuesta (máquina de estados)

| Estado actual | Puede pasar a | Quién |
| --- | --- | --- |
| Borrador | Pendiente de GO | Equipo |
| Ajustes solicitados | Pendiente de GO | Equipo |
| Pendiente de GO | GO aprobado / Ajustes solicitados / Descartada | **Solo Presidencia** |
| GO aprobado | Presentada al aliado | Equipo |
| Presentada al aliado | Aceptada por aliado | Equipo |
| Aceptada por aliado | En ejecución | Equipo |
| En ejecución | Ejecutada | Equipo |

Cualquier edición del contenido → nueva versión en **Borrador**. Al pasar a "En ejecución" se crea automáticamente una actividad en Planes vinculada a la propuesta.

---

## 7. Arquitectura técnica

### 7.1 Archivos del paquete

```
CONECTA/
├── ASOBARES_CONECTA_Resumen_e_Implementacion.md   (copia idéntica del README)
├── ASOBARES_CONECTA_Explicacion_del_Proyecto.md   (este documento)
└── ASOBARES_CONECTA/
    ├── README.md            Guía de implementación para Sebastián
    ├── SHA256SUMS.txt       Huellas de integridad (verificadas: coinciden)
    └── web/
        └── ASOBARES_CONECTA.html   Aplicación completa (~1,2 MB)
```

### 7.2 Un solo archivo autocontenido

`ASOBARES_CONECTA.html` contiene **todo**: HTML, CSS, JavaScript, logos y la plantilla PowerPoint. No usa librerías externas, no hace peticiones de red y no requiere compilación.

- **~100 KB** son código (276 líneas, ~126 funciones).
- **~1,1 MB** son recursos embebidos en dos constantes:
  - `BRANDS`: logos en PNG base64 + colores (fondo, tinta, acento) de cada una de las 7 plataformas.
  - `PPT_TEMPLATE`: los archivos internos (XML) de un `.pptx` de 6 diapositivas con marcadores `{{TITLE}}`, `{{OBJECTIVE}}`, etc.

### 7.3 Cómo funciona por dentro

| Aspecto | Implementación |
| --- | --- |
| Interfaz | JavaScript puro (sin framework). Cada vista es una función en `views` que devuelve HTML como texto; `render()` la pinta según `location.hash`. |
| Formularios | Ventanas `<dialog>` generadas con `openModal()`, `field()`, `area()`, `select()`, `pills()`. |
| Estado | Un único objeto global `state`. |
| Persistencia | `localStorage`, clave `asobares-conecta-v1` (no renombrar sin migración). |
| Auditoría | `audit()` añade una entrada a `state.log` con fecha, actor (el rol simulado), plataforma y texto. |
| Seguridad básica | `esc()` escapa todo el texto que se pinta (anti-XSS); `safeUrl()` solo admite http/https. |
| Fechas | Zona horaria `America/Bogota`; moneda en COP con `Intl.NumberFormat('es-CO')`. |
| PowerPoint | Generado en el navegador: se rellenan los XML de la plantilla, se cambian colores y logo según la plataforma, y se empaqueta con un **generador ZIP propio** (`zipFiles` + `crc32`). Resultado: `.pptx` editable. |
| Tips del lunes | `mondayRelease()` calcula la edición semanal; un `setInterval` cada 60 s detecta el cambio si la página está abierta. |

### 7.4 Código en capas (v0.1 → v0.2 → v0.3)

El archivo creció por capas sucesivas, y **las capas posteriores redefinen o envuelven funciones anteriores** (patrón `const oldX = X; X = function(){ oldX(); ... }`):

1. **v0.1 (líneas iniciales):** modelo básico con aliados, propuestas, tareas, solicitudes, planes, radar y log. Incluye `seed()` con datos de ejemplo (definida pero **no se invoca**).
2. **v0.2:** añade plataformas, directorio de 24 aliados, facturación, sponsors, miembros, métricas, interacciones, tips, plantillas PowerPoint. `migrate()` convierte datos v1 a v2.
3. **v0.3 (gobernanza):** `governanceInit()` amplía el equipo, retira los 3 aliados ficticios (Bebidas Horizonte, Sonido Distrito, Rutas Urbanas) y sus registros, añade solicitudes de eliminación, notificaciones, revisión de 6 diapositivas, snapshot aprobado y versiones aprobadas. Las propuestas aprobadas en versiones anteriores sin snapshot vuelven a "Pendiente de GO".

> **Importante para portar el código:** antes de reutilizar una función, buscar su **última** definición en el archivo; la primera aparición puede estar sobrescrita. Ejemplos: `render`, `changeStatus`, `saveProposal`, `detail`, `importData`, `allyForm`, `planForm`.

### 7.5 Modelo de datos (`state`)

| Colección | Contenido |
| --- | --- |
| `allies` | Aliados: nombre, categoría, servicios (`commit`), etiquetas, plataforma, estado de convenio, firma, renovación, aporte mensual, contacto, inconformidad, fuente. |
| `proposals` | Propuestas con todos sus campos, `version`, `status`, `history`, `reviewCandidate`, `approvedSnapshot`, datos de revisión presidencial. |
| `proposalVersions` | Copias congeladas de cada versión aprobada. |
| `plans` | Planes/actividades: aliados, afiliados, plataforma, fecha, responsable, meta, costo, resultado, participaciones, `proposalId`. |
| `tasks` | Tareas de seguimiento. |
| `requests` | Solicitudes/necesidades de afiliados. |
| `members` | Afiliados y miembros de comunidades. |
| `interactions` | Interacciones aliado ↔ afiliado. |
| `finance` | Movimientos de facturación y recaudo. |
| `sponsors` | Patrocinios (dinero / especie, responsable, estado). |
| `metrics` | Cortes acumulados de MDTN. |
| `trends`, `radar` | Señales/ideas con fuente pública. |
| `tipActions` | Tips ya convertidos en acción. |
| `team` | Integrantes del equipo. |
| `deleteRequests`, `deletedRecords`, `notifications` | Gobernanza de eliminaciones y avisos. |
| `log` | Bitácora de actividad. |

---

## 8. Cómo ejecutarlo

1. Abrir `ASOBARES_CONECTA/web/ASOBARES_CONECTA.html` en Chrome o Edge (doble clic basta).
2. Alternativa con servidor local:
   ```bash
   cd ASOBARES_CONECTA
   python3 -m http.server 8080 --bind 127.0.0.1 --directory web
   ```
   y abrir `http://127.0.0.1:8080/ASOBARES_CONECTA.html`.
3. Para probar las decisiones de Presidencia, elegir **"Camilo Ospina"** en "Simular vista de".
4. Para conservar los datos, usar **Copia de seguridad → Descargar copia de datos**. Los datos dependen del navegador y del origen: abrir el archivo desde otra ruta o con `http://` en vez de `file://` muestra otro almacenamiento.

---

## 9. Limitaciones actuales (lo que el prototipo NO es)

- ❌ **No hay usuarios ni autenticación.** El selector de personas es una simulación; cualquiera puede "ser" Camilo o editar `localStorage`.
- ❌ **No hay servidor ni base de datos compartida.** Cada navegador tiene sus propios datos.
- ❌ **No hay correo.** Las notificaciones solo existen en el mismo navegador.
- ❌ **No hay integración con el CRM.**
- ❌ **No hay procesos programados reales.** Los tips del lunes solo se actualizan si la página está abierta.
- ❌ **No investiga en internet.** Los tips cruzan datos locales; el directorio es una foto del 20/09/2026.
- ❌ **El PowerPoint descargado es editable**: si se modifica fuera de Conecta, ya no corresponde a la versión aprobada y el sistema no puede detectarlo.
- ⚠️ Las importaciones de JSON se validan en estructura, pero los datos (aprobaciones, autoría) **no son confiables** porque vienen del cliente.

---

## 10. Camino a producción (resumen)

El `README.md` lo detalla; en síntesis, Sebastián debe:

1. Analizar la tecnología, autenticación y API del CRM `gestion.asobares.org`.
2. Crear **cuentas individuales** y vincular el rol de Presidencia al **ID verificado** de Camilo (con segundo factor).
3. Construir **backend + base de datos** con permisos verificados **en el servidor** para cada operación (GO, eliminaciones, restauraciones, descargas).
4. Migrar las entidades (sin importar los ejemplos como datos reales).
5. Persistir propuestas, revisiones y versiones aprobadas con **control de concurrencia**.
6. Notificaciones persistentes + **correo institucional** (que solo avise; nunca aprobar por enlace).
7. **Tareas programadas** reales (tips del lunes 08:00 Colombia).
8. Conciliar indicadores con los responsables comerciales y contables.
9. Piloto privado con cuentas reales.
10. Eliminar el selector de simulación y verificar los criterios de aceptación del README (§13).

### Mapa de funciones a sustituir

| En el prototipo | En producción |
| --- | --- |
| `state` + `save()` + localStorage | API + base de datos compartida |
| `role`, `PRESIDENT`, selector | Sesión verificada + ID estable |
| `governanceInit()` | Migraciones controladas |
| `submitDeletion`, `resolveDeletion` | Endpoints con autorización y transacción |
| `notifyPresident` | Notificaciones persistentes + correo |
| `reviewProposal`, `confirmReviewed`, `changeStatus` | Transiciones validadas en backend con concurrencia |
| `saveProposal` | Validación de campos y creación de revisión en servidor |
| `pptFiles`, `zipFiles`, `snapshotBytes` | Se pueden conservar (generación de PPTX), ligadas a la versión aprobada |
| `BRANDS`, `PPT_TEMPLATE` | Extraer a archivos estáticos al modularizar |
| `importData` | Procedimiento de restauración autorizado, sin aceptar aprobaciones del cliente |

---

## 11. Glosario

| Término | Significado |
| --- | --- |
| **Aliado** | Empresa con (o candidata a) convenio con Asobares que ofrece servicios a los afiliados. |
| **Afiliado / miembro** | Establecimiento o persona de la comunidad de Asobares o de una de sus plataformas. |
| **Plataforma** | Cada una de las marcas/programas de Asobares (Círculo Gastro, Clúster DJ, Expobar…). |
| **GO** | Autorización de Presidencia para presentar una versión concreta de una propuesta al aliado. |
| **Snapshot aprobado** | Copia congelada del contenido externo de la propuesta en el momento del GO. |
| **Sponsor** | Patrocinador de una plataforma (Expobar, MDTN, Área en Vivo LAB), con aporte en dinero y/o especie. |
| **Mesa del viernes** | Reunión semanal de 60 minutos del equipo comercial. |
| **Tips del lunes** | Sugerencias semanales de acción por aliado. |
| **MDTN** | Mi Destino Tu Noche. |
| **Facturación vs. recaudo** | Lo facturado vs. lo efectivamente pagado. |
