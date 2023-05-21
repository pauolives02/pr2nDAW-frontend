import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AuthService } from 'src/app/services/auth.service';
import { Exercise } from 'src/app/models/exercise.model';
import { requiredFileType } from 'src/app/helpers/requiredFileType';
import { toFormData } from 'src/app/helpers/toFormData';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from 'src/app/services/messageModal.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {

  private isAdmin: boolean = false
  form: FormGroup
  isLoading: boolean = false
  edit: boolean = false
  exerciseId: string = ''
  exercise: any

  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageModalService: MessageModalService
  ) {
    this.route.params.subscribe(params => {
      this.exerciseId = params['id']
    })
    if (this.exerciseId) {
      this.edit = true
      this.getExercise()
    }
   }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin()

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      finished_xp: new FormControl({value: '1', disabled: !this.isAdmin}, [Validators.required, Validators.min(1)]),
      public: new FormControl({value: 'false', disabled: !this.isAdmin}, [Validators.required]),
      image: new FormControl(null, [Validators.required, requiredFileType()])
    })

    if(this.exerciseId) {
      this.form.get('image').setValidators(requiredFileType())
    }
  }

  saveExercise() {
    if (this.form.valid) {
      const formData = toFormData(this.form.value)
      this.isLoading = true

      if (!this.edit) {
        this.exerciseService.createExercise(formData)
        .subscribe({
          next: (response: any) => {
            this.form.reset()
            this.form.get('public').setValue(false)
            this.form.get('finished_xp').setValue('1')
            this.isLoading = false
            this.messageModalService.openModal(response.msg, 1)
          },
          error: () => this.isLoading = false
        })
      } else {
        this.exerciseService.updateExercise(formData, this.exerciseId).subscribe({
          next: (response: any) => {
            this.isLoading = false
            this.messageModalService.openModal(response.msg, 1)
          },
          error: () => this.isLoading = false
        })
      }
    }
  }

  getExercise() {
    this.isLoading = true
    this.exerciseService.getExerciseById(this.exerciseId).subscribe({
      next: (exercise) => {
        this.exercise = exercise
        this.isLoading = false
        
        this.form.get('name').setValue(this.exercise.name)
        this.form.get('description').setValue(this.exercise.description)
        this.form.get('finished_xp').setValue(this.exercise.finished_xp)
        this.form.get('public').setValue(this.exercise.public)
      },
      error: (err) => {
        this.router.navigate(['/dashboard/exercises'])
      }
    })
  }
}
