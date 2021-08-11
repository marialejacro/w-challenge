import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  pokemons:any[] = []
  loaded = false
  constructor(private globalService: GlobalService,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons()
  }

  getPokemons() {
    this.loaded = false
    let list = this.globalService.pokemonList
    list.forEach(p => {
      this.pokemonService.searchPokemon(p.name).subscribe(res => {
        this.pokemons.push(res)
      })
    });
    this.loaded = true    
  }
}
