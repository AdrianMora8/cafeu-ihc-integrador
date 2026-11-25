# Backlog priorizado de mejoras

Cada fila corresponde a un hallazgo de [`hallazgos.md`](hallazgos.md). El identificador del backlog usa el mismo número que el hallazgo (B-01 resuelve H-01). Los títulos de los Issues empiezan con ese identificador.

## Regla de prioridad

| Prioridad | Regla |
|---|---|
| P1 | Severidad 4, o severidad 3 confirmada por ambos métodos. |
| P2 | Severidad 3 detectada por un solo método, o severidad 2 confirmada por ambos. |
| P3 | Severidad 2 detectada por un solo método. |
| P4 | Severidad 1. |

## Backlog

| ID | Mejora | Prioridad | Severidad | Esfuerzo | Responsable | Archivos | Estado |
|---|---|---|---|---|---|---|---|
| **B-01** | Limpiar el buscador y el filtro al volver al menú desde otra pantalla. Se conservan solo al volver desde un detalle. | **P1** | 3 | Bajo | Matias Morales | `src/presentation/controlador.js` | **Hecho en v2** |
| **B-02** | Mostrar una tarjeta del pedido confirmado en "Mi pedido" cuando el carrito está vacío, y llevar a la confirmación si se vuelve atrás tras confirmar. | **P2** | 3 | Medio | Matias Morales | `src/presentation/controlador.js`, `src/presentation/vistas/pedido.js` | **Hecho en v2** |
| **B-03** | Avisar al agregar un producto con pocas unidades que puede agotarse y mostrar el conflicto sin pasar por la pantalla de espera. | **P2** | 3 | Alto | Cristian Ango | `src/application/confirmarPedido.js`, `src/infrastructure/inventarioLocal.js`, `src/presentation/vistas/detalle.js` | Pendiente |
| **B-06** | Quedarse en el detalle tras agregar, con un aviso y dos botones: "Seguir comprando" y "Ver pedido". | **P2** | 2 | Medio | Matias Morales | `src/presentation/controlador.js`, `src/presentation/vistas/detalle.js` | Pendiente |
| **B-04** | Buscar por palabras: todas las palabras de la consulta deben aparecer, en cualquier orden y sin ser seguidas. | P3 | 2 | Bajo | Cristian Ango | `src/domain/busqueda.js` | **Hecho en v2** |
| **B-05** | Ofrecer solo las horas posteriores a la hora actual y cerrar la lista al horario de la cafetería. | P3 | 2 | Medio | Cristian Ango | `src/domain/reglas.js`, `src/presentation/vistas/pedido.js` | Pendiente |
| **B-07** | Subir todos los textos a 13 px como mínimo. | P3 | 2 | Bajo | Julio Jacho | `src/presentation/estilos.css` | **Hecho en v2** |
| **B-08** | Ofrecer "Deshacer" mientras exista una línea quitada, también tras salir de la pantalla. | P3 | 2 | Bajo | Matias Morales | `src/presentation/controlador.js`, `src/presentation/vistas/pedido.js` | Pendiente |
| **B-09** | Mostrar "Máximo 9 por producto" y anunciarlo a los lectores de pantalla. | P4 | 1 | Bajo | Julio Jacho | `src/presentation/componentes/selectorCantidad.js` | Pendiente |
| **B-10** | Exigir que el nombre tenga al menos dos letras. | P4 | 1 | Bajo | Cristian Ango | `src/domain/reglas.js` | Pendiente |

## Criterios de aceptación

| ID | Criterio |
|---|---|
| B-01 | Después de "Seguir comprando" o de la pestaña "Menú" el buscador está vacío y se ven los cuatro productos. Al volver desde un detalle la búsqueda se conserva. |
| B-02 | Con un pedido confirmado y el carrito vacío, "Mi pedido" muestra el número y la hora de retiro con un botón "Ver pedido". Tras confirmar, el botón Atrás del navegador lleva a la confirmación. |
| B-03 | Agregar la empanada muestra el aviso. Confirmar con la empanada muestra el conflicto sin esperar el envío. |
| B-04 | «sanduche queso» y «queso sanduche» devuelven "Sanduche de queso". «cafe queso» no devuelve nada. Hay pruebas automáticas. |
| B-05 | A las 10:58 no se puede elegir 10:00 ni 10:30. |
| B-06 | Tras "Agregar al pedido" se ve el aviso en el detalle con dos botones, sin pasar a "Mi pedido". |
| B-07 | Ningún texto visible mide menos de 13 px en Inicio, Menú, Pedido, Confirmación, Cambiar hora y Cancelado, a 320 px de ancho, sin desbordes. |
| B-08 | Después de quitar un producto y volver a "Mi pedido" se ofrece "Deshacer". |
| B-09 | Al llegar a 9 unidades un texto explica el límite. |
| B-10 | El nombre «12» se rechaza con un mensaje junto al campo. |

## Texto sugerido para los Issues

Título: `B-01 · Limpiar el buscador al volver al menú`
Descripción: el hallazgo, la evidencia (`evidencias/antes/`), el criterio de aceptación de la tabla de arriba y el responsable. Los cuatro Issues de la versión 2 (B-01, B-02, B-04 y B-07) se cierran con los Pull Requests de sus responsables.
