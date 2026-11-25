/** Caso de uso: restaurar el pedido que se acaba de cancelar. */
export class RestaurarPedido {
  constructor({ repositorioPedidos }) {
    this.pedidos = repositorioPedidos;
  }

  ejecutar() {
    const cancelado = this.pedidos.obtenerCancelado();
    if (!cancelado) return { ok: false, motivo: 'SIN_PEDIDO_CANCELADO' };
    cancelado.reactivar();
    this.pedidos.guardarConfirmado(cancelado);
    this.pedidos.guardarCancelado(null);
    return { ok: true, numero: cancelado.numero };
  }
}
