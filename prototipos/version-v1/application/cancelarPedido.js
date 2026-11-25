/** Caso de uso: cancelar el pedido confirmado. Queda guardado para poder restaurarlo. */
export class CancelarPedido {
  constructor({ repositorioPedidos }) {
    this.pedidos = repositorioPedidos;
  }

  ejecutar() {
    const confirmado = this.pedidos.obtenerConfirmado();
    if (!confirmado) return { ok: false, motivo: 'SIN_PEDIDO_ACTIVO' };
    confirmado.cancelar();
    this.pedidos.guardarCancelado(confirmado);
    this.pedidos.guardarConfirmado(null);
    return { ok: true, numero: confirmado.numero };
  }
}
