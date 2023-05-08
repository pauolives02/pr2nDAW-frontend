import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class SharedTableService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getItems(endPoint) {
    return this.http.get<any>(environment.apiUrl + endPoint)
  }

}