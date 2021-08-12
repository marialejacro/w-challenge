import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  benefits = [
    {
      title: 'BENEFITS_LIST.FLEXIBILITY',
      image: 'assets/images/Ic_Hour.svg'
    },
    {
      title: 'BENEFITS_LIST.HOME_OFFICE',
      image: 'assets/images/Ic_HomeOffice.svg'
    },
    {
      title: 'BENEFITS_LIST.TRAININGS',
      image: 'assets/images/Ic_Workshops.svg'
    },
    {
      title: 'BENEFITS_LIST.FREE_SNACKS',
      image: 'assets/images/Ic_DrinkSnacks.svg'
    },
    {
      title: 'BENEFITS_LIST.REMOTE_WEEK',
      image: 'assets/images/Ic_laptop.svg'
    },
    {
      title: 'BENEFITS_LIST.KEEP_UP',
      image: 'assets/images/Ic_brain.svg'
    }
  ]

  userLoggedIn = false

  constructor(private router: Router, 
    private authService: AuthService,
    public translate: TranslateService) { }

  get lang() {
    return this.translate.currentLang
  }
  get otherLang() {
    return this.lang == 'es' ? 'en' : 'es'
  }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.userLoggedIn()  
  }

  scrollTo($event: any, fragmentName: string) {
    if($event) $event.preventDefault()
    this.router.navigate([], { fragment: fragmentName })
  }
  
  openTwitter() {
    window.location.href = 'https://twitter.com/Wolox'
  }

  openWolox() {
    window.location.href = 'https://www.wolox.com.ar/'
  }

  logout() {
    this.authService.logout()
    this.userLoggedIn = this.authService.userLoggedIn()
  }

  toggleLang() {
    this.translate.use(this.lang == 'es' ? 'en' : 'es') 
  }

}
