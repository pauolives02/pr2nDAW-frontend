import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AuthService } from 'src/app/services/auth.service';
import { Exercise } from 'src/app/models/exercise.model';
import { requiredFileType } from 'src/app/helpers/requiredFileType';
import { toFormData } from 'src/app/helpers/toFormData';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {

  private isAdmin: boolean = false
  form: FormGroup
  isLoading = false

  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin()

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      finished_xp: new FormControl({value: '1', disabled: !this.isAdmin}, [Validators.required, Validators.min(1)]),
      public: new FormControl({value: 'false', disabled: !this.isAdmin}, [Validators.required]),
      image: new FormControl(null, [Validators.required, requiredFileType()])
    })
  }

  saveExercise() {
    if (this.form.valid) {
      const formData = toFormData(this.form.value)
      this.isLoading = true
      this.exerciseService.createExercise(formData)
      .subscribe(res => {
        console.log(res)
        this.isLoading = false
      })
    }
  }
}
