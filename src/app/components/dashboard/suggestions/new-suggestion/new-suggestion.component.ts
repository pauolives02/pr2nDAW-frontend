import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuggestionService } from 'src/app/services/suggestions.service';
import { Suggestion } from 'src/app/models/suggestion.model';
import { MessageModalService } from 'src/app/services/messageModal.service';

@Component({
  selector: 'app-new-suggestion',
  templateUrl: './new-suggestion.component.html',
  styleUrls: ['./new-suggestion.component.scss']
})
export class NewSuggestionComponent implements OnInit {

  isLoading: boolean = false
  isLoadingSubjects: boolean = false
  form: FormGroup
  subjects: any[] = []

  constructor(
    private suggestionService: SuggestionService,
    private messageModalService: MessageModalService
  ) {
    this.form = new FormGroup({
      subject: new FormControl('', Validators.required),
      message: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    })
  }

  ngOnInit(): void {
    this.isLoadingSubjects = true
    this.suggestionService.getSuggestionSubjects()
    .subscribe({
      next: (response) => {
        this.subjects = response
        this.isLoadingSubjects = false
      },
      error: (error) => {
        this.isLoadingSubjects = false
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const suggestion: Suggestion = {
        subject: this.form.get('subject').value,
        description: this.form.get('message').value
      }

      this.isLoading = true
      this.suggestionService.addSuggestion(suggestion)
      .subscribe({
        next: (response: any) => {
          this.messageModalService.openModal(response.msg, 1)
          this.isLoading = false
          this.form.reset()
        },
        error: (error) => {
          this.isLoading = false
        }
      })
    }
  }
}
