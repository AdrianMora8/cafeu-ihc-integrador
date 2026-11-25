import { ErrorDominio } from '../domain/errores.js';

/** Caso de uso: salir de un conflicto de stock quitando el producto agotado o cambiándolo por otro. */
export class ResolverConflictoStock {
  constructor({ repositorioPedidos, repositorioProductos }) {
    this.pedidos = repositorioPedidos;
    this.productos = repositorioProductos;
  }

  /** @param {{ accion: 'quitar' | 'cambiar', productoId: string, alternativaId?: string }} datos */
  ejecutar({ accion, productoId, alternativaId }) {
    const borrador = this.pedidos.obtenerBorrador();
    try {
      const quitado = borrador.quitar(productoId);
      if (accion === 'quitar') {
        this.pedidos.guardarBorrador(borrador);
        return { ok: true, accion, nombre: quitado.nombre };
      }
      const alternativa = this.productos.obtener(alternativaId);
      if (accion !== 'cambiar' || !alternativa) return { ok: false, motivo: 'ALTERNATIVA_INVALIDA' };
      borrador.agregar(alternativa, quitado.cantidad);
      this.pedidos.guardarBorrador(borrador);
      return { ok: true, accion, nombre: alternativa.nombre };
    } catch (error) {
      if (error instanceof ErrorDominio) return { ok: false, motivo: error.codigo };
      throw error;
    }
  }
}
