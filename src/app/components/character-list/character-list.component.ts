import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Character } from '../../interfaces/character.interface';
import { DragonBallService } from '../../services/dragon-ball.service';

@Component({
  selector: 'app-character-list',
  imports: [NgClass],
  templateUrl: './character-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  public characters = input<Character[]>([]);
  
  // Inyectamos el servicio DragonBallService
  private dragonBallService = inject(DragonBallService);

  /**
   * Determina las clases CSS basadas en el poder del personaje
   * @param power Nivel de poder del personaje
   * @returns Objeto con las clases CSS a aplicar
   */
  public getPowerClass(power: number): Record<string, boolean> {
    return {
      'text-success': power >= 9000,
      'text-danger': power < 9000
    };
  }

  /**
   * Filtra los personajes que tienen un poder mayor a 1000
   * @returns Array de personajes filtrados
   */
  public get powerfulCharacters(): Character[] {
    return this.characters().filter((character: Character) => character.power > 1000);
  }
  
  /**
   * Elimina un personaje por su ID
   * @param id ID del personaje a eliminar
   */
  public deleteCharacter(id: string): void {
    this.dragonBallService.deleteCharacterById(id);
  }
}
