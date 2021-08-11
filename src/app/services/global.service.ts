import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    private _pokemonList: any[] = []

    get pokemonList() {
        return this._pokemonList;
    }

    set pokemonList(list: any[]) {
        this._pokemonList = list
    }
}