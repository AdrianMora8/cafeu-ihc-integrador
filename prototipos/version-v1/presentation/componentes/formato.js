/** Escapa texto para insertarlo de forma segura dentro de HTML. */
export function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Formatea un valor como dinero: 1.5 → "$1.50". */
export function dinero(valor) {
  return `$${valor.toFixed(2)}`;
}
