import { ChangeDetectionStrategy, Component } from '@angular/core';
import PokemonCardComponent from "../pokemon-card/pokemon-card.component";
import PokemonListSkeletonComponent from "../../../pages/pokemon-page/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonCardComponent, PokemonListSkeletonComponent],

})
export default class PokemonListComponent { }
