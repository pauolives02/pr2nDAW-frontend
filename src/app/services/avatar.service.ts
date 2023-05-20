import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AvatarService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getAvatars() {
    return this.http.get(environment.apiUrl + '/api/avatar/all')
  }

  delete(item) {
    return this.http.delete(environment.apiUrl + '/api/avatar/delete/' + item.id)
  }

  update(item, lvl) {
    return this.http.put(environment.apiUrl + '/api/avatar/update/' + item.id, {lvl})
  }

  add(formData) {
    return this.http.post(environment.apiUrl + '/api/avatar/add', formData)
  }

}