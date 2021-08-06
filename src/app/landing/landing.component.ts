import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    
  }

}
