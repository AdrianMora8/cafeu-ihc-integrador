import { dinero, esc } from './formato.js';
import { etiquetaEstado } from './etiquetaEstado.js';
import { iconoCategoria } from './iconos.js';

/** Tarjeta de un producto del menú con su botón de detalle o de alternativas. */
export function tarjetaProducto(producto) {
  const agotado = producto.estado === 'agotado';
  return `<div class="card"><div class="ficha"><span class="thumb">${iconoCategoria(producto.categoria)}</span><div>` +
    `<h2>${esc(producto.nombre)}</h2><p class="muted">${esc(producto.resumen)}</p>` +
    `<p><span class="precio">${dinero(producto.precio)}</span> ${etiquetaEstado(producto.estado)}</p></div></div>` +
    `<button type="button" class="btn sec" data-ver="${producto.id}" aria-label="${agotado ? 'Ver alternativas a ' : 'Ver detalle de '}${esc(producto.nombre)}">` +
    `${agotado ? 'Ver alternativas' : 'Ver detalle'}</button></div>`;
}

/** Tarjeta compacta de una alternativa sugerida cuando un producto está agotado. */
export function tarjetaAlternativa(producto) {
  return `<div class="card"><div class="ficha"><span class="thumb">${iconoCategoria(producto.categoria)}</span><div>` +
    `<h2>${esc(producto.nombre)}</h2><p class="precio">${dinero(producto.precio)}</p></div></div>` +
    `<button type="button" class="btn" data-ver="${producto.id}">Ver ${esc(producto.nombre)}</button></div>`;
}
