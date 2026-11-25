/**
 * Caso de uso: dejar la aplicación en su estado inicial (catálogo, pedidos y contador).
 * Lo usa quien modera las sesiones de prueba entre un participante y el siguiente.
 */
export class ReiniciarDemostracion {
  constructor({ repositorioPedidos, repositorioProductos }) {
    this.pedidos = repositorioPedidos;
    this.productos = repositorioProductos;
  }

  ejecutar() {
    this.pedidos.reiniciar();
    this.productos.reiniciar();
    return { ok: true };
  }
}
