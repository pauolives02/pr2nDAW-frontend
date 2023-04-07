import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
// import { slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   slider
  // ]
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false
  private authListenerSubs: Subscription = new Subscription;

  constructor(
    private authService: AuthService,
  ) {}

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  // }
  ngOnInit(): void {
    // Auto login
    this.authService.autoAuthUser()

    // Comprovar que seguim autenticats
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
}
