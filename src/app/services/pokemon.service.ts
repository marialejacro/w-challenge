import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PokemonService {

  private POKEMON_API = 'https://pokeapi.co/api/v2/'

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any[]>{
      return this.http.get<any[]>(this.POKEMON_API + 'pokemon')
  }
} 