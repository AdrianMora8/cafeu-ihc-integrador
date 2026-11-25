import { pedidoADto } from './dto.js';

/** Caso de uso: leer el estado actual del pedido en curso, el confirmado y el cancelado. */
export class ObtenerPedido {
  constructor({ repositorioPedidos, repositorioProductos }) {
    this.pedidos = repositorioPedidos;
    this.productos = repositorioProductos;
  }

  ejecutar() {
    const buscar = (id) => this.productos.obtener(id);
    const confirmado = this.pedidos.obtenerConfirmado();
    const cancelado = this.pedidos.obtenerCancelado();
    return {
      borrador: pedidoADto(this.pedidos.obtenerBorrador(), buscar),
      confirmado: confirmado ? pedidoADto(confirmado, buscar) : null,
      cancelado: cancelado ? pedidoADto(cancelado, buscar) : null,
      puedeDeshacer: this.pedidos.obtenerUltimoQuitado() !== null,
    };
  }
}
