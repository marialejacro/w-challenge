import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonService {

  private POKEMON_API = 'https://pokeapi.co/api/v2/'

  constructor(private http: HttpClient) { }

  getPokemons(limit:number, offset:number): Observable<any[]>{
      return this.http.get<any[]>(this.POKEMON_API + 'pokemon/?limit=' + limit + '&offset=' + offset)
  }

  searchPokemon(value: string): Observable<any[]>{
    return this.http.get<any[]>(this.POKEMON_API + 'pokemon/' + value)
  }
} 