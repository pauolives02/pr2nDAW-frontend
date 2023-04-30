import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-suggestion',
  templateUrl: './new-suggestion.component.html',
  styleUrls: ['./new-suggestion.component.scss']
})
export class NewSuggestionComponent {

  isLoading: boolean = false
  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      subject: new FormControl('', Validators.required),
      message: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    })
  }

  onSubmit() {

  }
}
