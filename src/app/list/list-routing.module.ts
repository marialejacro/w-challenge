import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { ListComponent } from './list.component';
import { PokemonsComponent } from './pokemons/pokemons.component';

const routes: Routes = [
  { path: '', 
    component: ListComponent,
    children: [
      {
        path: '',
        redirectTo: 'pokemons',
        pathMatch: 'full'
      },
      {
        path: 'pokemons',
        component: PokemonsComponent
      },
      {
        path: 'compare',
        component: CompareComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
