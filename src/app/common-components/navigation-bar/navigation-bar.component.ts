import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  openMenu = false
  scrolling = false
  constructor() { }

  ngOnInit(): void {
    console.log('nav init');
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
}
