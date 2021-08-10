import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  benefits = [
    {
      title: 'Flexibilidad Horaria',
      image: 'assets/images/Ic_Hour.svg'
    },
    {
      title: 'Home Office',
      image: 'assets/images/Ic_HomeOffice.svg'
    },
    {
      title: 'Capacitaciones y workshops',
      image: 'assets/images/Ic_Workshops.svg'
    },
    {
      title: 'Snacks, frutas y bebidas gratis',
      image: 'assets/images/Ic_DrinkSnacks.svg'
    },
    {
      title: 'Semana remota',
      image: 'assets/images/Ic_laptop.svg'
    },
    {
      title: 'Trabajar en ultimas tecnologías',
      image: 'assets/images/Ic_brain.svg'
    }
  ]

  userLoggedIn = false

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.userLoggedIn()  
  }

  scrollTo($event: any, fragmentName: string) {
    if($event) $event.preventDefault()
    this.router.navigate([], { fragment: fragmentName })
  }
  
  openTwitter() {
    window.location.href = "https://twitter.com/Wolox"
  }

  openWolox() {
    window.location.href = "https://www.wolox.com.ar/"
  }

  logout() {
    this.authService.logout()
    this.userLoggedIn = this.authService.userLoggedIn()
  }

}
