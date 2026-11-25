import { boton } from '../componentes/boton.js';
import { esc } from '../componentes/formato.js';
import { icono } from '../componentes/iconos.js';
import { mensaje } from '../componentes/mensaje.js';
import { progreso } from '../componentes/progreso.js';

/** @param {object|null} pedido Último pedido cancelado, que aún se puede restaurar. */
export function vistaCancelado(pedido) {
  if (!pedido) {
    return '<h1 tabindex="-1">Pedido cancelado</h1>' +
      mensaje({ contenido: 'No hay pedidos cancelados.' }) +
      boton({ texto: 'Ir al menú', clase: 'btn', datos: { ir: 'menu' } });
  }
  return progreso(2) + `<div class="check x">${icono('i-x')}</div>` +
    '<h1 class="center" tabindex="-1">Pedido cancelado</h1>' +
    mensaje({ centrado: true, contenido: `El pedido <strong>#${esc(pedido.numero)}</strong> se canceló y no se cobrará nada.` }) +
    boton({ texto: `Restaurar pedido #${esc(pedido.numero)}`, clase: 'btn', datos: { accion: 'restaurar' } }) +
    boton({ texto: 'Volver al menú', clase: 'btn sec', datos: { ir: 'menu' } });
}
