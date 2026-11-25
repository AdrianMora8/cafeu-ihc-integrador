/**
 * Error de negocio. Lo lanzan las entidades cuando se viola una regla del dominio.
 * El campo `codigo` permite que las capas externas decidan qué mostrar sin depender del texto.
 */
export class ErrorDominio extends Error {
  constructor(codigo, mensaje) {
    super(mensaje ?? codigo);
    this.name = 'ErrorDominio';
    this.codigo = codigo;
  }
}
