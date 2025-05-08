import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import PokemonCardComponent from "../pokemon-card/pokemon-card.component";

import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonCardComponent],

})
export default class PokemonListComponent {

  public pokemons = input.required<SimplePokemon[]>();

}
