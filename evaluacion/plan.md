# Plan de evaluación de usabilidad (Actividad 4)

**Asignatura:** Interacción Humano-Computador, quinto semestre de Software, UTA.
**Producto evaluado:** CaféU versión 1 (`prototipos/version-v1/`, idéntica a `src/` en el momento de la evaluación).
**Equipo:** Cristian Ango, Julio Jacho, Matias Morales y Oscar Riofrio.

## 1. Qué se evalúa y para qué

CaféU permite a estudiantes y personal de la universidad consultar el menú de la cafetería, armar un pedido, confirmarlo con su nombre y una hora de retiro, y gestionarlo después (cambiar hora, cancelar, restaurar). La evaluación busca saber si una persona puede hacerlo sola, con rapidez y sin frustración, y qué problemas lo impiden.

## 2. Pregunta de evaluación

> ¿En qué medida CaféU permite a una persona universitaria **buscar un producto, ajustar la cantidad, quitar y recuperar productos y confirmar su pedido** con eficacia, eficiencia y satisfacción, y qué problemas lo impiden?

Las tres dimensiones provienen de la norma ISO 9241-11.

## 3. Métodos y evidencias

| Método | Tipo | Qué aporta | Archivo |
|---|---|---|---|
| Evaluación heurística (10 heurísticas de Nielsen), cuatro evaluadores | Analítico | Anticipa problemas y explica qué principio se viola. Cinco hallazgos con severidad de 0 a 4. | `evaluacion/heuristicas/` |
| Recorrido cognitivo de T2 y T3 | Analítico | Detecta pasos donde la persona puede dudar o equivocarse. | `evaluacion/recorrido-cognitivo.md` |
| Revisión de accesibilidad | Analítico | Teclado, contraste, etiquetas y mensajes de error. | `evaluacion/accesibilidad.md` |
| Pilotaje (P00) | Empírico | Prueba el protocolo y las consignas antes de las sesiones. | `evaluacion/piloto/P00.md` |
| Pruebas con participantes (P01 y P02) con pensamiento en voz alta | Empírico | Mide éxito, tiempo, errores y satisfacción. | `evaluacion/participantes/`, `evaluacion/resultados.csv` |

Lo que coincide entre métodos analíticos y empíricos es la evidencia más fuerte (triangulación). Lo que detecta un solo método se registra con menor peso.

## 4. Participantes

- **Perfil:** estudiantes universitarios que podrían pedir en la cafetería desde el celular.
- **Sesiones:** P00 (piloto), P01 y P02.
- **Exclusión:** haber participado en el diseño o el desarrollo, conocer las tareas de antemano o ser menor de edad.
- **Identificación:** solo por código. No se escribe ningún nombre real.

## 5. Escenarios, estado inicial y tareas

Las tres tareas (T1 buscar y agregar, T2 modificar la cantidad y verificar el total, T3 quitar, recuperar y confirmar) están en [`tareas.md`](tareas.md), con su consigna, meta, tiempo máximo, criterio de éxito y respuesta correcta. El estado inicial antes de cada sesión también se describe allí.

## 6. Métricas, criterios de éxito y tiempos

| Métrica | Dimensión | Cálculo |
|---|---|---|
| Tasa de éxito | Eficacia | Sesiones con "Sí" en la tarea ÷ sesiones × 100. |
| Tiempo en tarea | Eficiencia | Segundos medidos con cronómetro desde el fin de la consigna hasta el fin de la tarea. Se reporta la mediana y el rango. |
| Acciones | Eficiencia | Toques, escrituras y selecciones por tarea, frente a la ruta más corta (T1 4, T2 1, T3 8). |
| Errores | Eficacia y eficiencia | Conteo de errores críticos y no críticos por tarea. |
| Ayuda | Eficacia | Cantidad de veces que se usó la pista única. |
| SEQ | Satisfacción | Promedio por tarea (1 a 7); referencia 5,5. |
| SUS | Satisfacción | Puntaje de 0 a 100; referencia 68. |

Tiempos máximos: T1 120 s, T2 90 s y T3 240 s (el doble de la meta). Una tarea que supera su máximo se registra como "No".

**Reglas fijadas antes de probar:**

- El moderador lee las consignas sin cambiarlas, no indica la respuesta y no guía hacia ningún control.
- La única ayuda es la pista única, leída textualmente, y la sesión se anota como "Con ayuda".
- Entre sesiones se reinicia la demostración para empezar siempre desde el mismo estado.
- Los datos de cada sesión se registran durante la sesión, no después.

## 7. Instrumentos

| Instrumento | Archivo |
|---|---|
| Consentimiento informado | [`consentimiento.md`](consentimiento.md) |
| Hoja de observación, SEQ y SUS | [`hoja-observacion.md`](hoja-observacion.md) |
| Tareas y criterios | [`tareas.md`](tareas.md) |

## 8. Roles durante las sesiones

| Rol | Qué hace | Responsable |
|---|---|---|
| Moderador | Lee el consentimiento y las consignas. No ayuda ni señala la pantalla. | Cristian Ango |
| Registro de métricas | Cronometra y anota éxito, tiempo y errores. | Julio Jacho |
| Observador | Anota frases textuales, dudas y la posible heurística violada. | Oscar Riofrio |
| Soporte técnico | Reinicia la demostración entre sesiones y controla la grabación. | Matias Morales |

## 9. Cuándo el protocolo está listo

Tras el pilotaje P00 el protocolo se considera listo si:

- nadie pide repetir una consigna por ambigüedad;
- la hoja de observación permite registrar todo sin improvisar casillas;
- la aplicación no tiene fallos técnicos en el recorrido completo;
- la sesión completa dura 15 minutos o menos.

Si algo falla, se corrige el protocolo y se anota el ajuste en `evaluacion/piloto/P00.md`.

## 10. Análisis posterior

Después de las sesiones se calculan las tasas de éxito, los tiempos y la satisfacción; se contrastan los hallazgos heurísticos con lo observado; se priorizan los problemas por severidad e impacto en `backlog.md`; se corrigen al menos dos y se repiten las comprobaciones sobre la versión 2. Las limitaciones de la muestra se declaran en las conclusiones: con tres sesiones los resultados son descriptivos y no se generalizan estadísticamente.
