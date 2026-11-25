/**
 * Puertos de la capa de aplicación.
 *
 * Son los contratos que los casos de uso necesitan del exterior. La infraestructura
 * los implementa (extendiendo estas clases) y la aplicación nunca conoce los detalles
 * de LocalStorage, de un API ni del servicio de inventario.
 */

function noImplementado(metodo) {
  throw new Error(`Puerto sin implementar: ${metodo}`);
}

/** Acceso al catálogo de productos. */
export class RepositorioProductos {
  /** @returns {import('../domain/producto.js').Producto[]} */
  listar() { return noImplementado('RepositorioProductos.listar'); }
  /** @returns {import('../domain/producto.js').Producto | null} */
  obtener(_id) { return noImplementado('RepositorioProductos.obtener'); }
  /** Marca el producto como agotado y conserva ese estado. */
  marcarAgotado(_id) { return noImplementado('RepositorioProductos.marcarAgotado'); }
  /** Devuelve el catálogo a su estado inicial. */
  reiniciar() { return noImplementado('RepositorioProductos.reiniciar'); }
}

/** Persistencia del pedido en curso, el confirmado, el cancelado y la última línea quitada. */
export class RepositorioPedidos {
  obtenerBorrador() { return noImplementado('RepositorioPedidos.obtenerBorrador'); }
  guardarBorrador(_pedido) { return noImplementado('RepositorioPedidos.guardarBorrador'); }
  obtenerConfirmado() { return noImplementado('RepositorioPedidos.obtenerConfirmado'); }
  guardarConfirmado(_pedido) { return noImplementado('RepositorioPedidos.guardarConfirmado'); }
  obtenerCancelado() { return noImplementado('RepositorioPedidos.obtenerCancelado'); }
  guardarCancelado(_pedido) { return noImplementado('RepositorioPedidos.guardarCancelado'); }
  obtenerUltimoQuitado() { return noImplementado('RepositorioPedidos.obtenerUltimoQuitado'); }
  guardarUltimoQuitado(_detalle) { return noImplementado('RepositorioPedidos.guardarUltimoQuitado'); }
  /** Entrega el siguiente número de pedido (por ejemplo "CU-104") y avanza el contador. */
  reservarNumero() { return noImplementado('RepositorioPedidos.reservarNumero'); }
  reiniciar() { return noImplementado('RepositorioPedidos.reiniciar'); }
}

/** Servicio externo que confirma que hay existencias antes de enviar el pedido. */
export class ServicioInventario {
  /**
   * @param {import('../domain/detallePedido.js').DetallePedido[]} _detalles
   * @param {{ signal?: AbortSignal }} [_opciones]
   * @returns {Promise<{ ok: true } | { ok: false, productoId: string }>}
   */
  async reservar(_detalles, _opciones) { return noImplementado('ServicioInventario.reservar'); }
}
