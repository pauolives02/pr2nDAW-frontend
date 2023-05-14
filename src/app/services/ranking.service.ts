import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RankingService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getTopLvl() {
    return this.http.get(environment.apiUrl + '/api/ranking/lvl')
  }

  getTopExercises() {
    return this.http.get(environment.apiUrl + '/api/ranking/exercises')
  }
  

}