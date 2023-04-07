import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import decode from 'jwt-decode'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Vàlidar si l'usuari esta autenticat i sino redirigir-lo al login
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth()
    if (isAuth) {
        // check if route is restricted by role
        const { isAdmin } = route.data;
        const token: any = decode(this.authService.getToken())
        if (isAdmin && !token.isAdmin) {
            // role not authorized so redirect to home page
            this.router.navigate(['/']);
            return false;
        }

        // authorized so return true
        return true;
    }
    this.router.navigate(['/login'])
    return false
  }
}