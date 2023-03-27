import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  mobileNav: boolean = false
  clicks: number = 0

  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(!this.eRef.nativeElement.contains(event.target) && this.mobileNav) {
      if(this.clicks == 0) {
        this.clicks += 1
      } else {
        this.toggleNav()
      }
    }
  }

  constructor(
    private eRef: ElementRef
  ) { }

  toggleNav() {
    this.mobileNav = !this.mobileNav
    return this.mobileNav
  }
}
