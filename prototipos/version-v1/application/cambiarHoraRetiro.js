import { validarNuevaHora } from '../domain/reglas.js';

/** Caso de uso: cambiar la hora de retiro de un pedido ya confirmado. */
export class CambiarHoraRetiro {
  constructor({ repositorioPedidos }) {
    this.pedidos = repositorioPedidos;
  }

  ejecutar({ hora }) {
    const confirmado = this.pedidos.obtenerConfirmado();
    if (!confirmado) return { ok: false, motivo: 'SIN_PEDIDO_ACTIVO' };
    const errores = validarNuevaHora(hora, confirmado.hora);
    if (Object.keys(errores).length) return { ok: false, motivo: 'HORA_INVALIDA', errores };
    confirmado.cambiarHora(hora);
    this.pedidos.guardarConfirmado(confirmado);
    return { ok: true, hora };
  }
}
