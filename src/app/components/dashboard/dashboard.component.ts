import { Component, ViewChild, ViewEncapsulation, OnInit, ElementRef } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DashboardComponent implements OnInit {

  user: User
  toggldeNav: boolean = false
  dropdownClicked: boolean = false
  dropdownCliks: number = 0
  @ViewChild(NavigationComponent) navC!: NavigationComponent
  @ViewChild('dropdown') dropdown: ElementRef

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getAuthUser()
  }

  onLogout() {
    this.userService.logout()
  }

  getAuthUser() {
    this.userService.getAuthUser()
    .subscribe(user => {
      this.user = user
    })
  }

  toggleNav():void {
    this.toggldeNav = this.navC.toggleNav()
  }

  toggleDropdown() {
    this.dropdownClicked = !this.dropdownClicked
    this.dropdownCliks += 1
  }

  closeNav(toggldeNav: boolean) {
    this.toggldeNav = toggldeNav
  }

  onClick(event) {
    if(event.target != this.dropdown.nativeElement && this.dropdownClicked) {
      this.toggleDropdown()
      this.dropdownCliks = 0
    }
  }

}
