import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

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

  scrolling = false
  openMenu = false

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('onInit');    
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
      this.scrolling = window.scrollY > 70
      this.openMenu = false
  }

  @HostListener('window:resize', [])
  onResize() {
    this.openMenu = false
  }

  scrollTo($event: any, fragmentName: string) {
    if($event) $event.preventDefault()
    this.router.navigate([], { fragment: fragmentName })
  }
  
  register($event: any) {
    $event.preventDefault()
  }
  
  openTwitter() {
    window.location.href = "https://twitter.com/Wolox";
  }

  openWolox() {
    window.location.href = "https://www.wolox.com.ar/";
  }

}
