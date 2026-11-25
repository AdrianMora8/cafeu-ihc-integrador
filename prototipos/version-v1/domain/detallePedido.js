import { ErrorDominio } from './errores.js';
import { CANTIDAD_MAXIMA, CANTIDAD_MINIMA, redondear } from './reglas.js';

/** Línea de un pedido: un producto con su precio al momento de agregarlo y una cantidad. */
export class DetallePedido {
  constructor({ productoId, nombre, categoria, precioUnitario, cantidad }) {
    if (!Number.isInteger(cantidad) || cantidad < CANTIDAD_MINIMA || cantidad > CANTIDAD_MAXIMA) {
      throw new ErrorDominio('CANTIDAD_INVALIDA', `La cantidad debe estar entre ${CANTIDAD_MINIMA} y ${CANTIDAD_MAXIMA}.`);
    }
    this.productoId = productoId;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precioUnitario = precioUnitario;
    this.cantidad = cantidad;
    Object.freeze(this);
  }

  static desdeProducto(producto, cantidad) {
    return new DetallePedido({
      productoId: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precioUnitario: producto.precio,
      cantidad,
    });
  }

  get subtotal() {
    return redondear(this.precioUnitario * this.cantidad);
  }

  conCantidad(cantidad) {
    return new DetallePedido({ ...this, cantidad });
  }
}
