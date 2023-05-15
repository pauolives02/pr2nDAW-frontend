import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class SharedTableService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getItems(endPoint, filters?) {
    let params = new HttpParams()
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key]
        if (value != '') params = params.append(key, value)
    })
    }
    return this.http.get<any>(environment.apiUrl + endPoint, { params })
  }

}