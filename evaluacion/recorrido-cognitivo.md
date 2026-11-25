# Recorrido cognitivo de T2 y T3 (versión 1)

Se recorre cada acción de las tareas con las cuatro preguntas del recorrido cognitivo. Una acción **pasa** si las cuatro respuestas son afirmativas, tiene **riesgo** si alguna es dudosa y **falla** si la persona no podría completarla sin ayuda.

1. ¿La persona intentará lograr el efecto correcto?
2. ¿Verá que la acción está disponible?
3. ¿Asociará la acción con el efecto que busca?
4. ¿Verá un avance o una confirmación tras hacerla?

Usuaria de referencia: Camila (ver [`../docs/analisis-ux.md`](../docs/analisis-ux.md)). Se contrasta con las sesiones P00, P01 y P02.

## T2. Cambiar la cantidad y verificar el total

| Paso | Acción | 1 | 2 | 3 | 4 | Resultado | Evidencia |
|---|---|---|---|---|---|---|---|
| 1 | Ubicar el selector de cantidad de la línea del café | Sí | Sí | Sí | Sí | Pasa | El selector está en la tarjeta del producto, con botones de 46 px. |
| 2 | Tocar "+" una vez | Sí | Sí | Sí | Sí | Pasa | El número cambia a 2 y el contador de "Mi pedido" sube. |
| 3 | Leer el total | Sí | Sí | Sí | Sí | Pasa | El total aparece debajo de las líneas en una tarjeta propia ($3.00). Las tres sesiones lo leyeron sin errores. |

Conclusión de T2: ningún riesgo observado. Las tres sesiones la completaron con 1 acción.

## T3. Quitar, recuperar y confirmar

| Paso | Acción | 1 | 2 | 3 | 4 | Resultado | Evidencia |
|---|---|---|---|---|---|---|---|
| 1 | Volver al menú para agregar otro producto | Sí | Sí | Sí | Sí | Pasa | Hay "Seguir comprando" y la pestaña "Menú". |
| 2 | Encontrar el sanduche de queso | Sí | Sí | Dudoso | **No** | **Falla** | El buscador conserva «cafe» y solo se ve un producto. Las tres sesiones hicieron acciones de más (P00 y P02 dos, P01 una). Hallazgo H-01. |
| 3 | Abrir el detalle del sanduche | Sí | Sí | Sí | Sí | Pasa | "Ver detalle de Sanduche de queso". |
| 4 | Agregarlo al pedido | Sí | Sí | Sí | Sí | Pasa | Aviso "Sanduche de queso agregado al pedido." con el foco. |
| 5 | Quitar el sanduche | Sí | Sí | Sí | Sí | Pasa | "Quitar" separado del selector de cantidad. |
| 6 | Recuperar el sanduche | Sí | Sí | Sí | Sí | **Riesgo** | "Deshacer" funciona mientras se vea el aviso. Si la persona sale de la pantalla se pierde (H-08), pero en la tarea no ocurrió. |
| 7 | Escribir el nombre | Sí | Sí | Sí | Sí | Pasa | Etiqueta visible y ayuda. |
| 8 | Elegir la hora de retiro | Sí | Sí | Sí | Sí | **Riesgo** | La lista es fija y ofrece horas pasadas (H-05). En la tarea la hora estaba indicada. |
| 9 | Confirmar el pedido | Sí | Sí | Sí | Sí | Pasa | Pantalla "Enviando tu pedido…" con opción de cancelar el envío. |
| 10 | Leer el número de pedido | Sí | Sí | Sí | Sí | Pasa | "#CU-104" en un recuadro destacado. |

Conclusión de T3: un paso falla (2) y dos tienen riesgo (6 y 8). El fallo coincide con lo observado en las sesiones y con la evaluación heurística (H-01).

## Resumen

| Tarea | Pasos | Pasan | Riesgo | Fallan |
|---|---|---|---|---|
| T2 | 3 | 3 | 0 | 0 |
| T3 | 10 | 7 | 2 | 1 |
