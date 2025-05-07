import { Injectable, signal, effect } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DragonBallService {
  // Clave para almacenar los personajes en localStorage
  private readonly STORAGE_KEY = 'dragonball_characters';

  // Signal privado para manejar el estado interno de los personajes
  private _characters = signal<Character[]>(this.loadCharactersFromStorage());

  constructor() {
    // Utilizamos effect para guardar los personajes en localStorage cada vez que cambian
    effect(() => {
      this.saveCharactersToStorage(this._characters());
    });
  }

  /**
   * Carga los personajes desde localStorage
   * @returns Array de personajes o datos por defecto si no hay nada guardado
   */
  private loadCharactersFromStorage(): Character[] {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);

      if (storedData) {
        return JSON.parse(storedData) as Character[];
      }

      // Si no hay datos guardados, devolvemos un array vacío
      return [];
    } catch (error) {
      console.error('Error al cargar personajes desde localStorage:', error);
      // En caso de error, devolvemos un array vacío
      return [];
    }
  }

  /**
   * Guarda los personajes en localStorage
   * @param characters Array de personajes a guardar
   */
  private saveCharactersToStorage(characters: Character[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(characters));
    } catch (error) {
      console.error('Error al guardar personajes en localStorage:', error);
    }
  }

  /**
   * Obtiene la lista actual de personajes
   * @returns Signal con el array de personajes
   */
  public get characters() {
    return this._characters;
  }

  /**
   * Agrega un nuevo personaje a la lista
   * @param character Personaje a agregar
   */
  public addCharacter(character: Character): void {
    // Validar que el personaje tenga un ID
    if (!character.id) {
      character.id = crypto.randomUUID();
    }

    // Actualizar el signal de personajes con el nuevo personaje
    this._characters.update(currentCharacters => [...currentCharacters, character]);
  }


  /**
   * Elimina un personaje de la lista por su ID
   * @param id ID del personaje a eliminar
   */
  public deleteCharacterById(id: string): void {
    this._characters.update(currentCharacters =>
      currentCharacters.filter(character => character.id !== id)
    );
  }
  
  /**
   * Elimina todos los personajes del localStorage y de la aplicación
   */
  public resetCharacters(): void {
    // Eliminar los datos del localStorage
    localStorage.removeItem(this.STORAGE_KEY);
    
    // Establecer un array vacío de personajes
    this._characters.set([]);
  }
}
