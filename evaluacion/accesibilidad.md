# Revisión de accesibilidad (versión 1)

Cubre teclado, foco, contraste, etiquetas y mensajes de error sobre `prototipos/version-v1/`, a 360 px de ancho, el 25/11/2026. Criterios de referencia: WCAG 2.2 niveles A y AA.

## 1. Método

| Comprobación | Cómo se hizo |
|---|---|
| Reglas automáticas | axe-core 4.10.2 con las etiquetas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` y `wcag22aa`, en once pantallas y estados. |
| Contraste | Cálculo de la relación de contraste de cada texto visible contra su fondo efectivo. |
| Teclado | Recorrido con `Tab`, `Enter` y `Esc` de la tarea T1 y del diálogo de cancelación. |
| Etiquetas | Conteo de controles sin nombre accesible. |
| Reflujo | Ancho de 180 px (equivalente a 200 % de zoom en un teléfono de 360 px). |

## 2. Checklist

| Criterio | Resultado | Evidencia |
|---|---|---|
| **Teclado.** Todo el flujo se completa solo con teclado | Cumple | T1 se completa con `Tab` y `Enter`. El orden del foco es el visual. |
| **Teclado.** Enlace "Saltar al contenido" | Cumple | Es el primer elemento que recibe el foco. |
| **Teclado.** `Esc` cierra el diálogo y devuelve el foco | Cumple | El foco entra en "No, mantener mi pedido" y vuelve a "Cancelar pedido". |
| **Foco visible** | Cumple | Contorno de 3 px sólido en todos los controles del menú. |
| **Foco tras cambiar de pantalla** | Cumple | El foco pasa al título, al mensaje de error o al aviso. |
| **Contraste de texto** (4,5:1) | Cumple | El mínimo medido es 5,6:1 en las once pantallas y estados. |
| **Etiquetas.** Campos con etiqueta visible | Cumple | "Nombre para el pedido", "Hora de retiro", "Nueva hora de retiro" y buscador con etiqueta para lector de pantalla. |
| **Nombres accesibles.** Controles sin nombre | Cumple | 0 controles sin nombre. Los botones de cantidad indican el producto. |
| **Mensajes de error.** Se anuncian y se asocian al campo | Cumple | `role="alert"`, resumen con foco, `aria-invalid` y `aria-describedby` por campo. |
| **Estado no solo por color** | Cumple | "Agotado hoy", "Quedan pocas unidades" y "Confirmado" llevan texto e ícono. |
| **Idioma y estructura** | Cumple | `lang="es"`, `header`, `main`, `nav` con nombre y `footer`. |
| **Reflujo a 200 %** | Cumple | Sin desplazamiento horizontal a 180 px de ancho. |
| **Movimiento reducido** | Cumple | La animación de espera se detiene con `prefers-reduced-motion`. |
| **Tamaño de los controles táctiles** (44 px) | Cumple con una excepción | Todos miden 44 px o más, salvo el enlace "Saltar al contenido" (42 px de alto). |
| **Tamaño del texto** | Observación | 13 textos de 11,5 a 12,8 px en el menú (progreso, pestañas, etiquetas de estado). WCAG no fija un mínimo, pero dificulta la lectura en un teléfono. Hallazgo H-07. |

## 3. Resultado de axe-core por pantalla

| Pantalla o estado | Violaciones | Reglas aprobadas |
|---|---|---|
| Inicio | 0 | 24 |
| Menú | 0 | 26 |
| Menú sin resultados | 0 | 26 |
| Detalle de producto agotado | 0 | 24 |
| Detalle de producto | 0 | 24 |
| Pedido con errores de validación | 0 | 28 |
| Pedido confirmado | 0 | 24 |
| Cambiar hora con error | 0 | 24 |
| Diálogo de cancelación | 0 | 13 |
| Pedido cancelado | 0 | 23 |
| Conflicto por producto agotado | 0 | 28 |

## 4. Limitaciones

- Las reglas automáticas detectan solo una parte de los problemas de accesibilidad. No se probó con un lector de pantalla real (NVDA, VoiceOver ni TalkBack).
- Los anuncios de `aria-live` se comprobaron por su presencia en el código, no por su pronunciación.
- No se evaluó el uso con ampliación de pantalla ni con conmutadores.
