# ASOBARES CONECTA
## Resumen del proyecto y guía de implementación para Sebastián

**Entrega:** prototipo local 0.3 y requisitos de integración. 20 de septiembre de 2026.
**Responsable comercial:** Eduardo Montoya, Director Ejecutivo.
**Articulación con afiliados:** Mariana Sánchez, Soporte Organizacional.
**Aprobación de propuestas y eliminaciones:** Camilo Ospina Guzmán, Presidente.
**Integración técnica:** Sebastián, webmaster de Asobares.

> Esta entrega contiene el código completo del prototipo actual. No contiene un servidor, autenticación real ni una integración operativa con el CRM. Publicar el HTML tal como está no convierte el selector de personas en un sistema seguro de usuarios. Los controles de Presidencia descritos como pendientes deben implementarse en el servidor antes del uso real con el equipo.

## 1. Propósito

Fortalecer las alianzas existentes y generar ingresos adicionales mediante actividades que conecten aliados, afiliados y colectivos de Asobares. Cada iniciativa distingue entre una acción incluida en un convenio, una ampliación con cobro adicional y un negocio nuevo.

La plataforma facilita la planeación mensual, las sesiones de trabajo de los viernes, las propuestas comerciales, el GO de Presidencia, el seguimiento de tareas y la medición por plataforma.

## 2. Alcance de esta versión

| Módulo | Funcionalidad disponible en el prototipo |
| --- | --- |
| Panorama | Selector de Asobares Bogotá & Colombia, Círculo Gastro, Mix & Shake, Clúster DJ, Expobar, Mi Destino Tu Noche y Área en Vivo LAB. |
| Indicadores | Datos calculados sobre registros locales de afiliados, miembros, sponsors, facturación, recaudo, interacciones y actividades. |
| Aliados | Directorio inicial de 24 aliados consultado en la web. El convenio y los importes deben confirmarse internamente. |
| Planes y actividades | Una actividad puede relacionarse con varios aliados y aparecer en sus fichas sin duplicarse en el total de actividades. |
| Propuestas y tips | Formulario, plantillas PowerPoint por plataforma y sugerencias de acciones desde un banco local. |
| Revisión y GO | Vista de seis diapositivas y confirmación de revisión de la versión antes del GO, bajo roles simulados. |
| Expobar | Sponsors por responsable, dinero y especie separados, semáforo de aportes del equipo. |
| Afiliados y oportunidades | Registro de miembros y afiliados, contadores y coincidencias con servicios de aliados para apoyar a Mariana. |
| Seguimiento | Tareas y fechas, con alertas locales. |
| Actividad del equipo | Historial por persona y plataforma. |
| Eliminaciones y avisos | Solicitud motivada, decisión de Presidencia, copia de trazabilidad y notificación dentro del mismo navegador. |
| Respaldo | Exportación de JSON y restauración restringida a Presidencia dentro de la simulación. |

Los tres aliados ficticios originales se retiran al cargar datos que aún los contengan, identificados por su ID y nombre original. También se retiran sus registros de demostración vinculados e identificados. El historial conserva la trazabilidad.

## 3. Equipo

Los selectores incluyen Eduardo Montoya, Mariana Sánchez, Camilo Ospina, Jonathan Mejías, Carlos Ulloa, Felipe Calderón y Nereida Sánchez. Se pueden añadir integrantes.

Estos nombres son etiquetas de demostración. No son identidades autenticadas ni prueban quién realizó una acción. Sebastián deberá asociarlos a cuentas individuales verificadas del equipo, sin deducir correos ni asignar privilegios por coincidencia de nombre.

## 4. Cómo ejecutar y revisar la entrega

1. Descomprimir el ZIP.
2. Abrir `web/ASOBARES_CONECTA.html` en Chrome o Edge.
3. Probar las vistas, registros y propuestas utilizando información de prueba.
4. Para conservar cambios, utilizar **Copia de seguridad**. El archivo JSON contiene los datos de ese navegador.

El HTML incluye CSS, JavaScript, logos y recursos de plantilla PowerPoint. No requiere instalar paquetes ni compilar. Es el código fuente canónico de esta entrega; no es un ejecutable cerrado.

Como alternativa para desarrollo, desde la carpeta raíz del paquete:

```bash
python -m http.server 8080 --bind 127.0.0.1 --directory web
```

