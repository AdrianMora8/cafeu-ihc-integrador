import { CANTIDAD_MAXIMA, CANTIDAD_MINIMA } from '../../application/configuracion.js';
import { esc } from './formato.js';

/**
 * Selector de cantidad con botones − y +. Los botones se deshabilitan en los límites.
 * @param {{ valor: number, etiquetaGrupo: string, accionMenos: string, accionMas: string, id?: string, sujeto?: string, idValor?: string, vivo?: boolean }} opciones
 */
export function selectorCantidad({ valor, etiquetaGrupo, accionMenos, accionMas, id = '', sujeto = '', idValor = '', vivo = false }) {
  const datoId = id ? ` data-id="${esc(id)}"` : '';
  const de = sujeto ? ` de ${esc(sujeto)}` : '';
  return `<div class="row" role="group" aria-label="${esc(etiquetaGrupo)}"${id ? ' style="gap:12px"' : ''}>` +
    `<button type="button" class="btn mini" data-accion="${accionMenos}"${datoId} aria-label="Disminuir cantidad${de}"${valor <= CANTIDAD_MINIMA ? ' disabled' : ''}>−</button>` +
    `<strong${vivo ? ' aria-live="polite"' : ''}${idValor ? ` id="${idValor}"` : ''}>${valor}</strong>` +
    `<button type="button" class="btn mini" data-accion="${accionMas}"${datoId} aria-label="Aumentar cantidad${de}"${valor >= CANTIDAD_MAXIMA ? ' disabled' : ''}>+</button></div>`;
}
