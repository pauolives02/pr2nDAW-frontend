import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from '../components/shared-components/message-dialog/message-dialog.component';

@Injectable({ providedIn: 'root' })
export class MessageModalService {
  constructor(
    private dialog: MatDialog
  ) {}

  openModal(message, status) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      height: '30vh',
      width: '80vh',
      data: { message, status}
    })

    return dialogRef
  }

}