Abrir `http://127.0.0.1:8080/ASOBARES_CONECTA.html`.

El almacenamiento usa la clave `asobares-conecta-v1` de localStorage. Aunque la clave conserva ese nombre, la estructura de datos incluye la evolución posterior. No renombrarla sin una migración. Cambiar de navegador, origen o ubicación de archivo puede cambiar la disponibilidad de los datos locales. Este ZIP no recupera los datos que Camilo haya introducido en su propio navegador: deberá exportar esa copia si quiere entregarlos.

## 5. Requisito obligatorio: solo Presidencia puede decidir

### 5.1 Problema actual

El selector **Simular vista de** permite elegir a Camilo Ospina. Los controles actuales comparan el rol local con ese nombre. Cualquier persona con el archivo o acceso al navegador puede alterar la selección, el código o localStorage. Ocultar el selector o añadir una contraseña dentro del HTML no resuelve el problema.

**La versión real debe eliminar la simulación y aplicar autorización del lado del servidor en cada operación.**

### 5.2 Identidad personal y acceso

- Evaluar el mecanismo de autenticación del CRM `https://gestion.asobares.org/` antes de elegir la implementación. Su tecnología y API no se han confirmado en esta entrega.
- Reutilizar su inicio de sesión si permite verificar sesiones e identidad de forma segura; en caso contrario, integrar un proveedor de identidad compatible y mantenido.
- Crear una cuenta individual por miembro. No usar cuentas compartidas.
- Vincular la facultad de Presidencia al identificador estable de la cuenta verificada de Camilo. No confiar en el nombre visible, en un correo enviado por el cliente o en un campo `role` de la petición.
- Exigir un segundo factor para Presidencia. Confirmar autenticación reciente para aprobar o eliminar según la política acordada.
- Definir con Camilo un procedimiento documentado de recuperación de acceso. Una recuperación no puede convertirse en un mecanismo para que un administrador se atribuya silenciosamente el rol presidencial.
- El alta de una persona del equipo no debe conceder permisos de aprobación o eliminación.

### 5.3 Matriz de permisos a implementar

| Operación | Equipo autorizado para el expediente | Camilo / Presidencia | Administrador técnico |
| --- | --- | --- | --- |
| Crear y editar borradores | Sí, según asignación | Sí | Solo si tiene un rol operativo separado |
| Consultar expedientes de trabajo | Según asignación | Sí | Según necesidad técnica auditada |
| Solicitar GO | Sí | Sí | No por ser administrador |
| Confirmar revisión presidencial y dar GO | No | Sí | No por ser administrador |
| Pedir ajustes o descartar como decisión presidencial | No | Sí | No por ser administrador |
| Solicitar eliminación | Sí, con motivo | Sí | Según rol operativo |
| Autorizar o rechazar eliminación | No | Sí | No por ser administrador |
| Restaurar una copia que reemplaza datos | No | Sí, con controles adicionales | Ejecutar el procedimiento autorizado, sin autoaprobarlo |
| Alterar aprobaciones o borrar el historial | No | No mediante edición ordinaria | No mediante edición ordinaria |

“Solo Presidencia revisa” significa que la **revisión decisoria** y su confirmación son exclusivas de Camilo. Los autores necesitan ver sus borradores y las observaciones. La visibilidad de información interna debe respetar la asignación de cada expediente.

Quien controla la infraestructura o la base de datos conserva capacidad técnica potencial sobre el sistema. Separar esa capacidad de los permisos comerciales, restringir accesos privilegiados y registrar intervenciones. No prometer exclusividad absoluta frente al dueño de la infraestructura por el solo uso de un rol en la aplicación.

### 5.4 Verificación en el servidor

Para cada petición sensible, el servidor debe:

1. Validar la sesión y obtener de ella la identidad auténtica.
2. Consultar permisos y alcance sobre el expediente solicitado.
3. Verificar que el usuario corresponde a Presidencia cuando la operación lo requiera.
4. Verificar el estado y la revisión esperada del registro.
5. Ejecutar el cambio y el registro de auditoría de forma atómica.
6. Generar la notificación después de confirmar la transacción, con control de duplicados.

No aceptar `actor`, `approvedBy`, `decidedBy`, `role`, fechas de decisión o snapshots aprobados como autoridad enviada por el navegador. Deben derivarse en el servidor. Comprobar permisos también en API, exportaciones, descargas, restauraciones y operaciones masivas.

