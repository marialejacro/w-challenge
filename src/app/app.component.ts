import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private authService: AuthService, 
    private router: Router,
    public translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es');
    if(this.authService.userLoggedIn()){
      this.router.navigateByUrl('list')
    }
  }
}
