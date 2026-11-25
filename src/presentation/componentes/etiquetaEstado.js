/** Etiqueta de disponibilidad. Siempre lleva texto: el color nunca es el único indicador. */
export function etiquetaEstado(estado) {
  if (estado === 'agotado') return '<span class="etiqueta agotado">Agotado hoy</span>';
  if (estado === 'pocas') return '<span class="etiqueta pocas">Quedan pocas unidades</span>';
  return '';
}
