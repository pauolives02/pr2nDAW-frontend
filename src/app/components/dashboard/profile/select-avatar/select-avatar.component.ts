import { Component, OnInit, Inject } from '@angular/core';
import { AvatarService } from 'src/app/services/avatar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {

  avatars: any[] = []
  isLoading: boolean = false
  imgUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'
  userLvl: number

  constructor(
    private avatarsService: AvatarService,
    private dialogRef: MatDialogRef<SelectAvatarComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userLvl = data.userLvl
  }

  ngOnInit() {
    this.isLoading = true
    this.avatarsService.getAvatars().subscribe({
      next: (result: any) => {
        this.avatars = result
        this.isLoading = false
      },
      error: () => this.isLoading = false
    })
  }

  close() {
    this.dialogRef.close()
  }

  selectAvatar(avatar) {
    if (avatar.lvl <= this.userLvl) {
      this.dialogRef.close(avatar.id)
    }
  }
}
