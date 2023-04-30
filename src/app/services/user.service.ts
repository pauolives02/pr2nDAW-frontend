import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from './auth.service';
import { authData } from '../models/auth-data.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    const authData: authData = {
      username: email,
      password: password
    }
    return this.http.post<{ token: string, expiresIn: number }>(environment.apiUrl + '/api/user/login', authData)
    // .subscribe(response => {
    //   if (response.token) {
    //     this.authService.login(response.token, response.expiresIn)
    //   }
    // })
  }

  register(authData: User) {
    return this.http.post<{ token: string, expiresIn: number }>(environment.apiUrl + '/api/user/register', authData)
    // .subscribe(response => {
    //   if (response.status == 201) {
    //     this.router.navigate(['/login'])
    //   }
    // })
  }

  logout() {
    this.authService.logout();
  }

  getAuthUser() {
    return this.http.get<User>(environment.apiUrl + '/api/user/user-data')
  }

  getUserStats() {
    return this.http.get(environment.apiUrl + '/api/user/user-stats')
  }
}