En una implementación con sesiones web, proteger cookies, sesiones y peticiones que cambian datos de acuerdo con el mecanismo elegido. Mantener secretos fuera del HTML y del repositorio público. La selección concreta de biblioteca, proveedor y configuración corresponde a la arquitectura real del CRM.

## 6. Propuesta final, revisión y versión aprobada

### Flujo requerido

1. El responsable completa la propuesta y la remite a Presidencia.
2. El sistema conserva una revisión con el contenido externo y los datos internos correspondientes.
3. Camilo consulta la propuesta final desde su cuenta y confirma su revisión.
4. El GO identifica esa revisión concreta y al aprobador autenticado.
5. La exportación externa utiliza exclusivamente el contenido de esa revisión aprobada.
6. Una edición posterior crea una nueva revisión y exige otro GO. La revisión anterior permanece consultable.

En el prototipo, `reviewCandidate`, `approvedSnapshot` y `proposalVersions` modelan ese comportamiento, pero son datos locales modificables. En producción, almacenarlos como revisiones protegidas en base de datos y validar concurrencia para impedir aprobar una versión que cambió durante la revisión.

La vista interna presenta costos y notas. La propuesta externa no los incluye. El control del servidor debe cubrir tanto el contenido público aprobado como el presupuesto interno que fundamenta la decisión. Si cambia el costo, precio, alcance, condiciones o destinatario, invalidar la aprobación de la nueva versión aunque alguna diapositiva externa no cambie.

El PowerPoint descargado es editable. Un cambio fuera de Conecta no puede detectarse automáticamente en esta versión. Establecer una de estas rutas para la operación real:

- Mantener el formulario como fuente oficial: cualquier ajuste vuelve al formulario y pasa nuevamente por GO.
- Si se habilita cargar archivos externos, guardarlos como nuevas versiones, generar una vista previa segura y exigir revisión del archivo exacto antes del GO.

Conservar el archivo aprobado y su huella de contenido. Si más adelante se habilita el envío desde Conecta, enviar exclusivamente esa versión y registrar destinatario, fecha y archivo. Un enlace de correo o un nombre de archivo no sustituyen la autorización.

Las plantillas vacías son materiales de trabajo, no propuestas aprobadas. Los borradores exportados deben conservar una marca visible de pendiente de GO.

## 7. Solicitudes de eliminación y avisos

Cada solicitud debe incluir tipo de registro, identificador, motivo, solicitante autenticado, fecha y versión del registro afectado. No retirar datos solo por crear una solicitud.

Presidencia debe poder aprobar o rechazar desde su bandeja. Si el registro cambió desde la solicitud, exigir revisión de su estado actual antes de ejecutar el retiro. Evitar que una misma solicitud se ejecute dos veces.

Preferir el retiro lógico con trazabilidad frente al borrado físico inmediato. Definir qué ocurre con las actividades, contratos, archivos y propuestas relacionados. No borrar en cascada información de otros aliados. No modificar retrospectivamente una propuesta aprobada por el retiro de un aliado.

En esta versión, `deleteRequests`, `deletedRecords` y `notifications` guardan las solicitudes, copias y avisos. **No hay correo real, mensajes entre dispositivos ni autenticación del decisor.**

Para producción:

- Confirmar con Camilo su dirección de notificación y su cuenta. No están incluidas en el código.
- Crear una notificación persistente para Presidencia por cada solicitud de eliminación y propuesta lista para GO.
- Conectar un servicio de correo institucional desde el servidor, con seguimiento de entrega y reintentos controlados.
- El correo solo avisa y conduce a la aplicación. Exigir sesión y permisos al abrir el expediente y al decidir.
- No aprobar ni eliminar mediante un enlace GET o por abrir el correo. Esto evita acciones involuntarias por previsualizadores y escáneres de enlaces.
- Registrar lectura del aviso separadamente de la decisión. Marcar un aviso como leído no aprueba la solicitud.
- Conservar solicitante, decisor, motivo, revisión, fecha y resultado en una auditoría no editable desde las pantallas ordinarias.

## 8. Indicadores y reglas comerciales

