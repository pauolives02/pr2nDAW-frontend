import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { Suggestion } from '../models/suggestion.model';

@Injectable({ providedIn: 'root' })
export class SuggestionService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUsersSuggestions() {
    return this.http.get(environment.apiUrl + '/api/suggestion/user-suggestions');
  }

  getSuggestionSubjects() {
    return this.http.get<any>(environment.apiUrl + '/api/suggestion/suggestion-subjects');
  }

  addSuggestion(suggestion: Suggestion) {
    return this.http.post<Suggestion>(environment.apiUrl + '/api/suggestion/add-suggestion', suggestion)
    // .subscribe(response => {
    //   if (response.status == 201) {
    //     this.router.navigate(['/login'])
    //   }
    // })
  }

}