import { boton } from '../componentes/boton.js';
import { dinero, esc } from '../componentes/formato.js';
import { icono } from '../componentes/iconos.js';
import { mensaje } from '../componentes/mensaje.js';
import { progreso } from '../componentes/progreso.js';

/** @param {{ aviso: string }} ui  @param {object|null} pedido Pedido confirmado. */
export function vistaConfirmacion(ui, pedido) {
  if (!pedido) {
    return progreso(2) + '<h1 tabindex="-1">Pedido confirmado</h1>' +
      mensaje({ contenido: 'Todavía no hay un pedido confirmado.' }) +
      boton({ texto: 'Ir al menú', clase: 'btn', datos: { ir: 'menu' } });
  }
  const aviso = ui.aviso ? mensaje({ tipo: 'ok', id: 'aviso', enfocable: true, contenido: esc(ui.aviso) }) : '';
  const lineas = pedido.lineas.map((l) => `<p>${l.cantidad} × ${esc(l.nombre)}</p>`).join('');
  return progreso(2) + `<div class="check">${icono('i-check')}</div>` +
    '<h1 class="center" tabindex="-1">¡Pedido confirmado!</h1>' + aviso +
    mensaje({ tipo: 'ok', centrado: true, contenido: `Número de pedido<br><strong style="font-size:1.3rem">#${esc(pedido.numero)}</strong>` }) +
    `<div class="card"><h2>Resumen</h2>${lineas}` +
    `<hr style="border:0;border-top:1px dashed var(--borde)"><div class="row"><span>Total</span><strong class="precio">${dinero(pedido.total)}</strong></div>` +
    `<p class="muted">Retira a nombre de <strong>${esc(pedido.nombre)}</strong> a las <strong>${esc(pedido.hora)}</strong>.</p></div>` +
    boton({ texto: 'Cambiar hora de retiro', clase: 'btn sec', datos: { ir: 'hora' } }) +
    boton({ texto: 'Cancelar pedido', clase: 'btn peligro', datos: { accion: 'cancelar-abrir' } }) +
    boton({ texto: 'Volver al menú', clase: 'btn sec', datos: { ir: 'menu' } });
}
