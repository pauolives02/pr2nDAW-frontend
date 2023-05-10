import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/helpers/requiredFileType';

@Component({
  selector: 'app-avatars-add-modal',
  templateUrl: './avatars-add-modal.component.html',
  styleUrls: ['./avatars-add-modal.component.scss']
})
export class AvatarsAddModalComponent {
  imageUrl: string = 'assets/img/defaultAvatar.svg'
  item: any
  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<AvatarsAddModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      lvl: new FormControl(1, [Validators.required, Validators.min(1)]),
      // image: new FormControl(null, [Validators.required, requiredFileType()])
    })


    if (data.imageUrl) {
      this.imageUrl = data.imageUrl
    }
    if (data.item) {
      this.item = data.item
      this.form.get('lvl').setValue(this.item.lvl)
    } else {
      this.form.addControl('image', new FormControl(null, [Validators.required, requiredFileType()]))
    }
  }

  confirm() {
    this.dialogRef.close(true)
  }

  close() {
      this.dialogRef.close()
  }

  onSelectImage(event) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result
      }
    }
  }

  saveAvatar() {

  }
}
