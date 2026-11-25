/**
 * Mensaje de estado (éxito, error, aviso o neutro).
 * Los errores usan role="alert" y reciben el foco para que se vean y se anuncien.
 * @param {{ tipo?: 'ok'|'error'|'aviso'|'', id?: string, rol?: string, enfocable?: boolean, centrado?: boolean, contenido: string }} opciones
 */
export function mensaje({ tipo = '', id = '', rol = '', enfocable = false, centrado = false, contenido }) {
  const clases = ['msg', tipo, centrado ? 'center' : ''].filter(Boolean).join(' ');
  return `<div class="${clases}"${id ? ` id="${id}"` : ''}${rol ? ` role="${rol}"` : ''}${enfocable ? ' tabindex="-1"' : ''}>${contenido}</div>`;
}
