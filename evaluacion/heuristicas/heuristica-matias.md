# Evaluación heurística E3, Matias Morales (versión 1)

**Foco:** formulario, errores y uso con teclado (heurísticas 5, 9 y 10). Se revisan las diez heurísticas.
**Método:** recorrido solo con teclado, pruebas de entradas límite y revisión automática de accesibilidad (axe-core 4.10.2) sobre `prototipos/version-v1/`. Fecha: 25/11/2026.
**Escala de severidad:** 0 no es un problema · 1 cosmético · 2 menor · 3 mayor · 4 catastrófico.

## Las diez heurísticas

| N.º | Heurística | Veredicto | Evidencia |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | Cumple | El foco se mueve al título o al mensaje de cada pantalla y se anuncia el cambio. |
| 2 | Relación entre el sistema y el mundo real | Cumple | Etiquetas "Nombre para el pedido" y "Hora de retiro". |
| 3 | Control y libertad del usuario | Cumple | `Esc` cierra el diálogo y el foco vuelve al botón "Cancelar pedido". |
| 4 | Consistencia y estándares | Cumple | Controles nativos (campo de texto, lista). |
| 5 | Prevención de errores | Cumple con observaciones | La lista de horas es fija y ofrece horas ya pasadas: a las 10:58 se puede elegir 10:00 (H-05). El nombre «12» se acepta (H-10). |
| 6 | Reconocer en lugar de recordar | Cumple | Etiquetas visibles y ayuda breve bajo cada campo. |
| 7 | Flexibilidad y eficiencia de uso | Cumple | Todo el flujo T1 se recorre con `Tab` y `Enter`. |
| 8 | Diseño estético y minimalista | Cumple | Un solo formulario sin campos innecesarios. |
| 9 | Ayudar a reconocer, diagnosticar y recuperarse de errores | Cumple con observaciones | El resumen de errores recibe el foco y enlaza a cada campo. El error de producto agotado llega tras la espera (H-03). |
| 10 | Ayuda y documentación | Cumple con observaciones | No hay ayuda y el tope de 9 unidades no se explica (H-09). |

Accesibilidad: axe-core no encuentra violaciones de WCAG 2.0, 2.1 ni 2.2 (A y AA) en las once pantallas y estados revisados. El detalle está en [`../accesibilidad.md`](../accesibilidad.md).

## Hallazgos reportados

| ID | Hallazgo | Evidencia | Severidad |
|---|---|---|---|
| H-05 | La lista de horas de retiro es fija (10:00 a 12:00) y permite elegir una hora que ya pasó. | `evidencias/antes/antes-05` | 2 |
| H-10 | El campo de nombre acepta «12» y el pedido queda "a nombre de 12". | `evidencias/antes/antes-10` | 1 |
| H-03 | Un producto con pocas unidades se agota al confirmar y el error llega después de esperar. | `evidencias/antes/antes-07` | 3 |
| H-09 | El tope de 9 unidades no se explica. | `evidencias/antes/antes-09` | 1 |
