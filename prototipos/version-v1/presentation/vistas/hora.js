import { HORAS_RETIRO } from '../../application/configuracion.js';
import { boton } from '../componentes/boton.js';
import { campoSeleccion } from '../componentes/campo.js';
import { esc } from '../componentes/formato.js';
import { mensaje } from '../componentes/mensaje.js';

/** @param {{ errores: object, datos: object }} ui  @param {object|null} pedido Pedido confirmado. */
export function vistaHora(ui, pedido) {
  if (!pedido) {
    return '<h1 tabindex="-1">Cambiar hora de retiro</h1>' +
      mensaje({ contenido: 'No hay un pedido activo para modificar.' }) +
      boton({ texto: 'Ir al menú', clase: 'btn', datos: { ir: 'menu' } });
  }
  const error = ui.errores.hora
    ? mensaje({
        tipo: 'error',
        id: 'resumen-errores',
        rol: 'alert',
        enfocable: true,
        contenido: `<strong>No se pudo cambiar la hora:</strong> <a href="#" data-foco="hora">${esc(ui.errores.hora)}</a>`,
      })
    : '';
  return boton({ texto: '‹ Volver al pedido', clase: 'pill', datos: { ir: 'confirmacion' } }) +
    '<h1 tabindex="-1" style="margin-top:12px">Cambiar hora de retiro</h1>' +
    `<p class="muted">Pedido <strong>#${esc(pedido.numero)}</strong> · hora actual <strong>${esc(pedido.hora)}</strong></p>` + error +
    '<form id="form-hora" novalidate>' +
    campoSeleccion({ clave: 'hora', etiqueta: 'Nueva hora de retiro', ayuda: 'Elige una hora distinta a la actual.', opciones: HORAS_RETIRO, seleccion: ui.datos.horaNueva, error: ui.errores.hora }) +
    '<button type="submit" class="btn">Guardar nueva hora</button></form>' +
    boton({ texto: 'Mantener la hora actual', clase: 'btn sec', datos: { ir: 'confirmacion' } });
}
