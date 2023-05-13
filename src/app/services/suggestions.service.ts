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

  // Suggestions
  getUsersSuggestions() {
    return this.http.get(environment.apiUrl + '/api/suggestion/user-suggestions');
  }

  addSuggestion(suggestion: Suggestion) {
    return this.http.post<Suggestion>(environment.apiUrl + '/api/suggestion/add-suggestion', suggestion)
  }

  deleteSuggestionByUser(item) {
    return this.http.delete(environment.apiUrl + '/api/suggestion/user-suggestions/delete/' + item.id);
  }

  deleteSuggestion(item) {
    return this.http.delete(environment.apiUrl + '/api/suggestion/delete/' + item.id);
  }

  // Suggestion subjects
  getSuggestionSubjects() {
    return this.http.get<any>(environment.apiUrl + '/api/suggestion/suggestion-subjects');
  }
  
  updateSubject(item, name) {
    return this.http.put(environment.apiUrl + '/api/suggestion/update-subject/' + item.id, {name})
  }

  addSubject(subject) {
    return this.http.post(environment.apiUrl + '/api/suggestion/add-subject', subject)
  }

  deleteSubject(item) {
    return this.http.delete(environment.apiUrl + '/api/suggestion/delete-subject/' + item.id)
  }


}