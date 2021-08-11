import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  declarations: [
    ListComponent,
    PokemonsComponent,
    CompareComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    CommonComponentsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PokemonService
  ]
})
export class ListModule { }
