import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  openMenu = false
  scrolling = false
  constructor() { }

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
