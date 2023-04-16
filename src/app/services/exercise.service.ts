import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { Exercise } from '../models/exercise.model';

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

  getExerciseById(id) {
    return this.http.get<Exercise>(environment.apiUrl + '/api/exercise/' + id)
  }

  getExercisesSubscribed() {
    // return this.http.get(environment.apiUrl + '/api/exercise/public')
    return this.http.get(environment.apiUrl + '/api/exercise/subscriptions')
  }

  createExercise(exercise) {
    return this.http.post(environment.apiUrl + '/api/exercise/add', exercise)
  }

  addSubscription(id) {
    return this.http.post(environment.apiUrl + '/api/exercise/subscription/add', {id})
  }

  removeSubscription(id) {
    return this.http.post(environment.apiUrl + '/api/exercise/subscription/remove', {id})
  }

}