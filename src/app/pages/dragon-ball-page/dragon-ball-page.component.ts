import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/character-add/character-add.component';
import { Character } from '../../interfaces/character.interface';
import { DragonBallService } from '../../services/dragon-ball.service';

@Component({
  selector: 'app-dragon-ball-page',
  standalone: true,
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragon-ball-page.component.html',
  styleUrls: ['./dragon-ball-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragonBallPageComponent {
  /**
   * Inyección del servicio DragonBallService usando la función inject()
   * Se declara como public para poder acceder desde el template
   */
  public dragonBallService = inject(DragonBallService);
  
  /**
   * Getter para acceder al signal de personajes desde el template
   * @returns Signal con el array de personajes
   */
  public characters() {
    return this.dragonBallService.characters();
  }
  
  // El método onNewCharacter ya no es necesario porque conectamos directamente el evento con el servicio
}
