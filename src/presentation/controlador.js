import { CANTIDAD_MAXIMA, CANTIDAD_MINIMA } from '../application/configuracion.js';
import { anunciar, enfocar, restaurarFoco } from './accesibilidad.js';
import { crearEstadoUI } from './estadoUI.js';
import { vistaCancelado } from './vistas/cancelado.js';
import { vistaConfirmacion } from './vistas/confirmacion.js';
import { vistaDetalle } from './vistas/detalle.js';
import { vistaHora } from './vistas/hora.js';
import { vistaInicio } from './vistas/inicio.js';
import { vistaMenu } from './vistas/menu.js';
import { vistaPedido } from './vistas/pedido.js';
import { vistaProcesando } from './vistas/procesando.js';

const PANTALLAS = ['inicio', 'menu', 'detalle', 'pedido', 'procesando', 'confirmacion', 'hora', 'cancelado'];
const TITULOS = {
  inicio: 'Inicio', menu: 'Menú de hoy', detalle: 'Detalle del producto', pedido: 'Mi pedido',
  procesando: 'Enviando pedido', confirmacion: 'Pedido confirmado', hora: 'Cambiar hora de retiro', cancelado: 'Pedido cancelado',
};
const TAB_ACTIVA = {
  inicio: 'inicio', menu: 'menu', detalle: 'menu', pedido: 'pedido',
  procesando: 'pedido', confirmacion: 'pedido', hora: 'pedido', cancelado: 'pedido',
};

/**
 * Controlador de la interfaz: escucha los eventos, llama a los casos de uso y vuelve a dibujar.
 * @param {Record<string, { ejecutar: Function }>} casos Casos de uso ya construidos (ver main.js).
 */
