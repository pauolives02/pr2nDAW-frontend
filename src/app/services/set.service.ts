import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { Set } from '../models/set.model';

@Injectable({ providedIn: 'root' })
export class SetService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getPublicSets() {
    return this.http.get(environment.apiUrl + '/api/set/public')
  }

  getPrivateSets() {
    return this.http.get(environment.apiUrl + '/api/set/private')
  }

  getSetById(id) {
    return this.http.get<Set>(environment.apiUrl + '/api/set/' + id)
  }

  getSetsSubscribed() {
    return this.http.get(environment.apiUrl + '/api/set/subscriptions')
  }

  createSet(set) {
    return this.http.post(environment.apiUrl + '/api/set/add', set)
  }

  updateSet(set, id) {
    return this.http.put(environment.apiUrl + '/api/set/update/' + id, set)
  }

  delete(id) {
    return this.http.delete(environment.apiUrl + '/api/set/delete/' + id)
  }

  addSubscription(id, repetitions) {
    return this.http.post(environment.apiUrl + '/api/set/subscription/add', {id, repetitions})
  }

  removeSubscription(id) {
    return this.http.post(environment.apiUrl + '/api/set/subscription/remove', {id})
  }

}