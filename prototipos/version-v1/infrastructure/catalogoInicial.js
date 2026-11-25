/**
 * Datos iniciales del menú de la cafetería universitaria.
 * Se mantienen igual que en el prototipo v3 de APE 4 para conservar el comportamiento evaluado.
 */
export const CATALOGO_INICIAL = Object.freeze([
  { id: 'americano', nombre: 'Café americano', categoria: 'bebidas', resumen: 'Café recién preparado', detalle: 'Café preparado al momento. Tamaño mediano.', precio: 1.5, estado: 'ok' },
  { id: 'sanduche', nombre: 'Sanduche de queso', categoria: 'comida', resumen: 'Preparado al momento', detalle: 'Sanduche tostado con queso. Tamaño mediano.', precio: 2.75, estado: 'ok' },
  { id: 'empanada', nombre: 'Empanada de pollo', categoria: 'comida', resumen: 'Horneada esta mañana', detalle: 'Empanada horneada con relleno de pollo.', precio: 1.5, estado: 'pocas' },
  { id: 'jugo', nombre: 'Jugo de naranja', categoria: 'bebidas', resumen: 'Natural, sin azúcar añadida', detalle: 'Jugo natural de naranja.', precio: 1.25, estado: 'agotado' },
]);
