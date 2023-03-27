import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {

  username: string = 'Pau Olives'
  mobileNav: boolean = false;
  @ViewChild(NavigationComponent) navC!: NavigationComponent

  toggleNav():void {
    this.mobileNav = this.navC.toggleNav()
  }
}
