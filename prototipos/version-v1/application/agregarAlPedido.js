import { ErrorDominio } from '../domain/errores.js';

/** Caso de uso: agregar un producto disponible al pedido en curso. */
export class AgregarAlPedido {
  constructor({ repositorioPedidos, repositorioProductos }) {
    this.pedidos = repositorioPedidos;
    this.productos = repositorioProductos;
  }

  ejecutar({ productoId, cantidad = 1 }) {
    const producto = this.productos.obtener(productoId);
    if (!producto) return { ok: false, motivo: 'PRODUCTO_INEXISTENTE' };
    const borrador = this.pedidos.obtenerBorrador();
    try {
      borrador.agregar(producto, cantidad);
    } catch (error) {
      if (error instanceof ErrorDominio) return { ok: false, motivo: error.codigo };
      throw error;
    }
    this.pedidos.guardarBorrador(borrador);
    return { ok: true, nombre: producto.nombre };
  }
}
