# CaféU 2.0

Aplicación web móvil para la cafetería de la Universidad Técnica de Ambato: consultar el menú, buscar productos, armar un pedido, confirmarlo con una hora de retiro y gestionarlo después. Es la **prueba práctica integradora de Interacción Humano-Computador** (quinto semestre, Ingeniería de Software, FISEI).

> **Pregunta de fondo:** ¿una interfaz que funciona técnicamente puede ser una mala interfaz? Por eso el repositorio contiene el producto, su arquitectura y la evidencia de su evaluación de usabilidad.

## Funcionalidades

- Menú con precio y disponibilidad (disponible, pocas unidades, agotado).
- Búsqueda tolerante a **tildes y mayúsculas**, por palabras y con filtro por categoría.
- Pedido con cantidades de 1 a 9, subtotales y total.
- Quitar un producto con opción de **deshacer**.
- Confirmación con nombre y hora de retiro, validación de datos y número de pedido.
- Manejo de **producto agotado** al confirmar (quitarlo o cambiarlo) y cancelación del envío.
- Cambiar la hora de retiro, **cancelar** el pedido y **restaurarlo**.
- Persistencia en el navegador (el pedido sobrevive a una recarga).
- Mobile First, navegación completa por teclado, foco visible, HTML semántico y mensajes anunciados a lectores de pantalla.

## Instalación y ejecución

