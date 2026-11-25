import { ErrorDominio } from '../domain/errores.js';

/** Caso de uso: quitar una línea del pedido guardándola para poder deshacer. */
export class QuitarDelPedido {
  constructor({ repositorioPedidos }) {
    this.pedidos = repositorioPedidos;
  }

  ejecutar({ productoId }) {
    const borrador = this.pedidos.obtenerBorrador();
    let quitado;
    try {
      quitado = borrador.quitar(productoId);
    } catch (error) {
      if (error instanceof ErrorDominio) return { ok: false, motivo: error.codigo };
      throw error;
    }
    this.pedidos.guardarBorrador(borrador);
    this.pedidos.guardarUltimoQuitado(quitado);
    return { ok: true, nombre: quitado.nombre };
  }
}
