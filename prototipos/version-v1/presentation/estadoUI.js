/**
 * Estado de la interfaz: lo que la pantalla recuerda entre un dibujo y otro.
 * Los datos del negocio (pedido, catálogo) no viven aquí; se piden a los casos de uso.
 */
export function crearEstadoUI() {
  return {
    pantalla: 'inicio',
    productoActual: 'americano',
    cantidad: 1,
    filtro: 'todo',
    busqueda: '',
    aviso: '',
    avisoTipo: 'ok',
    deshacerQuitar: false,
    conflicto: null,
    errores: {},
    datos: { nombre: '', hora: '', horaNueva: '' },
    enfocarDespues: null,
    envio: null,
  };
}
