# Hoja de observación y cuestionarios (Actividad 4)

Se llena una hoja por participante. Incluye el registro por tarea, la pregunta SEQ de cada tarea, el cuestionario SUS y las preguntas de cierre. Para cada sesión se copia esta plantilla en `evaluacion/piloto/` (P00) o `evaluacion/participantes/` (P01 y P02).

## 1. Datos de la sesión

| Campo | Valor |
|---|---|
| Código (P00, P01 o P02) | |
| Fecha, hora de inicio y de fin | |
| Edad, carrera y si usa CaféU o apps similares | |
| ¿Conoce el prototipo o las tareas? (debe ser No) | |
| ¿Cumple el perfil y no participó en el desarrollo? | |
| Consentimiento leído y aceptado | |
| ¿Acepta grabación de pantalla? | |
| Estado inicial comprobado (reinicio de la demostración, pantalla Inicio) | |
| Moderador / Registro de métricas / Observador / Soporte técnico | |
| Fallos técnicos de la aplicación durante la sesión | |
| Cómo se midió el tiempo (cronómetro, registrador de eventos de la página) | |

## 2. Registro por tarea (pensamiento en voz alta)

- **Éxito:** `Sí` (sin ayuda), `Con ayuda` (tras la pista única) o `No`.
- **Pista única, leída textualmente:** «Vuelve a leer la tarea y revisa las opciones que tienes en pantalla».
- **Error crítico:** impide terminar la tarea. **Error no crítico:** la persona se recupera sola.
- El moderador **no indica la respuesta ni señala controles**. Solo repite la consigna si la persona lo pide y lo anota.

| Tarea | Meta / Máx. (s) | Éxito | Tiempo (s) | Acciones (toques y escrituras) | Errores críticos | Errores no críticos | ¿Pista? | ¿Pidió repetir? | SEQ (1 a 7) | Frase textual | Dificultades observadas |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 Buscar «cafe» y agregarlo | 60 / 120 | | | | | | | | | | |
| T2 Cambiar la cantidad y decir el total | 45 / 90 | | | | | | | | | | |
| T3 Quitar, recuperar y confirmar | 120 / 240 | | | | | | | | | | |

**Acciones:** cantidad de toques, escrituras y selecciones que hace la persona en cada tarea. Se compara con las acciones mínimas de [`tareas.md`](tareas.md). Se añadió después del piloto P00 porque el tiempo solo no muestra el esfuerzo de la persona.

**Pregunta SEQ después de cada tarea:** "En general, esta tarea fue…", de 1 (muy difícil) a 7 (muy fácil).

## 3. Cuestionario SUS

Se entrega al terminar las tres tareas. Cada ítem se responde de 1 (totalmente en desacuerdo) a 5 (totalmente de acuerdo).

| N.º | Ítem | Respuesta (1 a 5) |
|---|---|---|
| 1 | Creo que me gustaría usar CaféU con frecuencia. | |
| 2 | Encontré la aplicación innecesariamente compleja. | |
| 3 | Pensé que la aplicación era fácil de usar. | |
| 4 | Creo que necesitaría ayuda de una persona con conocimientos técnicos para usarla. | |
| 5 | Encontré que las funciones de la aplicación estaban bien integradas. | |
| 6 | Pensé que había demasiada inconsistencia en la aplicación. | |
| 7 | Imagino que la mayoría de las personas aprendería a usarla rápidamente. | |
| 8 | Encontré la aplicación muy incómoda de usar. | |
| 9 | Me sentí muy seguro/a usando la aplicación. | |
| 10 | Necesité aprender muchas cosas antes de poder usarla. | |

**Cálculo:** ítems impares (1, 3, 5, 7, 9): respuesta − 1. Ítems pares (2, 4, 6, 8, 10): 5 − respuesta. Se suman los diez valores y se multiplica por 2,5. El resultado va de 0 a 100 y la referencia es 68.

## 4. Preguntas de cierre

1. ¿Qué fue lo más confuso o difícil?
2. ¿Qué fue lo que más te gustó?
3. ¿Qué cambiarías primero?

Se anotan las respuestas textuales.

## 5. Verificación antes de archivar la hoja

- [ ] El código de la sesión coincide con el nombre del archivo y con la fila de `resultados.csv`.
- [ ] No aparece ningún nombre real.
- [ ] Los tiempos, los errores y la ayuda salen de lo observado en la sesión.
