import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  message: string = ''
  iconClass: string
  status: {} = {}

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.status = {
      0: ['fa-circle-xmark', 'red'],
      1: ['fa-circle-check', ' green'],
      2: ['fa-circle-info', ' yellow']
    }

    this.message = data.message
    this.iconClass = this.status[data.status] ? this.status[data.status] : ['fa-circle-xmark', ' red']

  }

  close() {
      this.dialogRef.close()
  }
}
