/** Caso de uso: recuperar la última línea que se quitó del pedido. */
export class DeshacerQuitar {
  constructor({ repositorioPedidos }) {
    this.pedidos = repositorioPedidos;
  }

  ejecutar() {
    const quitado = this.pedidos.obtenerUltimoQuitado();
    if (!quitado) return { ok: false, motivo: 'NADA_QUE_DESHACER' };
    const borrador = this.pedidos.obtenerBorrador();
    borrador.restaurarDetalle(quitado);
    this.pedidos.guardarBorrador(borrador);
    this.pedidos.guardarUltimoQuitado(null);
    return { ok: true, nombre: quitado.nombre };
  }
}
