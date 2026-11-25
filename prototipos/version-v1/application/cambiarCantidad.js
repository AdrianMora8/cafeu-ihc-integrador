import { ErrorDominio } from '../domain/errores.js';

/** Caso de uso: subir o bajar la cantidad de una línea del pedido (siempre entre 1 y 9). */
export class CambiarCantidad {
  constructor({ repositorioPedidos }) {
    this.pedidos = repositorioPedidos;
  }

  /** @param {{ productoId: string, operacion: 'mas' | 'menos' }} datos */
  ejecutar({ productoId, operacion }) {
    const borrador = this.pedidos.obtenerBorrador();
    try {
      if (operacion === 'mas') borrador.incrementar(productoId);
      else if (operacion === 'menos') borrador.decrementar(productoId);
      else return { ok: false, motivo: 'OPERACION_INVALIDA' };
    } catch (error) {
      if (error instanceof ErrorDominio) return { ok: false, motivo: error.codigo };
      throw error;
    }
    this.pedidos.guardarBorrador(borrador);
    return { ok: true, cantidad: borrador.buscarDetalle(productoId).cantidad, total: borrador.total };
  }
}
