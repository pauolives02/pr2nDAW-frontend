import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class DailyGoalService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getDailyGoals() {
    return this.http.get(environment.apiUrl + '/api/subscription/daily-goal')
  }

  getDailyGoalById(goalId) {
    return this.http.get(environment.apiUrl + '/api/subscription/daily-goal/' + goalId)
  }

  updateGoal(goalId, ammount, step) {
    return this.http.put(environment.apiUrl + '/api/subscription/daily-goal/' + goalId, {ammount, step})
  }

}