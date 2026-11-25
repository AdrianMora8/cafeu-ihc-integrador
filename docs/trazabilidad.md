# Matriz de trazabilidad (Actividad 2)

Relaciona cada requisito con las pantallas que lo cumplen, el código que lo implementa y las pruebas que lo verifican. Las pruebas automatizadas llevan el identificador del requisito entre corchetes en su nombre, por ejemplo `[RF-02]`.

## Funcionales

| Requisito | Pantallas | Código (`src/`) | Pruebas automatizadas (`tests/`) | Tarea de usabilidad | Evaluación |
|---|---|---|---|---|---|
| RF-01 Catálogo y disponibilidad | Inicio, Menú, Detalle | `domain/producto.js`, `application/listarMenu.js`, `infrastructure/catalogoInicial.js` | `flujos-criticos.test.js` [T1] | T1 | Heurística 1 y 2 |
| RF-02 Búsqueda sin tildes ni mayúsculas | Menú | `domain/busqueda.js`, `application/listarMenu.js` | `busqueda.test.js` [RF-02] | T1 | Heurística 7 |
| RF-03 Cantidades y total | Detalle, Mi pedido | `domain/pedido.js`, `application/agregarAlPedido.js`, `application/cambiarCantidad.js` | `pedido.test.js` [RF-03], `flujos-criticos.test.js` [T2] | T2 | Heurística 5 y 6 |
| RF-04 Quitar y deshacer | Mi pedido | `application/quitarDelPedido.js`, `application/deshacerQuitar.js` | `pedido.test.js` [RF-04], `flujos-criticos.test.js` [T3] | T3 | Heurística 3 |
| RF-05 Confirmar con validación y conflicto de stock | Mi pedido, Enviando, Confirmado | `application/confirmarPedido.js`, `application/resolverConflictoStock.js`, `infrastructure/inventarioLocal.js` | `flujos-criticos.test.js` [T3] y [RF-05] | T3 | Heurística 1, 5 y 9 |
| RF-06 Cambiar hora, cancelar y restaurar | Confirmado, Cambiar hora, Cancelado | `application/cambiarHoraRetiro.js`, `application/cancelarPedido.js`, `application/restaurarPedido.js` | `flujos-criticos.test.js` [RF-06], `pedido.test.js` [RF-05][RF-06] | T3 | Heurística 3 y 9 |

## No funcionales

| Requisito | Dónde se cumple | Cómo se comprueba |
|---|---|---|
| RNF-01 Mobile First | `presentation/estilos.css`, `presentation/index.html` (viewport) | Capturas a 320, 360 y 768 px en `evidencias/` |
| RNF-02 Accesibilidad | `presentation/accesibilidad.js`, `presentation/componentes/` | `evaluacion/accesibilidad.md` y recorrido con teclado |
| RNF-03 Persistencia | `infrastructure/almacenamiento.js`, `infrastructure/repositorioPedidosLocal.js` | `persistencia.test.js` [RNF-03] |
| RNF-04 Mantenibilidad | Estructura de cuatro capas descrita en [`arquitectura.md`](arquitectura.md) | `arquitectura.test.js` [RNF-04] |

## Pantallas y requisitos

| Pantalla | Requisitos |
|---|---|
| Inicio | RF-01, RNF-01, RNF-02 |
| Menú de hoy | RF-01, RF-02, RNF-01, RNF-02 |
| Detalle del producto | RF-01, RF-03 |
| Mi pedido | RF-03, RF-04, RF-05, RNF-02 |
| Enviando pedido | RF-05 |
| Pedido confirmado | RF-05, RF-06 |
| Cambiar hora | RF-06 |
| Pedido cancelado | RF-06 |
