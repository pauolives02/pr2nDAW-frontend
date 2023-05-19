import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SetService } from 'src/app/services/set.service';
import { AuthService } from 'src/app/services/auth.service';
import { requiredFileType } from 'src/app/helpers/requiredFileType';
import { toFormData } from 'src/app/helpers/toFormData';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from 'src/app/services/messageModal.service';

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

    constructor(
    private setService: SetService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageModalService: MessageModalService
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

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
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
      const formData = toFormData(this.form.value)
      this.isLoading = true

      if (!this.edit) {
        this.setService.createSet(formData)
        .subscribe({
          next: (response: any) => {
            this.form.reset()
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

}