Requisitos: [Node.js](https://nodejs.org) 20 o superior. No hay dependencias que instalar.

```bash
git clone <url-del-repositorio>
cd cafeu-ihc-integrador
npm start
```

Abre `http://localhost:8080/`. Para usar otro puerto: `PORT=3000 npm start` (en PowerShell: `$env:PORT=3000; npm start`).

- `npm start` sirve la **versión 2** (`src/`).
- `npm run start:v1` sirve la **versión 1 congelada** que se evaluó (`prototipos/version-v1/`).
- El enlace "Reiniciar demostración" al pie de la página borra pedidos y existencias guardadas y deja la aplicación en su estado inicial.

## Pruebas

```bash
npm test
```

Ejecuta 38 pruebas automatizadas con el ejecutor integrado de Node (`node:test`):

| Archivo | Qué comprueba |
|---|---|
| `tests/busqueda.test.js` | Búsqueda sin tildes ni mayúsculas y por palabras (RF-02). |
| `tests/pedido.test.js` | Reglas del pedido: cantidades, total, quitar, estados (RF-03 a RF-06). |
| `tests/flujos-criticos.test.js` | Las tareas T1, T2 y T3 de principio a fin, el conflicto de stock y la cancelación (RF-01 a RF-06). |
| `tests/persistencia.test.js` | Los datos sobreviven a una recarga y la aplicación funciona sin `localStorage` (RNF-03). |
| `tests/arquitectura.test.js` | Ninguna capa importa a otra que no le corresponde (RNF-04). |

## Arquitectura

Cuatro capas con dependencias hacia el dominio:

```
Presentación → Aplicación → Dominio
                   ↑
             Infraestructura (implementa los puertos de la aplicación)
```

| Capa | Carpeta | Contenido |
|---|---|---|
| Presentación | `src/presentation/` | Pantallas, componentes reutilizables, controlador y accesibilidad. |
| Aplicación | `src/application/` | Casos de uso, puertos y DTO. |
| Dominio | `src/domain/` | `Producto`, `Pedido`, `DetallePedido` y reglas de negocio. |
| Infraestructura | `src/infrastructure/` | `localStorage`, catálogo e inventario local. |

Explicación completa en [`docs/arquitectura.md`](docs/arquitectura.md).

## Documentación y evidencias

| Actividad | Evidencia |
|---|---|
| 1. Análisis de usuario y experiencia | [`docs/analisis-ux.md`](docs/analisis-ux.md), [curva emocional](docs/curva-emocional.svg) |
| 2. Requisitos y arquitectura de información | [`docs/requisitos.md`](docs/requisitos.md), [`docs/sitemap.md`](docs/sitemap.md), [`docs/user-flow.md`](docs/user-flow.md), [`docs/trazabilidad.md`](docs/trazabilidad.md), [wireframes](prototipos/wireframes/) |
| 3. Arquitectura e implementación | `src/`, [`docs/arquitectura.md`](docs/arquitectura.md), `tests/`, [versión 1 congelada](prototipos/version-v1/) |
| 4. Planificación de la evaluación | [`evaluacion/plan.md`](evaluacion/plan.md), [`evaluacion/tareas.md`](evaluacion/tareas.md), [consentimiento](evaluacion/consentimiento.md), [hoja de observación](evaluacion/hoja-observacion.md) |
| 5. Evaluación heurística y recorrido cognitivo | [`evaluacion/heuristicas/consolidado.md`](evaluacion/heuristicas/consolidado.md), [`evaluacion/recorrido-cognitivo.md`](evaluacion/recorrido-cognitivo.md), [`evaluacion/accesibilidad.md`](evaluacion/accesibilidad.md) |
| 6. Pilotaje y pruebas con usuarios | [`evaluacion/piloto/P00.md`](evaluacion/piloto/P00.md), [`evaluacion/participantes/`](evaluacion/participantes/), [`evaluacion/resultados.csv`](evaluacion/resultados.csv) |
| 7. Triangulación, corrección y validación | [`evaluacion/metricas.md`](evaluacion/metricas.md), [`evaluacion/hallazgos.md`](evaluacion/hallazgos.md), [`evaluacion/backlog.md`](evaluacion/backlog.md), [`evaluacion/validacion-v2.md`](evaluacion/validacion-v2.md), [antes](evidencias/antes/) y [después](evidencias/despues/) |

## Resultados de la evaluación

Con la versión 1 se hizo una evaluación heurística con cuatro evaluadores, un recorrido cognitivo, una revisión de accesibilidad y tres sesiones (un piloto y dos con participantes).

| Medida (versión 1, P01 y P02) | Resultado |
|---|---|
| Eficacia: tareas completadas sin ayuda | 6 de 6 (100 %) |
| Eficiencia: acciones de T3 frente al mínimo de 8 | 9 y 10 (+19 % en mediana) |
| Satisfacción: SUS | 78,8 (referencia 68) |
| Satisfacción: SEQ de T3 | 5,0 (referencia 5,5) |
| Accesibilidad: violaciones de axe-core (WCAG 2.2 AA) | 0 en 11 pantallas y estados |

Se registraron diez hallazgos. El más sólido (H-01, el buscador conserva el texto al volver al menú) lo detectaron los dos métodos. Cuatro hallazgos se corrigieron en la **versión 2** (B-01, B-02, B-04 y B-07) y la comprobación está en [`evaluacion/validacion-v2.md`](evaluacion/validacion-v2.md): las pruebas pasan de 37 a 38 de 38, T3 llega al mínimo de acciones y no hay violaciones nuevas de accesibilidad. Seis mejoras siguen en el backlog.

## Estructura del repositorio

```
cafeu-ihc-integrador/
├── README.md
├── docs/            análisis UX, requisitos, arquitectura, sitemap, user flow y trazabilidad
├── prototipos/      wireframes y version-v1 (copia congelada de la versión evaluada)
├── src/             presentation, application, domain, infrastructure (versión 2)
├── tests/           pruebas automatizadas
├── evaluacion/      plan, tareas, instrumentos, heurísticas, sesiones, métricas, hallazgos, backlog y validación v2
├── evidencias/      capturas antes (v1) y después (v2) de las correcciones
└── herramientas/    servidor local sin dependencias
```

## Equipo y colaboración

Cada integrante hizo commits propios con su cuenta y trabajó en su propia rama, con un Pull Request revisado por otra persona. Cada archivo del repositorio tiene un único responsable, de modo que los cambios no se pisan. El detalle de aportes está en [`evaluacion/registro-aportes.md`](evaluacion/registro-aportes.md).

| Integrante | Usuario de GitHub | Rol en las sesiones | Responsabilidades |
|---|---|---|---|
| Cristian Ango | [@CristianDDGA](https://github.com/CristianDDGA) | Moderador | Dominio y aplicación, arquitectura, plan e instrumentos de evaluación, P00 y heurística E1, corrección B-04. |
| Julio Jacho | [@Sebasjach21](https://github.com/Sebasjach21) | Registro de métricas | Análisis UX, requisitos, sitemap, user flow, trazabilidad, wireframes, componentes y estilos, P01 y heurística E2, resultados y métricas, corrección B-07. |
| Matias Morales | [@MatiusJBG](https://github.com/MatiusJBG) | Soporte técnico | Infraestructura, pantallas y controlador, P02, recorrido cognitivo, accesibilidad, heurística E3, correcciones B-01 y B-02. |
| Oscar Riofrio | [@AdrianMora8](https://github.com/AdrianMora8) | Observador | Pruebas automatizadas, README, versión 1 congelada, heurística E4 y consolidado, hallazgos, backlog, validación v2, capturas y registro de aportes. |

## Limitaciones

- No hay servidor ni base de datos: los datos se guardan solo en el navegador y el inventario es local.
- Las métricas provienen de muestras muy pequeñas y son **descriptivas**: no se generalizan estadísticamente.
- La revisión de accesibilidad es automática y de teclado; falta probar con un lector de pantalla real y con personas usuarias.
- Seis mejoras de usabilidad siguen pendientes en el [backlog](evaluacion/backlog.md).
