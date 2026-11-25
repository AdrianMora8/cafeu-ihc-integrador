# Matriz heurística consolidada (versión 1)

Reúne las evaluaciones de los cuatro evaluadores: [E1 Cristian](heuristica-cristian.md), [E2 Julio](heuristica-julio.md), [E3 Matias](heuristica-matias.md) y [E4 Oscar](heuristica-oscar.md). La severidad consolidada es la mediana de las severidades que dieron los evaluadores que reportaron el hallazgo. Escala: 0 no es un problema, 1 cosmético, 2 menor, 3 mayor, 4 catastrófico.

## 1. Las diez heurísticas

| N.º | Heurística | Veredicto consolidado | Hallazgos |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | Cumple con observaciones | H-01, H-02, H-03 |
| 2 | Relación entre el sistema y el mundo real | Cumple con observaciones | H-04 |
| 3 | Control y libertad del usuario | Cumple con observaciones | H-02, H-08 |
| 4 | Consistencia y estándares | Cumple | Ninguno. "Mi pedido" aparece en dos controles, sin consecuencias observadas. |
| 5 | Prevención de errores | Cumple con observaciones | H-05, H-10 |
| 6 | Reconocer en lugar de recordar | Cumple con observaciones | H-01, H-02 |
| 7 | Flexibilidad y eficiencia de uso | Cumple con observaciones | H-04, H-06 |
| 8 | Diseño estético y minimalista | Cumple con observaciones | H-07 |
| 9 | Ayudar a reconocer, diagnosticar y recuperarse de errores | Cumple con observaciones | H-03 |
| 10 | Ayuda y documentación | Cumple con observaciones | H-09 |

## 2. Hallazgos con severidad

| ID | Hallazgo | Heurísticas | Evaluadores y severidad | Severidad consolidada | Evidencia |
|---|---|---|---|---|---|
| H-01 | El buscador conserva el texto al volver al menú y oculta el resto del menú. | 1, 6 | E1: 3 · E2: 2 · E4: 3 | **3** | [antes-01](../../evidencias/antes/antes-01-buscador-al-volver-al-menu.png), [antes-02](../../evidencias/antes/antes-02-filtro-comida-tras-busqueda.png) |
| H-02 | El pedido confirmado no se puede volver a ver: "Mi pedido" aparece vacío y Atrás lleva a "Tu pedido está vacío". | 1, 3, 6 | E4: 3 | **3** | [antes-03](../../evidencias/antes/antes-03-mi-pedido-tras-confirmar.png) |
| H-03 | El producto con "Quedan pocas unidades" se agota al confirmar sin aviso previo. | 1, 9 | E2: 3 · E3: 3 | **3** | [antes-07](../../evidencias/antes/antes-07-producto-se-agota-al-confirmar.png) |
| H-04 | La búsqueda exige las palabras seguidas: «sanduche queso» no encuentra "Sanduche de queso". | 2, 7 | E1: 2 | **2** | [antes-04](../../evidencias/antes/antes-04-busqueda-sanduche-queso.png) |
| H-05 | La lista de horas de retiro es fija y ofrece horas que ya pasaron. | 5 | E3: 2 | **2** | [antes-05](../../evidencias/antes/antes-05-horas-de-retiro.png) |
| H-06 | Tras agregar un producto se salta a "Mi pedido" y seguir comprando cuesta un paso más. | 7 | E1: 2 · E4: 2 | **2** | Sesiones P00, P01 y P02 |
| H-07 | Textos de 11,5 a 12,8 px en progreso, pestañas y etiquetas de estado. | 8 | E2: 2 | **2** | [antes-06](../../evidencias/antes/antes-06-menu-texto-pequeno.png) |
| H-08 | Si se quita un producto y se sale de la pantalla, "Deshacer" desaparece. | 3 | E4: 2 | **2** | [antes-08](../../evidencias/antes/antes-08-quitar-y-salir.png) |
| H-09 | El tope de 9 unidades se aplica sin explicar el motivo. | 5, 10 | E2: 1 · E3: 1 | **1** | [antes-09](../../evidencias/antes/antes-09-tope-de-nueve.png) |
| H-10 | El campo de nombre acepta «12». | 5 | E3: 1 | **1** | [antes-10](../../evidencias/antes/antes-10-nombre-numerico-aceptado.png) |

## 3. Cómo se obtuvo cada evidencia

| Evidencia | Procedimiento |
|---|---|
| Capturas `antes-01` a `antes-10` | Se generaron sobre `prototipos/version-v1/` con un navegador automatizado a 360 px, repitiendo el mismo recorrido que después se repite sobre la versión 2. |
| Tamaños de texto y contraste | Medición de cada elemento con texto en las pantallas Inicio, Menú, Detalle, Pedido y Confirmación. |
| Botón Atrás, quitar y salir, nombre «12», horas | Recorridos automatizados con los pasos descritos en cada evaluación. |
| Producto que se agota | Se agrega la empanada de pollo (pocas unidades) y se confirma el pedido. |

## 4. Lo que la evaluación heurística no cubre

Las tareas T1 a T3 no usan la empanada, así que H-03 solo la detecta el método analítico. H-02, H-04, H-05, H-07, H-08, H-09 y H-10 tampoco aparecen en las sesiones porque ninguna tarea las ejercita.
