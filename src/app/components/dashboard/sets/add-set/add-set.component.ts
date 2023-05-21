import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SetService } from 'src/app/services/set.service';
import { AuthService } from 'src/app/services/auth.service';
import { requiredFileType } from 'src/app/helpers/requiredFileType';
import { toFormData } from 'src/app/helpers/toFormData';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from 'src/app/services/messageModal.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MatDialog } from "@angular/material/dialog";
import { ItemSubscriptionDialogComponent } from 'src/app/components/shared-components/list-item/item-subscription-dialog/item-subscription-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.scss']
})
export class AddSetComponent {

  private isAdmin: boolean = false
  form: FormGroup
  isLoading: boolean = false
  edit: boolean = false
  setId: string = ''
  set: any
  availableExercises: any[] = []
  setExercises: any[] = []
  userId: string

    constructor(
    private setService: SetService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageModalService: MessageModalService,
    private exerciseService: ExerciseService
  ) {
    this.route.params.subscribe(params => {
      this.setId = params['id']
    })
    if (this.setId) {
      this.edit = true
      this.getSet()
    }
   }

   ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin()
    this.userId = this.authService.getUserId()

    this.getAvailableExercises(null, 'false')

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      public: new FormControl({value: 'false', disabled: !this.isAdmin}, [Validators.required]),
      image: new FormControl(null, [Validators.required, requiredFileType()])
    })

    if(this.setId) {
      this.form.get('image').setValidators(requiredFileType())
    }
  }

  saveSet() {
    if (this.form.valid) {
      const setData = this.form.value
      setData.exercises = JSON.stringify(this.setExercises)
      const formData = toFormData(setData)

      this.isLoading = true

      if (!this.edit) {
        this.setService.createSet(formData)
        .subscribe({
          next: (response: any) => {
            this.form.reset()
            this.setExercises = []
            this.isLoading = false
            this.messageModalService.openModal(response.msg, 1)
          },
          error: () => this.isLoading = false
        })
      } else {
        this.setService.updateSet(formData, this.setId).subscribe({
          next: (response: any) => {
            this.isLoading = false
            this.messageModalService.openModal(response.msg, 1)
          },
          error: () => this.isLoading = false
        })
      }
    }
  }


  getSet() {
    this.isLoading = true
    this.setService.getSetById(this.setId).subscribe({
      next: (exercise) => {
        this.set = exercise
        this.isLoading = false
        
        this.form.get('name').setValue(this.set.name)
        this.form.get('description').setValue(this.set.description)
        this.form.get('public').setValue(this.set.public)
      },
      error: (err) => {
        this.router.navigate(['/dashboard/sets'])
      }
    })
  }

  getAvailableExercises(event, type = null) {
    if (event) type = event.target.value
    this.exerciseService.getExercisesForSet(type).subscribe({
      next: (result: any) => {
         console.log(result)
         this.availableExercises = result
      }
    })
  }

  addToExerciseList(event) {
    const itemId = event.target.value
    const item = this.availableExercises.find(e => e.id === itemId)

    const dialogRef = this.dialog.open(ItemSubscriptionDialogComponent, {
      width: '80%',
      height: '70vh',
      data: {
        item: item,
        imagesUrl: environment.apiUrl + '/api/exercise/get-image/',
        addSet: true
      }
    })

    dialogRef.afterClosed().subscribe(
      repetitions => {
        if (repetitions) {
          this.setExercises.push({
            id: item.id,
            name: item.name,
            repetitions
          })
        }
      }
    )
  }

  removeFromList(i) {
    this.setExercises.splice(i, 1)
  }

  moveItem(i, direction) {
    let newPos
    if (direction == 'up') {
      newPos = i - 1
    } else if (direction == 'down') {
      newPos = i + 1
    }
    const item = this.setExercises[i]
    this.setExercises.splice(i, 1)
    this.setExercises.splice(newPos, 0, item)
  }

}
