import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../interfaces';
import { PokemonsService } from '../../services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title)
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);


  ngOnInit(): void {
    this.loadPokemon()
  }


  loadPokemon() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;
    return this.pokemonsService.loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          this.title.setTitle(`${id} - ${name}`)
          this.meta.updateTag({
            name: 'description', content: `Página del pokémon ${name}`
          });
          this.meta.updateTag({
            name: 'og:title', content: `${id} - ${name}`
          })
          this.meta.updateTag({
            name: 'og:description', content: `Página del pokémon ${name}`
          })
          this.meta.updateTag({
            name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          })
        })
      )
      .subscribe(this.pokemon.set)
  }
}
