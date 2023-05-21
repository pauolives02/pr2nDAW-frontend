import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { SetService } from 'src/app/services/set.service';
import { MessageModalService } from 'src/app/services/messageModal.service';
import { SharedTableComponent } from 'src/app/components/shared-components/shared-table/shared-table.component';

@Component({
  selector: 'app-all-sets',
  templateUrl: './all-sets.component.html',
  styleUrls: ['./all-sets.component.scss']
})
export class AllSetsComponent implements OnInit {

  @ViewChild(SharedTableComponent) sharedTable: SharedTableComponent
  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''
  imageUrl: string = environment.apiUrl + '/api/set/get-image/'

  constructor(
    private dialog: MatDialog,
    private setService: SetService,
    private messageModalService: MessageModalService
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
        message: `Are you sure you want to delete set '${item.name}' by ${item.owner.username}?`,
        imageUrl: this.imageUrl + item.image
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed) {
          this.setService.delete(item.id).subscribe({
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
