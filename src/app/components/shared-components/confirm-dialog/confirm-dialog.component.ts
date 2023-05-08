import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  message: string = ''
  imageUrl: string

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message
    if (data.imageUrl) {
      this.imageUrl = data.imageUrl
    }
  }

  confirm() {
    this.dialogRef.close(true)
  }

  close() {
      this.dialogRef.close()
  }
}
