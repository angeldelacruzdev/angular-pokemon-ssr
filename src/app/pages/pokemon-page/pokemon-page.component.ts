import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import PokemonListComponent from '../../pokemons/components/pokemon-list/pokemon-list.component';
import PokemonListSkeletonComponent from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
})
export default class PokemonPageComponent {

  private pokemonsService = inject(PokemonsService);
  private router = inject(Router);
  private title = inject(Title)
  public pokemons = signal<SimplePokemon[]>([])

  public route = inject(ActivatedRoute);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page)) ? 1 : +page),
      map(page => Math.max(1, page))
    )
  );


  public loadOnPageChnage = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  });

  loadPokemons(page = 0) {

    let pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad).pipe(

      tap(() => {
        this.title.setTitle(`Pokemon SSR - Page ${pageToLoad} `)
      })
    ).subscribe(this.pokemons.set)
  }

}
