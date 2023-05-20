import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from "@angular/material/dialog";
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { MessageModalService } from 'src/app/services/messageModal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPassword } from 'src/app/helpers/confirmPassword';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userStats: any
  userData: any
  progress: number = 0
  avatarUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'
  selfProfile: boolean = true
  userDataForm: FormGroup
  userCredentialsForm: FormGroup
  isLoadingUserDataForm: boolean = false
  isLoadingUserCredentialsForm: boolean = false
  userProfileId: string

  constructor (
    private userService: UserService,
    private dialog: MatDialog,
    private messageModalService: MessageModalService,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userProfileId = params['id']
        this.selfProfile = false
      }
    })
  
    if (this.selfProfile) {
      this.userDataForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required, Validators.minLength(1)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      })
  
      this.userCredentialsForm = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        rpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      },
      { validators: [ConfirmPassword('password', 'rpassword')] }
      )
    }
  }
  
  ngOnInit() {
    this.userService.getUserStats(this.userProfileId)
    .subscribe({
      next: (data) => {
        this.userStats = data
        this.progress = this.userStats.current_xp * 100 / this.userStats.nextLvlXp
        if (this.progress > 100) this.progress = 100
      }
    })

    if (this.selfProfile) {
      this.userService.getAuthUser()
      .subscribe({
        next: (data) => {
          this.userData = data
          this.userDataForm.get('email').setValue(this.userData.email)
          this.userDataForm.get('username').setValue(this.userData.username)
        }
      })
    } else {
      this.userService.getUserProfile(this.userProfileId)
      .subscribe({
        next: (data: any) => {
          this.userData = data
        }
      })
    }
  }

  onSelectAvatar() {
    if (this.selfProfile) {
      const dialogRef = this.dialog.open(SelectAvatarComponent, {
        height: '50vh',
        width: '80vh',
        data: {
          userLvl: this.userStats.level
        },
      })

      dialogRef.afterClosed().subscribe(
        avatarId => {
          if (avatarId) {
            this.userService.updateAvatar(avatarId).subscribe({
              next: (result: any) => {
                const msgModal = this.messageModalService.openModal(result.msg, 1)
                msgModal.afterClosed().subscribe(() => {
                  window.location.reload()
                })
              }
            })
          }
        }
      )
    }
  }

  userDataFormSubmit() {
    if (this.userDataForm.valid) {
      this.isLoadingUserDataForm = true

      this.userService.updateUserData(this.userDataForm.value).subscribe({
        next: (result: any) => {
          this.isLoadingUserDataForm = false
          const dialogRef = this.messageModalService.openModal(result.msg, 1)
          dialogRef.afterClosed().subscribe(
            () => window.location.reload()
          )
        },
        error: () => this.isLoadingUserDataForm = false
      })
    }
  }

  userCredentialsFormSubmit() {
    if (this.userCredentialsForm.valid) {
      this.isLoadingUserCredentialsForm = true

      this.userService.updateUserCredentials(this.userCredentialsForm.value).subscribe({
        next: (result: any) => {
          this.isLoadingUserCredentialsForm = false
          this.messageModalService.openModal(result.msg, 1)
          this.userCredentialsForm.reset()
        },
        error: () => this.isLoadingUserCredentialsForm = false
      })
    }
  }

}
