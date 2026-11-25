import { coincideConBusqueda } from '../domain/busqueda.js';
import { productoADto } from './dto.js';

/** Caso de uso: consultar el menú, con búsqueda y filtro por categoría. */
export class ListarMenu {
  constructor({ repositorioProductos }) {
    this.productos = repositorioProductos;
  }

  ejecutar({ consulta = '', categoria = 'todo' } = {}) {
    return this.productos
      .listar()
      .filter((p) => (categoria === 'todo' || p.categoria === categoria) && coincideConBusqueda(p, consulta))
      .map(productoADto);
  }
}
