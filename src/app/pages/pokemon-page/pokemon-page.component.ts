import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import PokemonListComponent from '../../pokemons/components/pokemon-list/pokemon-list.component';
import PokemonListSkeletonComponent from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
})
export default class PokemonPageComponent implements OnInit {
  public isLoading = signal(true)

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 5000);
  }

}
