# User flow (Actividad 2)

Tres flujos de la persona usuaria: **compra**, **modificación** y **cancelación**. Los rombos son decisiones; los bloques rojos son errores con camino de recuperación.

## 1. Compra (T1 y parte de T3)

```mermaid
flowchart TD
    A([Abre CaféU]) --> B[Entra al menú]
    B --> C[Busca o filtra productos]
    C --> D{¿Encuentra el producto?}
    D -- No --> D1[Mensaje: sin resultados<br/>Mostrar todo el menú]:::err --> C
    D -- Sí --> E[Abre el detalle]
    E --> F{¿Está disponible?}
    F -- Agotado --> F1[Aviso y alternativas de la misma categoría]:::err --> E
    F -- Sí --> G[Elige la cantidad de 1 a 9]
    G --> H[Agrega al pedido]
    H --> I[Revisa el pedido y el total]
    I --> J[Escribe su nombre y elige la hora]
    J --> K{¿Datos válidos?}
    K -- No --> K1[Resumen de errores con foco<br/>Corrige junto al campo]:::err --> J
    K -- Sí --> L[Envío del pedido]
    L --> M{¿Sigue habiendo existencias?}
    M -- No --> M1[Error: el producto se agotó<br/>Quitarlo o cambiarlo]:::err --> I
    M -- Sí --> N([Pedido confirmado con número])
    L -- Cancelar envío --> I

    classDef err fill:#fdecea,stroke:#b71c1c,color:#7f1010;
```

## 2. Modificación (T2 y T3)

```mermaid
flowchart TD
    A([Está en Mi pedido]) --> B[Sube o baja la cantidad con − y +]
    B --> C{¿Está dentro de 1 a 9?}
    C -- Límite --> C1[El botón se deshabilita]:::err --> B
    C -- Sí --> D[El subtotal y el total se actualizan]
    D --> E{¿Quiere quitar un producto?}
    E -- Sí --> F[Quitar]
    F --> G[Aviso con Deshacer]
    G -- Deshacer --> D
    G -- Continúa --> H[Confirma el pedido]
    E -- No --> H
    H --> I([Pedido confirmado])
    I --> J{¿Necesita otra hora?}
    J -- Sí --> K[Cambiar hora de retiro]
    K --> L{¿Es una hora distinta?}
    L -- No --> L1[Error: ya retiras a esa hora]:::err --> K
    L -- Sí --> M([Hora actualizada])

    classDef err fill:#fdecea,stroke:#b71c1c,color:#7f1010;
```

## 3. Cancelación (T3)

```mermaid
flowchart TD
    A([Pedido confirmado]) --> B[Cancelar pedido]
    B --> C{Diálogo: ¿cancelar el pedido?}
    C -- No o Esc --> A
    C -- Sí --> D[Pedido cancelado, sin cobro]
    D --> E{¿Se arrepiente?}
    E -- Restaurar --> F([Pedido confirmado otra vez, mismo número])
    E -- No --> G([Vuelve al menú])
```
