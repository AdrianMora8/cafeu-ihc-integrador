/** Utilidades de accesibilidad: anuncios para lector de pantalla y manejo del foco. */

/** Anuncia un texto en la región viva `#anuncio` (se vacía antes para que se vuelva a leer). */
export function anunciar(texto) {
  const region = document.getElementById('anuncio');
  if (!region) return;
  region.textContent = '';
  setTimeout(() => { region.textContent = texto; }, 40);
}

/** Da el foco al primer selector de la lista que exista y esté habilitado dentro de `raiz`. */
export function enfocar(raiz, selector) {
  const lista = Array.isArray(selector) ? selector : [selector];
  for (const s of lista) {
    const elemento = raiz.querySelector(s);
    if (elemento && !elemento.disabled) {
      elemento.focus();
      return;
    }
  }
}

/** Devuelve el foco a un campo conservando la posición del cursor. */
export function restaurarFoco(id, posicion) {
  const elemento = document.getElementById(id);
  if (!elemento) return;
  elemento.focus();
  if (posicion != null && elemento.setSelectionRange) {
    try { elemento.setSelectionRange(posicion, posicion); } catch { /* algunos tipos de campo no admiten selección */ }
  }
}
