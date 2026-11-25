# Hallazgos y triangulación (versión 1)

Contrasta lo que encontró la evaluación analítica (heurística, recorrido cognitivo y accesibilidad) con lo observado en las sesiones. Detalle de cada fuente en [`heuristicas/consolidado.md`](heuristicas/consolidado.md), [`recorrido-cognitivo.md`](recorrido-cognitivo.md), [`accesibilidad.md`](accesibilidad.md), [`participantes/`](participantes/) y [`metricas.md`](metricas.md).

## 1. Qué detectó cada método

| ID | Hallazgo | Heurística (evaluadores) | Recorrido cognitivo | Accesibilidad | Sesiones | Confirmación |
|---|---|---|---|---|---|---|
| H-01 | El buscador conserva el texto al volver al menú | E1, E2, E4 | Falla en T3 paso 2 | No aplica | P00, P01 y P02 (3 de 3) | **Ambos métodos** |
| H-02 | El pedido confirmado no se puede volver a ver | E4 | No aplica | No aplica | No ejercitado | Solo analítico |
| H-03 | Un producto con pocas unidades se agota al confirmar sin aviso previo | E2, E3 | No aplica | No aplica | No ejercitado (las tareas no usan la empanada) | Solo analítico |
| H-04 | La búsqueda exige las palabras seguidas | E1 | No aplica | No aplica | No ejercitado | Solo analítico |
| H-05 | La lista de horas incluye horas ya pasadas | E3 | Riesgo en T3 paso 8 | No aplica | No ejercitado (la hora venía indicada) | Solo analítico |
| H-06 | Tras agregar se salta a "Mi pedido" | E1, E4 | No aplica | No aplica | 3 de 3 hicieron un paso extra para seguir comprando | **Ambos métodos** |
| H-07 | Textos de 11,5 a 12,8 px | E2 | No aplica | Observación | No ejercitado | Solo analítico |
| H-08 | "Deshacer" desaparece al salir de la pantalla | E4 | Riesgo en T3 paso 6 | No aplica | No ocurrió | Solo analítico |
| H-09 | El tope de 9 unidades no se explica | E2, E3 | No aplica | No aplica | No ejercitado | Solo analítico |
| H-10 | El nombre acepta «12» | E3 | No aplica | No aplica | No ejercitado | Solo analítico |

**Coincidencias entre métodos:** H-01 es el hallazgo más sólido: lo marcaron tres evaluadores, el recorrido cognitivo lo predijo en el paso 2 de T3 y las tres sesiones lo sufrieron. H-06 también aparece en ambos métodos, pero como un paso extra y no como un error.

**Lo que solo ve un método:** siete hallazgos aparecen únicamente en la evaluación analítica porque las tareas no los ejercitan. Se registran con menor peso. Ningún hallazgo de las sesiones quedó sin explicación analítica.

## 2. Severidad, frecuencia e impacto

Escala de severidad: 0 no es un problema, 1 cosmético, 2 menor, 3 mayor, 4 catastrófico.

| ID | Severidad | Frecuencia observada | Impacto | Prioridad |
|---|---|---|---|---|
| H-01 | 3 | 3 de 3 sesiones | Alto: provoca acciones de más y el menor SEQ (T3 = 5,0) | **P1** |
| H-02 | 3 | No ejercitado | Alto: la persona pierde de vista su pedido | **P2** |
| H-03 | 3 | No ejercitado | Alto: error tras la espera de envío | **P2** |
| H-06 | 2 | 3 de 3 sesiones (paso extra) | Medio | **P2** |
| H-04 | 2 | No ejercitado | Medio: búsqueda sin resultados | P3 |
| H-05 | 2 | No ejercitado | Medio: puede elegir una hora pasada | P3 |
| H-07 | 2 | No ejercitado | Medio: lectura difícil en pantallas pequeñas | P3 |
| H-08 | 2 | No ocurrió | Medio: se pierde un producto quitado | P3 |
| H-09 | 1 | No ejercitado | Bajo | P4 |
| H-10 | 1 | No ejercitado | Bajo | P4 |

### Regla de prioridad

| Prioridad | Regla |
|---|---|
| P1 | Severidad 4, o severidad 3 confirmada por ambos métodos. |
| P2 | Severidad 3 detectada por un solo método, o severidad 2 confirmada por ambos. |
| P3 | Severidad 2 detectada por un solo método. |
| P4 | Severidad 1. |

## 3. Qué se decidió corregir en la versión 2

| ID | Decisión | Motivo |
|---|---|---|
| H-01 | **Corregir** | Es P1, tiene el mayor impacto y un cambio acotado. |
| H-02 | **Corregir** | Es P2 de severidad 3 y el cambio es acotado a la pantalla "Mi pedido". |
| H-04 | **Corregir** | Es un cambio pequeño en el dominio y se puede probar con pruebas automáticas. |
| H-07 | **Corregir** | Es un cambio solo de estilos, sin riesgo para el flujo. |
| H-03 | Pendiente | Exige cambios coordinados en inventario, caso de uso y pantalla, y repetir las pruebas completas. |
| H-06 | Pendiente | Cambia el flujo principal (quedarse en el detalle tras agregar) y requiere una decisión de diseño. |
| H-05, H-08, H-09, H-10 | Pendientes | Prioridad P3 o P4. |

Se corrigen cuatro problemas, con lo que se cumple el mínimo de dos. Las razones, los responsables y los criterios de aceptación están en [`backlog.md`](backlog.md), y la comprobación en [`validacion-v2.md`](validacion-v2.md).
