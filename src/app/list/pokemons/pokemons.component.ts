import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  results: any[] = []
  count = 0
  limit = 20
  offset = 0
  counter = 0
  nextPage = false
  pages = 0
  currentPage = 0
  minPage = 0
  maxPage = 9
  selected: any[] = []
  searching = false
  searchValue: string = ''

  constructor(private router: Router,
    private pokemonService: PokemonService,
    private globalService: GlobalService) { }

  ngOnInit(): void {
    this.initialize()
  }

  initialize() {
    this.offset = 0
    this.counter = 0
    this.nextPage = false
    this.currentPage = 0
    this.minPage = 0
    this.maxPage = 9
    this.getPokemons()
  }

  getPokemons() {
    this.searching = false
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe((res: any) => {
      this.results = res.results
      this.count = res.count
      this.pages = Math.ceil(this.count/this.limit)      
      this.nextPage = !!res.next
    })
  }

  prev() {
    if(this.counter > 0) {
      if(this.currentPage == this.minPage && this.currentPage > 0){
        this.minPage -= 1
        this.maxPage -= 1
      }
      this.counter -= 1
      this.offset = this.limit * this.counter
      this.currentPage -= 1
      this.getPokemons()
    }
  }

  next() {
    if(this.nextPage) {
      if(this.currentPage == this.maxPage && this.currentPage < this.pages - 1){
        this.minPage += 1
        this.maxPage += 1
      }
      this.counter += 1
      this.offset = this.limit * this.counter 
      this.currentPage += 1
      this.getPokemons()
    }
  }

  loadPage(index: number){
    this.offset = index * this.limit
    this.currentPage = index
    this.getPokemons()
  }

  onSelectChange($event: any){
    this.limit = $event.target.value;
    this.initialize()
  }

  pagesCounter() {
    return new Array(this.pages)
  }

  select(pokemon: any) {
    let index = this.selected.findIndex((p:any) => p.name == pokemon.name)
    if( index >= 0) {
      this.selected.splice(index, 1)
    } else {
      if(this.selected.length < 3){
        this.selected.push(pokemon)
      }
    }
  }

  isSelected(pokemon: any) {
    let index = this.selected.findIndex((p:any) => p.name == pokemon.name)
    return index >= 0 ? true : false
  }

  compare() {
    this.globalService.pokemonList = this.selected
    this.router.navigateByUrl('/list/compare')
  }

  search() {
    this.pokemonService.searchPokemon(this.searchValue).subscribe(res => {
      this.results = [res]
      this.searching = true
    })
  }
}
