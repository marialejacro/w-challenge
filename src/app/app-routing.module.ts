import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: LandingComponent 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [LoggedInGuard]
  },
  { 
    path: 'list', 
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 65],
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
