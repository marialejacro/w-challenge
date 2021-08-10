import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'w-challenge';
  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.userLoggedIn()){
      this.router.navigateByUrl('list')
    }
  }
}
