/**
 * Representa un personaje de Dragon Ball
 */
export interface Character {
  /**
   * Identificador único del personaje
   */
  id: string;
  
  /**
   * Nombre del personaje
   */
  name: string;
  
  /**
   * Nivel de poder del personaje
   */
  power: number;
}
