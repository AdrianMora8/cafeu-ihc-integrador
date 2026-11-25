import { boton } from '../componentes/boton.js';
import { dinero, esc } from '../componentes/formato.js';
import { etiquetaEstado } from '../componentes/etiquetaEstado.js';
import { iconoCategoria } from '../componentes/iconos.js';
import { mensaje } from '../componentes/mensaje.js';
import { progreso } from '../componentes/progreso.js';
import { selectorCantidad } from '../componentes/selectorCantidad.js';
import { tarjetaAlternativa } from '../componentes/tarjetaProducto.js';

/** @param {{ cantidad: number }} ui  @param {{ producto: object, alternativas: object[] }} datos */
export function vistaDetalle(ui, { producto, alternativas }) {
  let cuerpo;
  if (producto.estado === 'agotado') {
    cuerpo = mensaje({
      tipo: 'aviso',
      enfocable: true,
      contenido: `<strong>${esc(producto.nombre)} está agotado hoy.</strong> Te sugerimos una alternativa de la misma categoría:`,
    }) + alternativas.map(tarjetaAlternativa).join('') +
      boton({ texto: 'Agregar al pedido (no disponible)', clase: 'btn', deshabilitado: true });
  } else {
    cuerpo = '<p class="muted">Cantidad</p>' +
      selectorCantidad({ valor: ui.cantidad, etiquetaGrupo: 'Cantidad', accionMenos: 'd-menos', accionMas: 'd-mas', idValor: 'd-cant', vivo: true }) +
      boton({ texto: `Agregar al pedido · ${dinero(producto.precio * ui.cantidad)}`, clase: 'btn', datos: { accion: 'agregar' } });
  }
  return progreso(0) + boton({ texto: '‹ Volver al menú', clase: 'pill', datos: { ir: 'menu' } }) +
    `<div class="thumb big" style="margin-top:12px">${iconoCategoria(producto.categoria)}</div>` +
    `<h1 tabindex="-1">${esc(producto.nombre)}</h1><p class="muted">${esc(producto.detalle)}</p>` +
    `<p><span class="precio" style="font-size:1.1rem">${dinero(producto.precio)}</span> ${etiquetaEstado(producto.estado)}</p>` + cuerpo;
}
