# Evaluación heurística E2, Julio Jacho (versión 1)

**Foco:** legibilidad, mensajes y consistencia visual (heurísticas 1, 4 y 8). Se revisan las diez heurísticas.
**Método:** recorrido de las ocho pantallas y medición del tamaño de texto, el contraste y el tamaño de los controles con un navegador automatizado sobre `prototipos/version-v1/`. Fecha: 25/11/2026.
**Escala de severidad:** 0 no es un problema · 1 cosmético · 2 menor · 3 mayor · 4 catastrófico.

## Las diez heurísticas

| N.º | Heurística | Veredicto | Evidencia |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | Cumple con observaciones | Mensajes verdes, ámbar y rojos con texto y borde. "Quedan pocas unidades" aparece, pero no avisa de que puede agotarse al confirmar (H-03). |
| 2 | Relación entre el sistema y el mundo real | Cumple | Textos claros y precios en dólares. |
| 3 | Control y libertad del usuario | Cumple | Salidas visibles en cada pantalla. |
| 4 | Consistencia y estándares | Cumple | Componentes iguales en todo el flujo. |
| 5 | Prevención de errores | Cumple | Botones de cantidad se deshabilitan en los límites. |
| 6 | Reconocer en lugar de recordar | Cumple | El resumen muestra lo elegido. |
| 7 | Flexibilidad y eficiencia de uso | Cumple | Atajos por teclado y saltar al contenido. |
| 8 | Diseño estético y minimalista | Cumple con observaciones | Diseño limpio, pero en el menú hay 13 textos de entre 11,5 y 12,8 px: etiquetas del progreso, pestañas y estado del producto (H-07). |
| 9 | Ayudar a reconocer, diagnosticar y recuperarse de errores | Cumple con observaciones | Buenos mensajes de error. El conflicto de stock llega tras la espera de envío (H-03). |
| 10 | Ayuda y documentación | Cumple con observaciones | El tope de 9 unidades no se explica (H-09). |

Contraste: el valor mínimo medido es 5,6:1 y no hay textos por debajo de 4,5:1.

## Hallazgos reportados

| ID | Hallazgo | Evidencia | Severidad |
|---|---|---|---|
| H-07 | Textos de 11,5 a 12,8 px en el progreso ("Carta", "Pedido", "Listo"), las pestañas y las etiquetas "Quedan pocas unidades" y "Agotado hoy". | `evidencias/antes/antes-06` | 2 |
| H-03 | El producto con "Quedan pocas unidades" se agota al confirmar sin aviso previo y la persona descubre el error tras la espera. | `evidencias/antes/antes-07` | 3 |
| H-01 | El buscador conserva el texto al volver al menú y oculta el resto del menú. | `evidencias/antes/antes-01` | 2 |
| H-09 | El botón "+" se deshabilita en 9 sin explicar el motivo. | `evidencias/antes/antes-09` | 1 |
