# Requisitos (Actividad 2)

Seis requisitos funcionales y cuatro no funcionales. Cada uno tiene un criterio de aceptación que se puede comprobar y su trazabilidad está en [`trazabilidad.md`](trazabilidad.md).

## Requisitos funcionales

| ID | Requisito | Prioridad | Criterio de aceptación |
|---|---|---|---|
| RF-01 | El sistema muestra el catálogo con nombre, descripción, precio y disponibilidad (disponible, pocas unidades o agotado). | Alta | Los cuatro productos del menú aparecen con su precio y la etiqueta de estado cuando corresponde. |
| RF-02 | La persona puede buscar productos y filtrarlos por categoría sin que importen las mayúsculas ni las tildes. | Alta | Escribir "cafe", "CAFE" o "café" devuelve "Café americano"; si no hay resultados se muestra un mensaje con la opción "Mostrar todo el menú". |
| RF-03 | La persona puede agregar productos al pedido, elegir su cantidad (de 1 a 9) y ver el total actualizado. | Alta | Al cambiar la cantidad se recalculan el subtotal de la línea y el total; no se puede bajar de 1 ni pasar de 9. |
| RF-04 | La persona puede quitar un producto del pedido y deshacer esa acción. | Alta | Tras "Quitar" aparece un aviso con "Deshacer", que devuelve el producto con su cantidad. |
| RF-05 | La persona puede confirmar el pedido indicando su nombre y la hora de retiro, y recibe un número de pedido. Si el nombre o la hora no son válidos, o si un producto se agota, el sistema lo explica y ofrece cómo continuar. | Alta | Con datos válidos se muestra el número (por ejemplo CU-104) y el resumen. Con datos inválidos aparece un resumen de errores. Si un producto se agota, el pedido no se envía y se ofrece quitarlo o cambiarlo. |
| RF-06 | La persona puede cambiar la hora de retiro de un pedido confirmado, cancelarlo y restaurarlo. | Media | La nueva hora queda guardada; cancelar pide confirmación; "Restaurar" devuelve el pedido con el mismo número. |

## Requisitos no funcionales

| ID | Categoría | Requisito | Criterio de aceptación |
|---|---|---|---|
| RNF-01 | Usabilidad móvil | La interfaz se diseña primero para pantallas pequeñas (Mobile First) y los controles táctiles miden al menos 44 px. | Se usa sin desplazamiento horizontal desde 320 px de ancho; los botones principales miden 46 px de alto o más. |
| RNF-02 | Accesibilidad | Todo el flujo se completa solo con teclado, con foco visible, HTML semántico, etiquetas en los campos y mensajes de error anunciados. | Se recorre de T1 a T3 con `Tab`, `Enter` y `Esc`; existe el enlace "Saltar al contenido"; los errores usan `role="alert"`. |
| RNF-03 | Persistencia | El pedido en curso, el confirmado y el estado del inventario se conservan al recargar la página. | Tras recargar, el pedido sigue en pantalla y el siguiente número de pedido continúa la secuencia. |
| RNF-04 | Mantenibilidad | El código se organiza en cuatro capas con dependencias en un solo sentido y pruebas automatizadas. | La prueba de arquitectura confirma que el dominio no depende de otras capas y la suite completa pasa con `npm test`. |

## Alcance

Incluye consultar, buscar, armar el pedido, confirmarlo y gestionarlo después. No incluye pagos, inicio de sesión ni administración del catálogo: el inventario es local y los datos se guardan solo en el navegador.
