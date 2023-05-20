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
  }

  register(authData: User) {
    return this.http.post<{ token: string, expiresIn: number }>(environment.apiUrl + '/api/user/register', authData)
  }

  logout() {
    this.authService.logout();
  }

  getAuthUser() {
    return this.http.get<User>(environment.apiUrl + '/api/user/user-data')
  }

  getUserStats(userId) {
    return this.http.get(environment.apiUrl + '/api/user/user-stats/' + userId)
  }

  updateAvatar(avatarId) {
    return this.http.put(environment.apiUrl + '/api/user/update-avatar', {avatarId})
  }

  getUserProfile(userId) {
    return this.http.get(environment.apiUrl + '/api/user/user-profile/' + userId)
  }

  updateUserData(userData) {
    return this.http.put(environment.apiUrl + '/api/user/update-data', userData)
  }

  updateUserCredentials(userCredentials) {
    return this.http.put(environment.apiUrl + '/api/user/update-password', userCredentials)
  }

}