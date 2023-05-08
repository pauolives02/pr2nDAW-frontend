import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-all-sets',
  templateUrl: './all-sets.component.html',
  styleUrls: ['./all-sets.component.scss']
})
export class AllSetsComponent {

  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tableConfig()
  }

  tableConfig() {
    this.endPoint = '/api/set/all'

    this.fields = [
      {
        name: 'Name',
        key: 'name',
      },
      // {
      //   name: 'Description',
      //   key: 'description',
      // },
      {
        name: 'Finished XP',
        key: 'finished_xp',
      },
      {
        name: 'Public',
        key: 'public',
      },
      {
        name: 'Owner',
        key: 'owner',
        render: (item) => item.owner.username
      },
      // {
      //   name: 'Image',
      //   key: 'image',
      //   render: (item) => item.creationDate.split("T")[0]
      // },
    ]

    this.buttons = [
      {
        text: 'Delete',
        icon: 'fa-trash',
        onclick: (item) => this.onDelete(item)
      },
    ]
  }

  onDelete(item) {

  }

}
