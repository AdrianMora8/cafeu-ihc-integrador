# Validación de la versión 2

Compara la versión 1 (`prototipos/version-v1/`) con la versión 2 (`src/`) y repite las comprobaciones de [`hallazgos.md`](hallazgos.md). Las capturas están en [`../evidencias/antes/`](../evidencias/antes/) y [`../evidencias/despues/`](../evidencias/despues/) y se generaron con el mismo recorrido sobre cada versión.

## 1. Correcciones aplicadas

| Backlog | Hallazgo | Cambio | Responsable | Archivos |
|---|---|---|---|---|
| B-01 | H-01 El buscador conserva el texto | Al volver al menú desde otra pantalla que no sea un detalle se limpian el buscador y el filtro. | Matias Morales | `src/presentation/controlador.js` |
| B-02 | H-02 El pedido confirmado no se puede volver a ver | "Mi pedido" muestra una tarjeta con el pedido confirmado. Si se vuelve atrás tras confirmar, se va a la confirmación en vez de a la espera de envío. | Matias Morales | `src/presentation/controlador.js`, `src/presentation/vistas/pedido.js` |
| B-04 | H-04 La búsqueda exige palabras seguidas | La búsqueda exige que aparezcan todas las palabras de la consulta, en cualquier orden. | Cristian Ango | `src/domain/busqueda.js` |
| B-07 | H-07 Textos de 11,5 a 12,8 px | Las cuatro reglas con texto por debajo de 13 px (progreso, pestañas, etiquetas de estado y nota del pie) pasan a 13 px. | Julio Jacho | `src/presentation/estilos.css` |

La versión 2 también cambia el texto del pie, que ahora dice "versión 2". La copia congelada de la versión 1 no se modificó.

## 2. Antes y después

| Hallazgo | Antes (versión 1) | Después (versión 2) | Evidencia |
|---|---|---|---|
| H-01 | Tras "Seguir comprando" el buscador decía «cafe» y se veía 1 producto. El filtro "Comida" mostraba "0 productos". | El buscador está vacío y se ven los 4 productos. El filtro "Comida" muestra los productos de comida. | [antes-01](../evidencias/antes/antes-01-buscador-al-volver-al-menu.png) y [antes-02](../evidencias/antes/antes-02-filtro-comida-tras-busqueda.png), [despues-01](../evidencias/despues/despues-01-buscador-al-volver-al-menu.png) y [despues-02](../evidencias/despues/despues-02-filtro-comida-tras-busqueda.png) |
| H-02 | "Mi pedido" mostraba "Tu pedido está vacío". Atrás tras confirmar llevaba a esa misma pantalla. | "Mi pedido" muestra "Tienes un pedido confirmado" con el número, la hora y "Ver pedido". Atrás tras confirmar vuelve a la confirmación. | [antes-03](../evidencias/antes/antes-03-mi-pedido-tras-confirmar.png), [despues-03](../evidencias/despues/despues-03-mi-pedido-tras-confirmar.png) |
| H-04 | «sanduche queso» no devolvía resultados. | Devuelve "Sanduche de queso". | [antes-04](../evidencias/antes/antes-04-busqueda-sanduche-queso.png), [despues-04](../evidencias/despues/despues-04-busqueda-sanduche-queso.png) |
| H-07 | 13 textos de entre 11,5 y 12,8 px en el menú. | 0 textos por debajo de 13 px en seis pantallas a 320 px. | [antes-06](../evidencias/antes/antes-06-menu-texto-pequeno.png), [despues-06](../evidencias/despues/despues-06-menu-texto-pequeno.png) |

Los hallazgos que no se corrigieron (H-03, H-05, H-06, H-08, H-09 y H-10) se comportan igual que en la versión 1, como se ve en `antes-05`, `antes-07`, `antes-08`, `antes-09` y `antes-10` frente a `despues-05`, `despues-07`, `despues-08`, `despues-09` y `despues-10`.

## 3. Comprobaciones repetidas

| Comprobación | Versión 1 | Versión 2 |
|---|---|---|
| Pruebas automáticas (`npm test`) | Con el código de búsqueda de la versión 1, 37 de 38 pasan: falla la prueba nueva de búsqueda por palabras (H-04). | **38 de 38 pasan.** |
| Búsqueda «sanduche queso» | Sin resultados | "Sanduche de queso" |
| Buscador al volver al menú desde "Seguir comprando" | Conserva «cafe» | Vacío |
| Botón Atrás tras confirmar | "Tu pedido está vacío" | Pantalla de confirmación |
| "Mi pedido" con el carrito vacío y un pedido confirmado | Solo el mensaje de vacío | Mensaje de vacío y tarjeta del pedido confirmado |
| Textos por debajo de 13 px en el menú | 13 | 0 |
| axe-core (WCAG 2.0 a 2.2, A y AA) en 11 pantallas y estados | 0 violaciones | 0 violaciones |
| Contraste mínimo medido | 5,6:1 | 5,6:1 |
| Desborde horizontal a 320 px y a 180 px | Ninguno | Ninguno |
| Errores de consola del navegador | Ninguno | Ninguno |

## 4. Sesión de verificación (P03, versión 2)

Detalle en [`participantes/P03-v2.md`](participantes/P03-v2.md).

| Medida | Versión 1 (P01 y P02) | Versión 2 (P03) |
|---|---|---|
| Éxito sin ayuda en T1, T2 y T3 | 6 de 6 | 3 de 3 |
| Acciones en T3 (mínimo 8) | 9 y 10 | **8** |
| Errores no críticos en T3 | 1 por sesión | **0** |
| SEQ de T3 | 5,0 | 7 |
| SUS | 78,8 (85,0 y 72,5) | 87,5 |

P03 es una sola persona distinta de P01 y P02. La diferencia no se puede atribuir estadísticamente a las correcciones, pero es coherente con ellas: en T3 desaparecieron las acciones de más que causaba el buscador.

## 5. Efecto sobre las tareas

| Tarea | Versión 1 | Versión 2 |
|---|---|---|
| T1 | Sin problemas | Sin cambios |
| T2 | Sin problemas | Sin cambios |
| T3 | El paso de encontrar el sanduche falla en el recorrido cognitivo y exige 1 o 2 acciones de más | El recorrido cognitivo pasa sin fallos; las acciones llegan al mínimo |

## 6. Conclusiones

| Dimensión | Versión 1 | Versión 2 |
|---|---|---|
| **Eficacia** | Las tres tareas se completan sin ayuda. | Se mantiene. |
| **Eficiencia** | T3 requiere 19 % más acciones que el mínimo. | T3 llega al mínimo de acciones. |
| **Satisfacción** | SUS de 78,8 y SEQ de T3 de 5,0 (por debajo de la referencia). | SUS de 87,5 y SEQ de T3 de 7 en la sesión de verificación. |

**Lo que no se resolvió:** el producto con pocas unidades que se agota al confirmar (H-03), el salto a "Mi pedido" tras agregar (H-06) y las horas pasadas (H-05). Están en el backlog con su responsable.

## 7. Limitaciones

- Con dos sesiones en la versión 1 y una en la versión 2, las cifras son descriptivas y no se generalizan.
- Los tiempos se midieron con el cronómetro de la página y no equivalen a tiempos humanos.
- Las tareas T1 a T3 no ejercitan H-03, H-04, H-07 ni H-02. Su corrección se comprobó con pruebas automáticas, mediciones y recorridos dirigidos, no con las sesiones.
- Falta repetir la evaluación con más personas, incluidas personas que usen teclado o lector de pantalla.
