import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  constructor(
    // private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  getPublicExercises() {
    return this.http.get(environment.apiUrl + '/api/exercise/public')
  }

  getPrivateExercises() {
    return this.http.get(environment.apiUrl + '/api/exercise/private')
  }

}