export function iniciarControlador(casos) {
  const ui = crearEstadoUI();
  const main = document.getElementById('contenido');
  const $ = (id) => document.getElementById(id);

  const leerPedidos = () => casos.obtenerPedido.ejecutar();
  const hayErrores = (errores) => Object.keys(errores).length > 0;

  /* ---------- navegación ---------- */
  function irA(nombre) {
    if (!PANTALLAS.includes(nombre)) nombre = 'inicio';
    if (window.location.hash !== `#/${nombre}`) window.location.hash = `#/${nombre}`;
    mostrar(nombre);
  }

  function pantallaDesdeHash() {
    const h = (window.location.hash || '').replace(/^#\/?/, '');
    return PANTALLAS.includes(h) ? h : 'inicio';
  }

  /* ---------- dibujo ---------- */
  function dibujarVista() {
    switch (ui.pantalla) {
      case 'menu':
        return vistaMenu(ui, casos.listarMenu.ejecutar({ consulta: ui.busqueda, categoria: ui.filtro }));
      case 'detalle':
        return vistaDetalle(ui, casos.obtenerProducto.ejecutar(ui.productoActual));
      case 'pedido': {
        let productoConflicto = null;
        let alternativaConflicto = null;
        if (ui.conflicto) {
          const { producto, alternativas } = casos.obtenerProducto.ejecutar(ui.conflicto);
          productoConflicto = producto;
          alternativaConflicto = alternativas.find((a) => a.estado === 'ok') ?? null;
        }
        const { borrador, confirmado } = leerPedidos();
        return vistaPedido(ui, { pedido: borrador, confirmado, productoConflicto, alternativaConflicto });
      }
      case 'procesando':
        return vistaProcesando();
      case 'confirmacion':
        return vistaConfirmacion(ui, leerPedidos().confirmado);
      case 'hora':
        return vistaHora(ui, leerPedidos().confirmado);
      case 'cancelado':
        return vistaCancelado(leerPedidos().cancelado);
      default:
        return vistaInicio();
    }
  }

  function pintar() {
    main.innerHTML = dibujarVista();
    $('contador').textContent = leerPedidos().borrador.unidades;
    document.querySelectorAll('[data-tab]').forEach((tab) => {
      if (tab.getAttribute('data-tab') === TAB_ACTIVA[ui.pantalla]) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
    if (ui.pantalla === 'procesando') {
      requestAnimationFrame(() => { const barra = $('barra'); if (barra) barra.style.width = '100%'; });
    }
  }

  function mostrar(nombre) {
    if (ui.envio && nombre !== 'procesando') {
      ui.envio.abort();
      ui.envio = null;
    }
    // Sin nada que enviar no se muestra la espera: se lleva a la persona a su pedido confirmado o al carrito.
    if (nombre === 'procesando' && !ui.envio && leerPedidos().borrador.vacio) {
      irA(leerPedidos().confirmado ? 'confirmacion' : 'pedido');
      return;
    }
    ui.pantalla = nombre;
    if (nombre === 'procesando' && !ui.envio) iniciarEnvio();
    pintar();
    window.scrollTo(0, 0);
    const titulo = main.querySelector('h1');
    const prioridad = main.querySelector('#conflicto, #resumen-errores');
    if (ui.enfocarDespues) {
      enfocar(main, ui.enfocarDespues);
      ui.enfocarDespues = null;
    } else if (prioridad) prioridad.focus();
    else if (titulo) titulo.focus();
    anunciar(TITULOS[nombre]);
  }

  /** Vuelve a dibujar la pantalla conservando (o moviendo) el foco. */
  function redibujar(foco) {
    const activo = document.activeElement;
    const id = activo && activo.id;
    const posicion = activo && activo.selectionStart;
    pintar();
    if (foco) enfocar(main, foco);
    else if (id) restaurarFoco(id, posicion);
  }

  /* ---------- envío del pedido ---------- */
  function iniciarEnvio() {
    const control = new AbortController();
    ui.envio = control;
    casos.confirmarPedido
      .ejecutar({ nombre: ui.datos.nombre, hora: ui.datos.hora }, { signal: control.signal })
      .then((resultado) => {
        if (control.signal.aborted || ui.envio !== control) return;
        ui.envio = null;
        if (resultado.ok) {
          ui.aviso = '';
          irA('confirmacion');
        } else if (resultado.motivo === 'PRODUCTO_AGOTADO') {
          ui.conflicto = resultado.productoId;
          irA('pedido');
          anunciar(`Error: ${resultado.productoNombre} se agotó. Tu pedido no se envió.`);
        } else {
          if (resultado.errores) ui.errores = resultado.errores;
          irA('pedido');
        }
      });
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest ? ev.target.closest('[data-ir],[data-ver],[data-filtro],[data-accion],[data-foco]') : null;
    if (!el) return;

    const foco = el.getAttribute('data-foco');
    if (foco) {
      ev.preventDefault();
      const campo = $(`f-${foco}`);
      if (campo) campo.focus();
      return;
    }

    const ir = el.getAttribute('data-ir');
    if (ir) {
      if (['pedido', 'menu', 'inicio'].includes(ir)) {
        ui.aviso = '';
        ui.deshacerQuitar = false;
        if (ir !== 'pedido') { ui.errores = {}; ui.conflicto = null; }
      }
      if (ir === 'hora') { ui.errores = {}; ui.datos.horaNueva = ''; }
      // Al volver al menú desde otra pantalla (no desde un detalle) se limpia la búsqueda anterior.
      if (ir === 'menu' && !['menu', 'detalle'].includes(ui.pantalla)) { ui.busqueda = ''; ui.filtro = 'todo'; }
      irA(ir);
      return;
    }

    const ver = el.getAttribute('data-ver');
    if (ver) { ui.productoActual = ver; ui.cantidad = CANTIDAD_MINIMA; irA('detalle'); return; }

    const filtro = el.getAttribute('data-filtro');
    if (filtro) { ui.filtro = filtro; redibujar(`[data-filtro="${filtro}"]`); anunciar(`Filtro ${filtro}`); return; }

    const id = el.getAttribute('data-id');
    switch (el.getAttribute('data-accion')) {
      case 'limpiar':
        ui.busqueda = ''; ui.filtro = 'todo'; redibujar('#buscar');
        break;
      case 'd-menos':
        ui.cantidad = Math.max(CANTIDAD_MINIMA, ui.cantidad - 1);
        redibujar(['[data-accion="d-menos"]', '[data-accion="d-mas"]']);
        break;
      case 'd-mas':
        ui.cantidad = Math.min(CANTIDAD_MAXIMA, ui.cantidad + 1);
        redibujar(['[data-accion="d-mas"]', '[data-accion="d-menos"]']);
        break;
      case 'agregar': {
        const r = casos.agregarAlPedido.ejecutar({ productoId: ui.productoActual, cantidad: ui.cantidad });
        if (!r.ok) { anunciar('No se pudo agregar el producto.'); break; }
        ui.aviso = `${r.nombre} agregado al pedido.`; ui.avisoTipo = 'ok'; ui.deshacerQuitar = false;
        ui.enfocarDespues = '#aviso';
        irA('pedido');
        break;
      }
      case 'menos':
      case 'mas': {
        const operacion = el.getAttribute('data-accion');
        casos.cambiarCantidad.ejecutar({ productoId: id, operacion });
        ui.aviso = '';
        const otro = operacion === 'menos' ? 'mas' : 'menos';
        redibujar([`[data-accion="${operacion}"][data-id="${id}"]`, `[data-accion="${otro}"][data-id="${id}"]`]);
        break;
      }
      case 'quitar': {
        const r = casos.quitarDelPedido.ejecutar({ productoId: id });
        if (!r.ok) break;
        ui.aviso = `${r.nombre} se quitó del pedido.`; ui.avisoTipo = 'ok'; ui.deshacerQuitar = true;
        redibujar('[data-accion="deshacer"]');
        anunciar(ui.aviso);
        break;
      }
      case 'deshacer': {
        const r = casos.deshacerQuitar.ejecutar();
        if (r.ok) ui.aviso = `${r.nombre} restaurado.`;
        ui.deshacerQuitar = false;
        redibujar('h1');
        anunciar(ui.aviso);
        break;
      }
      case 'c-quitar': {
        const r = casos.resolverConflictoStock.ejecutar({ accion: 'quitar', productoId: ui.conflicto });
        if (!r.ok) break;
        ui.aviso = `${r.nombre} se quitó de tu pedido. Revisa los datos y confirma de nuevo.`; ui.avisoTipo = 'aviso';
        ui.conflicto = null;
        redibujar('#aviso');
        anunciar(ui.aviso);
        break;
      }
      case 'c-cambiar': {
        const r = casos.resolverConflictoStock.ejecutar({ accion: 'cambiar', productoId: ui.conflicto, alternativaId: el.getAttribute('data-alt') });
        if (!r.ok) break;
        ui.aviso = `Cambiamos el producto por ${r.nombre}. Revisa los datos y confirma de nuevo.`; ui.avisoTipo = 'aviso';
        ui.conflicto = null;
        redibujar('#aviso');
        anunciar(ui.aviso);
        break;
      }
      case 'cancelar-envio':
        if (ui.envio) { ui.envio.abort(); ui.envio = null; }
        ui.aviso = 'Cancelaste el envío. Tu pedido sigue guardado.'; ui.avisoTipo = 'aviso';
        ui.enfocarDespues = '#aviso';
        irA('pedido');
        break;
      case 'cancelar-abrir':
        $('dlg-num').textContent = `#${leerPedidos().confirmado?.numero ?? ''}`;
        $('dlg-cancelar').showModal();
        break;
      case 'cancelar-no':
        $('dlg-cancelar').close();
        break;
      case 'cancelar-si':
        $('dlg-cancelar').close();
        casos.cancelarPedido.ejecutar();
        ui.aviso = '';
        ui.enfocarDespues = null;
        irA('cancelado');
        break;
      case 'restaurar': {
        const r = casos.restaurarPedido.ejecutar();
        if (!r.ok) break;
        ui.aviso = `Pedido #${r.numero} restaurado.`;
        ui.enfocarDespues = '#aviso';
        irA('confirmacion');
        break;
      }
      case 'reiniciar':
        if (ui.envio) ui.envio.abort();
        casos.reiniciarDemostracion.ejecutar();
        Object.assign(ui, crearEstadoUI());
        irA('inicio');
        anunciar('Demostración reiniciada.');
        break;
      default:
    }
  });

  document.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (ev.target.id === 'form-pedido') {
      ui.datos.nombre = $('f-nombre').value;
      ui.datos.hora = $('f-hora').value;
      ui.errores = casos.validarDatosRetiro.ejecutar(ui.datos);
      ui.aviso = ''; ui.conflicto = null; ui.deshacerQuitar = false;
      if (hayErrores(ui.errores)) {
        pintar();
        const resumen = $('resumen-errores');
        if (resumen) resumen.focus();
        anunciar('Hay datos por corregir.');
      } else {
        irA('procesando');
      }
    } else if (ev.target.id === 'form-hora') {
      const nueva = $('f-hora').value;
      ui.datos.horaNueva = nueva;
      const r = casos.cambiarHoraRetiro.ejecutar({ hora: nueva });
      ui.errores = r.errores ?? {};
      if (!r.ok) {
        pintar();
        const resumen = $('resumen-errores');
        if (resumen) resumen.focus();
        anunciar('No se pudo cambiar la hora.');
      } else {
        ui.datos.hora = nueva; ui.datos.horaNueva = '';
        ui.aviso = `Hora de retiro actualizada a las ${nueva}.`;
        ui.enfocarDespues = '#aviso';
        irA('confirmacion');
      }
    }
  });

  document.addEventListener('input', (ev) => {
    const campo = ev.target;
    if (campo.id === 'buscar') {
      ui.busqueda = campo.value;
      const posicion = campo.selectionStart;
      pintar();
      restaurarFoco('buscar', posicion);
    } else if (campo.id === 'f-nombre') {
      ui.datos.nombre = campo.value;
      if (ui.errores.nombre && campo.value.trim().length >= 2) {
        delete ui.errores.nombre;
        const posicion = campo.selectionStart;
        pintar();
        restaurarFoco('f-nombre', posicion);
      }
    }
  });

  document.addEventListener('change', (ev) => {
    if (ev.target.id === 'f-hora' && ui.pantalla === 'pedido') {
      ui.datos.hora = ev.target.value;
      if (ui.errores.hora && ui.datos.hora) { delete ui.errores.hora; redibujar('#f-hora'); }
    }
  });

  document.querySelector('.skip').addEventListener('click', (ev) => { ev.preventDefault(); main.focus(); });
  $('dlg-cancelar').addEventListener('click', (ev) => { if (ev.target === ev.currentTarget) ev.currentTarget.close(); });
  window.addEventListener('hashchange', () => { if (pantallaDesdeHash() !== ui.pantalla) mostrar(pantallaDesdeHash()); });

  mostrar(pantallaDesdeHash());
}
