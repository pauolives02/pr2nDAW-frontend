import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subjects-add-modal',
  templateUrl: './subjects-add-modal.component.html',
  styleUrls: ['./subjects-add-modal.component.scss']
})
export class SubjectsAddModalComponent {
  form: FormGroup
  title: string = 'Add Subject'

  constructor(
    private dialogRef: MatDialogRef<SubjectsAddModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    })

    if (data.item) {
      this.form.get('name').setValue(data.item.name)
      this.title = 'Update subject'
    }
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }

}
