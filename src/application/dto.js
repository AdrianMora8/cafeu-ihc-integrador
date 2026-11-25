/**
 * Objetos de transferencia: datos simples que los casos de uso entregan a la presentación.
 * Así la interfaz nunca manipula entidades del dominio.
 */

export function productoADto(producto) {
  return {
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    resumen: producto.resumen,
    detalle: producto.detalle,
    precio: producto.precio,
    estado: producto.estado,
  };
}

/** @param {import('../domain/pedido.js').Pedido} pedido  @param {(id: string) => any} obtenerProducto */
export function pedidoADto(pedido, obtenerProducto = () => null) {
  return {
    numero: pedido.numero,
    estado: pedido.estado,
    nombre: pedido.nombre,
    hora: pedido.hora,
    unidades: pedido.unidades,
    total: pedido.total,
    vacio: pedido.estaVacio,
    lineas: pedido.detalles.map((d) => ({
      productoId: d.productoId,
      nombre: d.nombre,
      categoria: d.categoria,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal,
      estadoProducto: obtenerProducto(d.productoId)?.estado ?? 'ok',
    })),
  };
}
