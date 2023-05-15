import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MessageModalService } from 'src/app/services/messageModal.service';
import { SharedTableComponent } from 'src/app/components/shared-components/shared-table/shared-table.component';

@Component({
  selector: 'app-all-exercises',
  templateUrl: './all-exercises.component.html',
  styleUrls: ['./all-exercises.component.scss']
})
export class AllExercisesComponent implements OnInit {

  @ViewChild(SharedTableComponent) sharedTable: SharedTableComponent
  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''
  imageUrl: string = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private exerciseService: ExerciseService,
    private messageModalService: MessageModalService
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
        text: 'Edit',
        icon: 'fa-pen',
        onclick: (item) => this.router.navigate(['/dashboard/exercises/edit/' + item.id])
      },
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
        if (confirmed) {
          this.exerciseService.deleteExercise(item.id).subscribe({
            next: (response: any) => {
              this.sharedTable.getItems()
              this.messageModalService.openModal(response.msg, 1)
            }
          })
        }
      }
    )
  }
}
