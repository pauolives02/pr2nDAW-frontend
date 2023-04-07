import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent  {

  username: string = 'Pau Olives'
  mobileNav: boolean = false
  @ViewChild(NavigationComponent) navC!: NavigationComponent

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  onLogout() {
    this.userService.logout();
  }

  toggleNav():void {
    this.mobileNav = this.navC.toggleNav()
  }

  closeNav(mobileNav: boolean) {
    console.log(mobileNav)
    this.mobileNav = mobileNav
  }

}
