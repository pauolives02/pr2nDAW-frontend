import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-detail-suggestion',
  templateUrl: './detail-suggestion.component.html',
  styleUrls: ['./detail-suggestion.component.scss']
})
export class DetailSuggestionComponent {
  
  item: any

  constructor(
    private dialogRef: MatDialogRef<DetailSuggestionComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item
    this.item.stringDate = this.item.date.split("T")[0]
  }

  close() {
      this.dialogRef.close()
  }
}
