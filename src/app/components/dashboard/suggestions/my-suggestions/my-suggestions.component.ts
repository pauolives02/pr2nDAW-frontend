import { Component, OnInit } from '@angular/core';
import { SuggestionService } from 'src/app/services/suggestions.service';
import { Suggestion } from 'src/app/models/suggestion.model';

@Component({
  selector: 'app-my-suggestions',
  templateUrl: './my-suggestions.component.html',
  styleUrls: ['./my-suggestions.component.scss']
})
export class MySuggestionsComponent implements OnInit {

  suggestions: Suggestion[] = []
  isLoading: boolean = false

  constructor(
    private suggestionService: SuggestionService
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.suggestionService.getUsersSuggestions().subscribe(
      (res: any) => {
        this.suggestions = res
        this.isLoading = false
      }
    )
  }
}
