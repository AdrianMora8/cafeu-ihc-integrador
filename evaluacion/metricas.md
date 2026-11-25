# Métricas de la evaluación (versión 1)

Fuente: [`resultados.csv`](resultados.csv). Cuentan las sesiones **P01 y P02** sobre la versión 1. P00 es el piloto y P03 verifica la versión 2 (ver [`validacion-v2.md`](validacion-v2.md)).

> **Muestra y validez.** Con n = 2 las cifras son **descriptivas**: no se generalizan estadísticamente. Los tiempos se midieron con el cronómetro de la página y son muy bajos: no deben leerse como tiempos de una persona. La evidencia más útil de eficiencia es la cantidad de acciones.

## 1. Eficacia

| Tarea | Éxito sin ayuda | Tasa de éxito | Con ayuda | Errores críticos | Errores no críticos |
|---|---|---|---|---|---|
| T1 Buscar y agregar | 2 de 2 | 100 % | 0 | 0 | 0 |
| T2 Cambiar cantidad y verificar total | 2 de 2 | 100 % | 0 | 0 | 0 |
| T3 Quitar, recuperar y confirmar | 2 de 2 | 100 % | 0 | 0 | 2 |
| **Total** | **6 de 6** | **100 %** | **0** | **0** | **2** |

Todas las personas terminaron las tres tareas sin ayuda. Los dos errores no críticos ocurrieron en T3 y tienen la misma causa: el buscador conservaba el texto «cafe» (hallazgo H-01).

## 2. Eficiencia

### Acciones (toques, escrituras y selecciones)

| Tarea | Mínimas | P01 | P02 | Mediana | Exceso sobre el mínimo |
|---|---|---|---|---|---|
| T1 | 4 | 4 | 4 | 4 | 0 % |
| T2 | 1 | 1 | 1 | 1 | 0 % |
| T3 | 8 | 9 | 10 | 9,5 | +19 % (1 y 2 acciones de más) |

Las acciones de más de T3 son las que el buscador obligó a hacer: reescribirlo (P01) o probar el filtro "Comida" y pulsar "Mostrar todo el menú" (P02).

### Tiempo en tarea (cronómetro de la página)

| Tarea | Meta / Máximo | P01 | P02 | Mediana | Rango |
|---|---|---|---|---|---|
| T1 | 60 / 120 s | 6,1 s | 3,5 s | 4,8 s | 3,5 a 6,1 s |
| T2 | 45 / 90 s | 4,1 s | 2,7 s | 3,4 s | 2,7 a 4,1 s |
| T3 | 120 / 240 s | 13,5 s | 17,6 s | 15,6 s | 13,5 a 17,6 s |

Todas las medianas están por debajo de la meta, pero por la forma de medirlos no se interpretan como tiempos humanos.

## 3. Satisfacción

| Medida | P01 | P02 | Promedio | Referencia | Lectura |
|---|---|---|---|---|---|
| SEQ T1 (1 a 7) | 7 | 6 | 6,5 | 5,5 | Por encima |
| SEQ T2 | 7 | 7 | 7,0 | 5,5 | Por encima |
| SEQ T3 | 5 | 5 | **5,0** | 5,5 | **Por debajo** |
| SEQ promedio de las tres tareas | | | 6,2 | 5,5 | Por encima |
| SUS (0 a 100) | 85,0 | 72,5 | 78,8 | 68 | Por encima |

T3 es la única tarea por debajo de la referencia de satisfacción, y es la que se ve afectada por el buscador.

## 4. Lectura frente a los criterios del plan

| Dimensión | Criterio | Resultado |
|---|---|---|
| Eficacia | Cada tarea la completan sin ayuda al menos 2 de las 3 sesiones | Cumple: 2 de 2 en las tres tareas. |
| Eficiencia | Medianas de tiempo por debajo del máximo | Cumple en los tiempos medidos, con la salvedad de que no equivalen a tiempos humanos. En acciones, T3 excede el mínimo en 19 %. |
| Satisfacción | SEQ de 5,5 o más y SUS de 68 o más | SEQ y SUS cumplen en promedio. SEQ de T3 (5,0) queda por debajo. |

## 5. Limitaciones

- Dos sesiones no representan la variedad de personas usuarias. Se necesitan más sesiones para confirmar estas cifras.
- Los hallazgos H-02 a H-10 no se ejercitan en las tareas T1 a T3: solo los detecta la evaluación analítica.
- Los resultados no incluyen personas con necesidades de accesibilidad.
