# Evaluación heurística E4, Oscar Riofrio (versión 1)

**Foco:** control y libertad, y estado del pedido (heurísticas 3, 1 y 7). Se revisan las diez heurísticas.
**Método:** recorridos de ida y vuelta (quitar y salir, confirmar y volver con el botón Atrás del navegador) con un navegador automatizado sobre `prototipos/version-v1/`. Fecha: 25/11/2026.
**Escala de severidad:** 0 no es un problema · 1 cosmético · 2 menor · 3 mayor · 4 catastrófico.

## Las diez heurísticas

| N.º | Heurística | Veredicto | Evidencia |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | Cumple con observaciones | Tras confirmar, "Mi pedido" muestra "Tu pedido está vacío" y no recuerda el pedido confirmado (H-02). |
| 2 | Relación entre el sistema y el mundo real | Cumple | "Restaurar pedido" y "Mantener mi pedido" se entienden. |
| 3 | Control y libertad del usuario | Cumple con observaciones | Hay cancelar el envío, diálogo de cancelación y restaurar. El botón Atrás tras confirmar lleva a "Tu pedido está vacío" (H-02) y "Deshacer" desaparece si se sale de la pantalla (H-08). |
| 4 | Consistencia y estándares | Cumple | Los diálogos siguen el patrón de `dialog` con foco en la opción segura. |
| 5 | Prevención de errores | Cumple | Confirmación antes de cancelar. |
| 6 | Reconocer en lugar de recordar | Cumple con observaciones | Para ver el pedido confirmado hay que recordar que se confirmó (H-02). |
| 7 | Flexibilidad y eficiencia de uso | Cumple con observaciones | Tras agregar un producto se salta a "Mi pedido" (H-06). |
| 8 | Diseño estético y minimalista | Cumple | |
| 9 | Ayudar a reconocer, diagnosticar y recuperarse de errores | Cumple | Quitar o cambiar el producto agotado conserva el pedido. |
| 10 | Ayuda y documentación | Cumple | Sin ayuda adicional necesaria para tres tareas. |

## Hallazgos reportados

| ID | Hallazgo | Evidencia | Severidad |
|---|---|---|---|
| H-02 | Una vez confirmado el pedido no hay forma de volver a verlo: "Mi pedido" aparece vacío y el botón Atrás del navegador lleva a "Tu pedido está vacío". | `evidencias/antes/antes-03` | 3 |
| H-08 | Si se quita un producto y se sale de la pantalla, el botón "Deshacer" ya no existe y el producto se pierde. | `evidencias/antes/antes-08` | 2 |
| H-01 | El buscador conserva el texto y el filtro "Todo" no lo borra. | `evidencias/antes/antes-01` | 3 |
| H-06 | Tras agregar un producto se salta a "Mi pedido". | Observado en las tres sesiones. | 2 |
