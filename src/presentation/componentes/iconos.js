/** Ícono decorativo de la categoría de un producto (el significado lo da el texto, no el ícono). */
export function iconoCategoria(categoria) {
  return `<svg aria-hidden="true"><use href="#${categoria === 'comida' ? 'i-food' : 'i-cup'}"/></svg>`;
}

/** Ícono decorativo por identificador del sprite. */
export function icono(id) {
  return `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
}
