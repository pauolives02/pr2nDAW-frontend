import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { Exercise } from '../models/exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  constructor(
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
    return this.http.get(environment.apiUrl + '/api/exercise/subscriptions')
  }

  createExercise(exercise) {
    return this.http.post(environment.apiUrl + '/api/exercise/add', exercise)
  }

  addSubscription(id, repetitions) {
    return this.http.post(environment.apiUrl + '/api/exercise/subscription/add', {id, repetitions})
  }

  removeSubscription(id) {
    return this.http.post(environment.apiUrl + '/api/exercise/subscription/remove', {id})
  }

  updateExercise(exercise, id) {
    return this.http.put(environment.apiUrl + '/api/exercise/update/' + id, exercise)
  }

  delete(id) {
    return this.http.delete(environment.apiUrl + '/api/exercise/delete/' + id)
  }

  getExercisesForSet(type) {
    return this.http.get(environment.apiUrl + '/api/exercise/for-set/' + type)
  }

}