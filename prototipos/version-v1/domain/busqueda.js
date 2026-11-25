/**
 * Búsqueda tolerante a mayúsculas y tildes.
 * Se normaliza con NFD (separa cada letra de su tilde) y se eliminan las marcas
 * diacríticas (\p{M}) antes de comparar, de modo que "cafe", "CAFÉ" y "café"
 * encuentran el mismo producto.
 */

export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();
}

/** Indica si el nombre o el resumen del producto contienen la consulta. */
export function coincideConBusqueda(producto, consulta) {
  const buscado = normalizarTexto(consulta);
  if (!buscado) return true;
  return normalizarTexto(`${producto.nombre} ${producto.resumen}`).includes(buscado);
}
