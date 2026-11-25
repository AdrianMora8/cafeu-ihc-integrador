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

/**
 * Indica si el nombre o el resumen del producto contienen todas las palabras de la consulta.
 * Las palabras pueden estar en cualquier orden y no hace falta que sean seguidas:
 * "sanduche queso" encuentra "Sanduche de queso".
 */
export function coincideConBusqueda(producto, consulta) {
  const palabras = normalizarTexto(consulta).split(/\s+/).filter(Boolean);
  if (!palabras.length) return true;
  const texto = normalizarTexto(`${producto.nombre} ${producto.resumen}`);
  return palabras.every((palabra) => texto.includes(palabra));
}
