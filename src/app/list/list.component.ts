import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private authService: AuthService, 
    private router: Router) { }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/home')
  }
}
