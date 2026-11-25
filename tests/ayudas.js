import { AgregarAlPedido } from '../src/application/agregarAlPedido.js';
import { CambiarCantidad } from '../src/application/cambiarCantidad.js';
import { CambiarHoraRetiro } from '../src/application/cambiarHoraRetiro.js';
import { CancelarPedido } from '../src/application/cancelarPedido.js';
import { ConfirmarPedido } from '../src/application/confirmarPedido.js';
import { DeshacerQuitar } from '../src/application/deshacerQuitar.js';
import { ListarMenu } from '../src/application/listarMenu.js';
import { ObtenerPedido } from '../src/application/obtenerPedido.js';
import { QuitarDelPedido } from '../src/application/quitarDelPedido.js';
import { ResolverConflictoStock } from '../src/application/resolverConflictoStock.js';
import { RestaurarPedido } from '../src/application/restaurarPedido.js';
import { Almacenamiento } from '../src/infrastructure/almacenamiento.js';
import { InventarioLocal } from '../src/infrastructure/inventarioLocal.js';
import { RepositorioPedidosLocal } from '../src/infrastructure/repositorioPedidosLocal.js';
import { RepositorioProductosLocal } from '../src/infrastructure/repositorioProductosLocal.js';

/**
 * Arma la aplicación completa con almacenamiento en memoria y sin esperas,
 * para probar los casos de uso como los usa la interfaz.
 * Si se reutiliza `almacenamiento` equivale a recargar la página.
 */
export function crearAplicacion({ almacenamiento = new Almacenamiento(null), latenciaMs = 0 } = {}) {
  const repositorioProductos = new RepositorioProductosLocal(almacenamiento);
  const repositorioPedidos = new RepositorioPedidosLocal(almacenamiento);
  const servicioInventario = new InventarioLocal({ repositorioProductos, latenciaMs });
  const puertos = { repositorioProductos, repositorioPedidos, servicioInventario };
  return {
    almacenamiento,
    repositorioProductos,
    repositorioPedidos,
    casos: {
      listarMenu: new ListarMenu(puertos),
      obtenerPedido: new ObtenerPedido(puertos),
      agregarAlPedido: new AgregarAlPedido(puertos),
      cambiarCantidad: new CambiarCantidad(puertos),
      quitarDelPedido: new QuitarDelPedido(puertos),
      deshacerQuitar: new DeshacerQuitar(puertos),
      confirmarPedido: new ConfirmarPedido(puertos),
      resolverConflictoStock: new ResolverConflictoStock(puertos),
      cambiarHoraRetiro: new CambiarHoraRetiro(puertos),
      cancelarPedido: new CancelarPedido(puertos),
      restaurarPedido: new RestaurarPedido(puertos),
    },
  };
}
