import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-all-exercises',
  templateUrl: './all-exercises.component.html',
  styleUrls: ['./all-exercises.component.scss']
})
export class AllExercisesComponent implements OnInit {

  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''
  imageUrl: string = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tableConfig()
  }

  tableConfig() {
    this.endPoint = '/api/exercise/all'

    this.fields = [
      {
        name: 'Image',
        key: 'image',
        image: true,
        render: (item) => this.imageUrl + item.image
      },
      {
        name: 'Name',
        key: 'name',
      },
      {
        name: 'Description',
        key: 'description',
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
    ]

    this.buttons = [
      {
        text: 'Delete',
        icon: 'fa-trash',
        class: 'bgRed',
        onclick: (item) => this.onDelete(item)
      },
    ]
  }

  onDelete(item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        message: `Are you sure you want to delete exercise '${item.name}' by ${item.owner.username}?`,
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