import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  results: any[] = []
  constructor(private authService: AuthService, 
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((res: any) => {
      this.results = res.results
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/home')
  }
}
