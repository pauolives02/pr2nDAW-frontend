import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-all-sets',
  templateUrl: './all-sets.component.html',
  styleUrls: ['./all-sets.component.scss']
})
export class AllSetsComponent implements OnInit {

  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''
  imageUrl: string = environment.apiUrl + '/api/set/get-image/'

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
        name: 'Image',
        key: 'image',
        image: true,
        noSearch: true,
        render: (item) => this.imageUrl + item.image
      },
      {
        name: 'Name',
        key: 'name',
        type: 'text'
      },
      {
        name: 'Description',
        key: 'description',
        type: 'text',
        render: (item) => {
          if (item.description.length > 20) {
            return item.description.slice(0, 20) + '...'
          }
          return item.description
        }
      },
      {
        name: 'Finished XP',
        key: 'finished_xp',
        type: 'number',
      },
      {
        name: 'Public',
        key: 'public',
        type: 'select',
        selOptions: [
          { value: true, text: 'True' },
          { value: false, text: 'False' },
        ]
      },
      {
        name: 'Owner',
        key: 'owner',
        type: 'text',
        render: (item) => item.owner.username
      },
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        message: `Are you sure you want to delete set '${item.name}' by ${item.owner.username}?`,
        imageUrl: this.imageUrl + item.image
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        console.log(confirmed)
      }
    )
  }

}
