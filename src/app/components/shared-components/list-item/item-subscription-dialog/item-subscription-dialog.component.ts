import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Exercise } from 'src/app/models/exercise.model';
import { Set } from 'src/app/models/set.model';

@Component({
  selector: 'app-item-subscription-dialog',
  templateUrl: './item-subscription-dialog.component.html',
  styleUrls: ['./item-subscription-dialog.component.scss']
})
export class ItemSubscriptionDialogComponent {

  item: Exercise | Set
  ammount: number = 10;

  constructor(
    private dialogRef: MatDialogRef<ItemSubscriptionDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
  }

  save() {
    this.dialogRef.close(this.ammount);
  }

  close() {
      this.dialogRef.close();
  }
}
