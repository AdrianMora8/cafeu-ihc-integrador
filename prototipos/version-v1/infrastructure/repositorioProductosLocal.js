import { RepositorioProductos } from '../application/puertos.js';
import { Producto, ESTADOS_PRODUCTO } from '../domain/producto.js';
import { CATALOGO_INICIAL } from './catalogoInicial.js';

const CLAVE_STOCK = 'cafeu.stock';

/**
 * Catálogo con datos iniciales en código. Los cambios de existencias
 * (por ejemplo un producto que se agota) se guardan en el almacenamiento.
 */
export class RepositorioProductosLocal extends RepositorioProductos {
  /** @param {import('./almacenamiento.js').Almacenamiento} almacenamiento */
  constructor(almacenamiento, catalogo = CATALOGO_INICIAL) {
    super();
    this.almacenamiento = almacenamiento;
    this.catalogo = catalogo;
  }

  listar() {
    const cambios = this.almacenamiento.leer(CLAVE_STOCK, {});
    return this.catalogo.map((datos) => new Producto({ ...datos, estado: cambios[datos.id] ?? datos.estado }));
  }

  obtener(id) {
    return this.listar().find((p) => p.id === id) ?? null;
  }

  marcarAgotado(id) {
    const cambios = this.almacenamiento.leer(CLAVE_STOCK, {});
    this.almacenamiento.escribir(CLAVE_STOCK, { ...cambios, [id]: ESTADOS_PRODUCTO.AGOTADO });
  }

  reiniciar() {
    this.almacenamiento.borrar(CLAVE_STOCK);
  }
}
