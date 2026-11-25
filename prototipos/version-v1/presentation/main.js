/**
 * Raíz de composición: único lugar donde se crean los adaptadores de infraestructura
 * y se conectan con los casos de uso. El resto de la presentación solo ve casos de uso.
 */
import { AgregarAlPedido } from '../application/agregarAlPedido.js';
import { CambiarCantidad } from '../application/cambiarCantidad.js';
import { CambiarHoraRetiro } from '../application/cambiarHoraRetiro.js';
import { CancelarPedido } from '../application/cancelarPedido.js';
import { ConfirmarPedido } from '../application/confirmarPedido.js';
import { DeshacerQuitar } from '../application/deshacerQuitar.js';
import { ListarMenu } from '../application/listarMenu.js';
import { ObtenerPedido } from '../application/obtenerPedido.js';
import { ObtenerProducto } from '../application/obtenerProducto.js';
import { QuitarDelPedido } from '../application/quitarDelPedido.js';
import { ReiniciarDemostracion } from '../application/reiniciarDemostracion.js';
import { ResolverConflictoStock } from '../application/resolverConflictoStock.js';
import { RestaurarPedido } from '../application/restaurarPedido.js';
import { ValidarDatosRetiro } from '../application/validarDatosRetiro.js';
import { Almacenamiento } from '../infrastructure/almacenamiento.js';
import { InventarioLocal } from '../infrastructure/inventarioLocal.js';
import { RepositorioPedidosLocal } from '../infrastructure/repositorioPedidosLocal.js';
import { RepositorioProductosLocal } from '../infrastructure/repositorioProductosLocal.js';
import { iniciarControlador } from './controlador.js';

function localStorageSeguro() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const almacenamiento = new Almacenamiento(localStorageSeguro());
const repositorioProductos = new RepositorioProductosLocal(almacenamiento);
const repositorioPedidos = new RepositorioPedidosLocal(almacenamiento);
const servicioInventario = new InventarioLocal({ repositorioProductos });

const puertos = { repositorioProductos, repositorioPedidos, servicioInventario };

iniciarControlador({
  listarMenu: new ListarMenu(puertos),
  obtenerProducto: new ObtenerProducto(puertos),
  obtenerPedido: new ObtenerPedido(puertos),
  agregarAlPedido: new AgregarAlPedido(puertos),
  cambiarCantidad: new CambiarCantidad(puertos),
  quitarDelPedido: new QuitarDelPedido(puertos),
  deshacerQuitar: new DeshacerQuitar(puertos),
  validarDatosRetiro: new ValidarDatosRetiro(),
  confirmarPedido: new ConfirmarPedido(puertos),
  resolverConflictoStock: new ResolverConflictoStock(puertos),
  cambiarHoraRetiro: new CambiarHoraRetiro(puertos),
  cancelarPedido: new CancelarPedido(puertos),
  restaurarPedido: new RestaurarPedido(puertos),
  reiniciarDemostracion: new ReiniciarDemostracion(puertos),
});
