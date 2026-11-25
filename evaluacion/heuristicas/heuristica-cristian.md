# Evaluación heurística E1, Cristian Ango (versión 1)

**Foco:** búsqueda, catálogo y eficiencia de uso (heurísticas 2, 6 y 7). Se revisan las diez heurísticas.
**Método:** recorrido libre de las ocho pantallas en un teléfono de 360 px y comprobaciones con un navegador automatizado sobre `prototipos/version-v1/`. Fecha: 25/11/2026.
**Escala de severidad:** 0 no es un problema · 1 cosmético · 2 menor · 3 mayor · 4 catastrófico.

## Las diez heurísticas

| N.º | Heurística | Veredicto | Evidencia |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | Cumple con observaciones | Contador de "Mi pedido", progreso en tres pasos y pantalla de espera. El texto de la búsqueda anterior queda oculto como estado (H-01). |
| 2 | Relación entre el sistema y el mundo real | Cumple con observaciones | Lenguaje de la cafetería ("Mi pedido", "Quedan pocas unidades"). La búsqueda exige las palabras seguidas: «sanduche queso» no devuelve nada (H-04). |
| 3 | Control y libertad del usuario | Cumple | Deshacer, cancelar el envío, diálogo de cancelación y restaurar. |
| 4 | Consistencia y estándares | Cumple | Mismos botones, colores y mensajes en todas las pantallas. "Mi pedido" aparece en el botón superior y en la pestaña. |
| 5 | Prevención de errores | Cumple | Cantidad limitada de 1 a 9 y validación antes de enviar. |
| 6 | Reconocer en lugar de recordar | Cumple con observaciones | Total y resumen siempre visibles. Al volver al menú el buscador conserva «cafe» y esconde los demás productos (H-01). |
| 7 | Flexibilidad y eficiencia de uso | Cumple con observaciones | Búsqueda y filtros. Tras agregar un producto la aplicación salta a "Mi pedido" y para seguir comprando hay un paso más (H-06). |
| 8 | Diseño estético y minimalista | Cumple | Pantallas limpias, una acción principal por pantalla. |
| 9 | Ayudar a reconocer, diagnosticar y recuperarse de errores | Cumple | Resumen de errores con foco y mensajes con salida. |
| 10 | Ayuda y documentación | Cumple con observaciones | No hay ayuda, aunque la aplicación es simple. |

## Hallazgos reportados

| ID | Hallazgo | Evidencia | Severidad |
|---|---|---|---|
| H-01 | Al volver al menú el buscador conserva el texto anterior. Con «cafe» solo aparece el café, el filtro "Todo" no lo borra y "Comida" muestra "0 productos". | `evidencias/antes/antes-01` y `antes-02`. Se reproduce en P00, P01 y P02. | 3 |
| H-04 | La búsqueda no encuentra «sanduche queso» aunque el producto se llama "Sanduche de queso". | `evidencias/antes/antes-04` | 2 |
| H-06 | Después de agregar un producto se salta a "Mi pedido". Seguir comprando cuesta un paso más. | Observado en las tres sesiones. | 2 |
