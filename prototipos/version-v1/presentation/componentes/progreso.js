const PASOS = ['Carta', 'Pedido', 'Listo'];

/** Indicador de progreso del pedido. `paso` es el índice (0, 1 o 2) del paso actual. */
export function progreso(paso) {
  const items = PASOS.map((nombre, i) => `<li${i === paso ? ' class="on" aria-current="step"' : ''}>${nombre}</li>`).join('');
  return `<ol class="progreso" aria-label="Progreso del pedido">${items}</ol>`;
}
