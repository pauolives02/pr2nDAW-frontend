import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import decode from "jwt-decode";

import { authData } from "../models/auth-data.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated: boolean = false
  private token: string = ''
  private tokenTimer: any
  private authStatusListener = new Subject<boolean>()

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getIsAdmin() {
    const decodedToken: any = decode(this.token)
    return decodedToken.isAdmin
  }

  getUserId() {
    const decodedToken: any = decode(this.token)
    return decodedToken.userId
  }

  // Auto login 
  autoAuthUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
    if (expiresIn > 0) {
      this.token = authInformation.token
      this.isAuthenticated = true
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  // Login
  login(token: string, expiresIn: number) {
    this.token = token
    const expiresInDuration = expiresIn
    this.setAuthTimer(expiresInDuration)
    this.isAuthenticated = true
    this.authStatusListener.next(true)
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
    this.saveAuthData(token, expirationDate)
    this.router.navigate(['/dashboard'])
  }

  // Logout, borrar token del localStorage
  logout() {
    this.token = ''
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/'])
  }

  // Timer per tancar sessió quan el token a expirat
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  // Guardar el token i l'expiració en el localStorage
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  // Borrar el token i l'expiració del localStorage
  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }

  // Obtenir el token i l'expiració del localStorage
  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}