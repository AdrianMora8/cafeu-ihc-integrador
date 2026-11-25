import { productoADto } from './dto.js';

/** Caso de uso: ver el detalle de un producto y sus alternativas de la misma categoría. */
export class ObtenerProducto {
  constructor({ repositorioProductos }) {
    this.productos = repositorioProductos;
  }

  /** Si el id no existe devuelve el primer producto del catálogo, como hacía el prototipo v3. */
  ejecutar(productoId) {
    const todos = this.productos.listar();
    const producto = this.productos.obtener(productoId) ?? todos[0];
    const alternativas = todos
      .filter((x) => x.id !== producto.id && !x.estaAgotado() && x.categoria === producto.categoria)
      .map(productoADto);
    return { producto: productoADto(producto), alternativas };
  }
}