- Directorio público no equivale a convenio activo. Los contratos requieren confirmación interna y fecha de firma.
- Facturación, recaudo, aportes contratados y aportes en especie son conceptos distintos.
- La facturación se registra con una referencia única por comprobante o línea. Al repartir una factura entre plataformas, repartir el importe sin repetir el total.
- El prototipo asigna el recaudo al mes de la factura. Si se requiere caja por fecha de pago, implementar una tabla de pagos y su fecha propia.
- El semáforo mensual es rojo si no hay facturación registrada; amarillo si hay facturación pero no nuevos aliados firmados; verde si hay ambos. Cero registros no acredita que no existan ventas fuera del sistema.
- En Expobar, un integrante sin sponsors firmados está en rojo. Un aporte exclusivamente en especie se distingue del aporte económico.
- Los contadores de afiliados deduplican por identificador interno en los indicadores generales. La integración debe definir la identidad única y la pertenencia a varias plataformas.
- MDTN toma el último corte acumulado manual. No suma cortes acumulados entre sí. Visitantes acumulados por suma diaria pueden repetir personas.
- Personas impactadas en actividades se contabilizan como participaciones, no personas únicas verificadas.

## 9. Tips, sesiones y automatizaciones pendientes

La sesión del viernes conserva el trabajo sobre aliados, necesidades, iniciativas y responsables.

Los tips actuales rotan desde un banco local los lunes a las 08:00 en `America/Bogota`. Se revisan al abrir o mantener abierto el archivo. No existe un proceso de servidor ejecutándose con el archivo cerrado.

Los tips para Mariana cruzan la necesidad registrada con servicios del directorio. No investigan redes automáticamente al dar de alta a un afiliado. Las fuentes iniciales corresponden a la consulta del 20/09/2026.

Para automatizar, implementar un trabajo programado con zona horaria Colombia, fuentes autorizadas, enlace y fecha de cada hallazgo, deduplicación y estados de ejecución. Separar una señal pública de una hipótesis creativa. No afirmar que una empresa es aliada ni que un beneficio sigue vigente sin verificación. Los mensajes comerciales a terceros deben seguir el flujo de aprobación acordado.

## 10. Guía del código actual

El HTML contiene varias capas sucesivas de implementación. Algunas funciones se redefinen al final. Antes de portar una función, revisar su definición efectiva, no solo la primera aparición.

| Elemento | Uso actual | Acción de integración |
| --- | --- | --- |
| `state`, `save`, localStorage | Persistencia de un navegador | Sustituir por API y base de datos compartida. |
| `role`, `PRESIDENT`, selector | Simulación por nombre | Sustituir por sesión verificada e identificador estable. |
| `governanceInit` | Actualiza equipo, retira ejemplos y prepara controles locales | Convertir en migraciones controladas, sin ejecución destructiva automática sobre datos reales. |
| `submitDeletion`, `resolveDeletion` | Solicitud y decisión local | Trasladar autorización y transacción al servidor. |
| `notifyPresident` | Aviso dentro del estado local | Persistir y añadir entrega institucional. |
| `reviewProposal`, `confirmReviewed` | Vista y confirmación local de revisión | Validar sesión, revisión y decisión en backend. |
| `changeStatus` | Cambios de estado y GO | Implementar transiciones permitidas y concurrencia en servidor. |
| `saveProposal` | Edición de borrador y reinicio del GO | Validar campos permitidos y crear nueva revisión. |
| `proposalPayload`, `approvedSnapshot` | Contenido externo versionado | Persistir de manera protegida y asociar presupuesto interno. |
| `pptFiles`, `snapshotBytes`, `zipFiles` | PowerPoint editable sin dependencias remotas | Mantener la exclusión de datos internos y la relación con la versión aprobada. |
| `BRANDS`, `PPT_TEMPLATE` | Logos y plantilla embebidos | Conservar fuentes y proporciones al modularizar. |
| `importData` | Restauración local simulada | No aceptar datos del cliente como auditoría o aprobación auténtica. |

El código no incluye endpoints, tablas SQL, credenciales ni un adaptador al CRM. Se entrega la funcionalidad de prototipo, no un backend parcialmente operativo.

## 11. Modelo de integración propuesto

Entidades sugeridas: usuarios, permisos, aliados, convenios, miembros, pertenencias a plataformas, iniciativas, relación iniciativa-aliado, participantes, tareas, interacciones, sponsors, facturas y líneas, pagos, propuestas, revisiones, decisiones, archivos, solicitudes de eliminación, notificaciones y auditoría.

Cada entidad necesita ID estable. Propuestas y registros sensibles necesitan número de revisión o control equivalente de concurrencia. Una iniciativa compartida debe tener un solo registro y varias relaciones con aliados.

