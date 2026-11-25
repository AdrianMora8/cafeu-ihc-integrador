import { esc } from './formato.js';

/**
 * Botón reutilizable.
 * @param {{ texto: string, clase?: string, tipo?: string, datos?: Record<string,string>, ariaLabel?: string, deshabilitado?: boolean, estilo?: string }} opciones
 */
export function boton({ texto, clase = '', tipo = 'button', datos = {}, ariaLabel = '', deshabilitado = false, estilo = '' }) {
  const atributosDatos = Object.entries(datos).map(([k, v]) => ` data-${k}="${esc(v)}"`).join('');
  return `<button type="${tipo}" class="${clase}"${atributosDatos}` +
    (ariaLabel ? ` aria-label="${esc(ariaLabel)}"` : '') +
    (deshabilitado ? ' disabled aria-disabled="true"' : '') +
    (estilo ? ` style="${estilo}"` : '') +
    `>${texto}</button>`;
}
