import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Exercise } from 'src/app/models/exercise.model';
import { Set } from 'src/app/models/set.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-subscription-dialog',
  templateUrl: './item-subscription-dialog.component.html',
  styleUrls: ['./item-subscription-dialog.component.scss']
})
export class ItemSubscriptionDialogComponent {

  item: Exercise | Set
  imagesUrl: string
  form: FormGroup
  addSet: boolean = false

  constructor(
    private dialogRef: MatDialogRef<ItemSubscriptionDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item
    this.imagesUrl = data.imagesUrl
    if (data.addSet) this.addSet = data.addSet

    this.form = new FormGroup({
      ammount: new FormControl(1, [Validators.required, Validators.min(1)]),
    })
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('ammount').value)
    }
  }

  close() {
      this.dialogRef.close()
  }
}