Operaciones de referencia, sin imponer rutas o tecnología específicas:

| Operación | Comprobación principal |
| --- | --- |
| Crear borrador | Usuario autenticado con permiso sobre el expediente. |
| Remitir revisión a GO | Revisión válida y completa, creada por el servidor. |
| Aprobar revisión | Cuenta presidencial, autenticación requerida y revisión sin cambios. |
| Solicitar eliminación | Registro existente, permiso para solicitar y motivo. |
| Resolver eliminación | Cuenta presidencial, solicitud pendiente y registro sin cambios inesperados. |
| Descargar versión externa | Acceso al expediente y versión correspondiente, sin información interna. |
| Restaurar datos | Procedimiento autorizado que no admita identidades o aprobaciones falsificadas. |

## 12. Orden de implementación para Sebastián

1. Identificar tecnología, autenticación, API y entidades existentes del CRM.
2. Definir las cuentas del equipo y verificar la identidad de Camilo para Presidencia.
3. Implementar backend, permisos, auditoría y pruebas de acceso antes de habilitar las acciones reales.
4. Migrar las entidades y relaciones. No importar ejemplos como operaciones comerciales reales.
5. Integrar propuestas, revisiones y archivos aprobados.
6. Habilitar solicitudes de eliminación y notificaciones persistentes.
7. Conectar correo y automatizaciones programadas.
8. Validar conciliación de indicadores con los responsables comerciales y contables.
9. Realizar un piloto privado con cuentas individuales.
10. Retirar completamente el selector de simulación y verificar los criterios de aceptación antes de producción.

No se ha publicado la plataforma ni conectado al CRM. Esta entrega no solicita ni realiza esos cambios.

## 13. Criterios de aceptación antes de producción

- Un usuario sin sesión no obtiene expedientes ni puede aprobar o eliminar por API.
- Eduardo, Mariana y los demás integrantes reciben denegación del servidor si intentan dar GO, suplantar el ID de Camilo o resolver una eliminación.
- Modificar el navegador, localStorage o los campos de una petición no concede permisos.
- Sebastián no obtiene facultades comerciales por su rol técnico ordinario.
- Camilo puede revisar y decidir con su cuenta y la verificación exigida.
- Una edición posterior invalida el GO de la nueva revisión y conserva la anterior.
- Dos decisiones simultáneas o repetidas no provocan estados inconsistentes ni doble eliminación.
- La descarga externa coincide con la versión aprobada y excluye notas y costos internos.
- Si se permite cargar un PowerPoint externo, se revisa y aprueba el archivo exacto que se enviará.
- Una solicitud de eliminación produce un aviso visible para Camilo desde otro dispositivo autenticado. El correo se prueba con una dirección confirmada.
- Abrir o escanear un enlace de correo no ejecuta una decisión.
- La eliminación de un aliado no borra en cascada proyectos compartidos ni altera revisiones aprobadas.
- La restauración de copias no permite fabricar aprobaciones, identidades o auditorías confiables.
- Los trabajos del lunes se ejecutan a las 08:00 Colombia sin depender de un navegador abierto.
- Las fuentes públicas, la facturación y los datos de miembros se distinguen de ejemplos y estimaciones.

Las comprobaciones realizadas sobre el prototipo abarcan lógica local, roles simulados, retiro de ejemplos, avisos locales, revisión de seis diapositivas, snapshot aprobado, exportación PowerPoint, invalidación por edición y rechazo de solicitudes de eliminación desactualizadas. No son pruebas de seguridad de servidor ni validación de envío de correos.

## 14. Fuentes e inventario

Directorio inicial: https://asobares.org/aliados/
Identidades visuales: https://asobares.org/ y los archivos oficiales enlazados desde sus plataformas de activación. Las referencias concretas están embebidas en `BRANDS`.

Contenido del ZIP:

- `README.md`: este resumen y guía de implementación.
- `web/ASOBARES_CONECTA.html`: código completo del prototipo 0.3, con recursos embebidos.
- `SHA256SUMS.txt`: huellas para verificar integridad del README y del HTML.

El paquete no incluye datos personales introducidos en navegadores ajenos, claves de correo, credenciales de CRM ni secretos de autenticación. El backend y los permisos seguros descritos en esta guía siguen pendientes de implementación.
