import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-add',
  imports: [FormsModule],
  templateUrl: './character-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAddComponent {
  // Signals para los inputs de nombre y poder
  public characterName = signal<string>('');
  public characterPower = signal<number>(0);

  // Evento para emitir el nuevo personaje al componente padre
  public onNewCharacter = output<Character>();

  /**
   * Computed property para mostrar la información en el título
   */
  public get newCharacterLabel(): string {
    if (this.characterName() === '' && this.characterPower() === 0) return 'Add';

    const name = this.characterName() || 'No name';
    const power = this.characterPower() || 0;

    return `Add: ${name} - Power: ${power}`;
  }

  /**
   * Método para agregar un nuevo personaje
   */
  public addCharacter(): void {
    // Validar que exista un nombre y un poder
    if (this.characterName().trim() === '' || this.characterPower() <= 0) return;

    // Crear un nuevo personaje
    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: this.characterName(),
      power: this.characterPower()
    };

    // Emitir el evento con el nuevo personaje
    this.onNewCharacter.emit(newCharacter);

    // Limpiar los inputs
    this.characterName.set('');
    this.characterPower.set(0);
  }
}
