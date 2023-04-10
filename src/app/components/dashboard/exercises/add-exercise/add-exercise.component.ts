import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AuthService } from 'src/app/services/auth.service';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {

  private isAdmin: boolean = false
  form: FormGroup
  // descriptionCounter: number = 180;

  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin()

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(180)]),
      finished_xp: new FormControl({value: '1', disabled: !this.isAdmin}, [Validators.required, Validators.min(1)]),
      public: new FormControl({value: 'false', disabled: !this.isAdmin}, [Validators.required]),
    })
  }

  saveExercise() {
    if (this.form.valid) {
      // console.log(this.form.value)
      const exercise: Exercise = {
        name: this.form.value.name,
        description: this.form.value.description,
        finished_xp: this.form.value.finished_xp,
        public: this.form.value.public,
        image: 'a'
      }
      console.log(exercise)
    }
  }
}
