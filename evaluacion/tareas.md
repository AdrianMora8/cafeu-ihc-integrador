# Tareas de usabilidad (Actividad 4)

Tres tareas encadenadas con CaféU versión 1. El moderador las lee palabra por palabra y **nunca nombra un botón ni una pantalla**. El tiempo máximo es el doble de la meta.

## Estado inicial

Antes de cada sesión, el soporte técnico deja la aplicación así:

1. Abre `http://localhost:8080/` con `npm start`.
2. Usa "Reiniciar demostración" (enlace al pie de la página) para borrar pedidos y devolver el menú a su estado inicial.
3. Comprueba que la pantalla sea "Inicio", que "Mi pedido" muestre `0` y que el menú tenga cuatro productos (el jugo de naranja está agotado y la empanada tiene pocas unidades).

## Tareas

| ID | Consigna que se lee | Meta | Máximo | Acciones mínimas | Criterio de éxito observable | Respuesta correcta |
|---|---|---|---|---|---|---|
| T1 | "Quieres un café americano. Búscalo escribiendo «cafe», sin tilde, y agrégalo a tu pedido." | 60 s | 120 s | 4 | El pedido contiene 1 café americano. | 1 × Café americano, $1.50. |
| T2 | "Ahora necesitas dos cafés en lugar de uno. Cambia la cantidad en tu pedido y dime cuánto vas a pagar en total." | 45 s | 90 s | 1 | La cantidad queda en 2 y la persona dice el total que ve en pantalla. | 2 × Café americano, total **$3.00**. |
| T3 | "Agrega también un sanduche de queso. Después decides que no lo quieres y lo quitas, pero te arrepientes: recupéralo. Por último, confirma tu pedido a nombre de Ana para retirarlo a las 11:00 y dime tu número de pedido." | 120 s | 240 s | 8 | El pedido queda confirmado con 2 cafés y 1 sanduche, a nombre de Ana, a las 11:00, y la persona dice el número que ve. | Total **$5.75**, número **#CU-104**, retiro a las 11:00. |

## Escenario común

Eres una persona que sale de clase y quiere pedir en la cafetería desde el celular para retirar sin hacer fila. Nadie te va a explicar la aplicación y puedes pensar en voz alta.

## Relación con los requisitos

| Tarea | Requisitos que ejercita | Momento de verdad |
|---|---|---|
| T1 | RF-01, RF-02, RF-03 | MV1 (encontrar lo que quiere) |
| T2 | RF-03 | Verificación del total |
| T3 | RF-04, RF-05 | MV2 (saber que el pedido quedó registrado) |

## Métricas por tarea

| Métrica | Dimensión (ISO 9241-11) | Cómo se mide |
|---|---|---|
| Éxito | Eficacia | **Sí** (sin ayuda), **Con ayuda** (tras la pista única) o **No** (no termina o supera el máximo). Solo "Sí" cuenta como éxito. |
| Tiempo en tarea | Eficiencia | Segundos desde que el moderador termina la consigna hasta que la persona termina o abandona. |
| Errores | Eficacia y eficiencia | **Críticos** (impiden terminar) y **no críticos** (la persona se recupera sola). |
| Acciones | Eficiencia | Toques, escrituras y selecciones de la persona en la tarea, frente a las acciones mínimas de la tabla. |
| Ayuda | Eficacia | Si se usó la pista única: «Vuelve a leer la tarea y revisa las opciones que tienes en pantalla». |
| SEQ | Satisfacción por tarea | Pregunta de 1 a 7: "En general, esta tarea fue…" (1 muy difícil, 7 muy fácil). |
| SUS | Satisfacción global | 10 ítems de 1 a 5 al final de la sesión (puntaje de 0 a 100, referencia 68). |

## Criterios de éxito del estudio

Son referencias para leer los resultados, no pruebas estadísticas. La muestra es muy pequeña y los resultados son descriptivos.

| Dimensión | Referencia |
|---|---|
| Eficacia | Cada tarea la completan sin ayuda al menos 2 de las 3 sesiones. |
| Eficiencia | Los tiempos medianos quedan por debajo del máximo de cada tarea. |
| Satisfacción | SEQ promedio de 5,5 o más y SUS de 68 o más. |
