import { Component, OnInit, ViewChild } from '@angular/core';
import { AvatarService } from 'src/app/services/avatar.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { SharedTableComponent } from 'src/app/components/shared-components/shared-table/shared-table.component';
import { AvatarsAddModalComponent } from './avatars-add-modal/avatars-add-modal.component';
import { toFormData } from 'src/app/helpers/toFormData';
import { MessageModalService } from 'src/app/services/messageModal.service';

@Component({
  selector: 'app-configuration-avatars',
  templateUrl: './configuration-avatars.component.html',
  styleUrls: ['./configuration-avatars.component.scss']
})
export class ConfigurationAvatarsComponent implements OnInit {

  @ViewChild(SharedTableComponent) sharedTable: SharedTableComponent
  avatarUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'
  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''

  constructor(
    private avatarService: AvatarService,
    private dialog: MatDialog,
    private messageModalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.tableConfig()
  }

  tableConfig() {
    this.endPoint = '/api/avatar/all'

    this.fields = [
      {
        name: 'Image',
        key: 'image',
        image: true,
        noSearch: true,
        render: (item) => this.avatarUrl + item.image
      },
      {
        name: 'Lvl required',
        key: 'lvl',
        type: 'number'
      },
    ]

    this.buttons = [
      {
        text: 'Edit',
        icon: 'fa-pen',
        onclick: (item) => this.addEditModal(item)
      },
      {
        text: 'Delete',
        icon: 'fa-trash',
        class: 'bgRed',
        onclick: (item) => this.onDelete(item)
      },
    ]
  }

  addEditModal(item?) {
    const dialogRef = this.dialog.open(AvatarsAddModalComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        item: item,
        imageUrl: this.avatarUrl + item?.image
      },
    })

    dialogRef.afterClosed().subscribe(
      form => {
        if (form) {
          if (!item) {
            const formData = toFormData(form)
            this.avatarService.add(formData).subscribe({
              next: (result: any) => {
                this.messageModalService.openModal(result.msg, 1)
                this.sharedTable.getItems()
              }
            })
          } else {
            this.avatarService.update(item, form.lvl).subscribe({
              next: (result: any) => {
                this.messageModalService.openModal(result.msg, 1)
                this.sharedTable.getItems()
              }
            })
          }
        }
      }
    )

  }

  onDelete(item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        message: 'Are you sure you want to delete this avatar?',
        imageUrl: this.avatarUrl + item.image
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed) {
          this.avatarService.delete(item)
          .subscribe({
            next: (result: any) => {
              this.messageModalService.openModal(result.msg, 1)
              this.sharedTable.getItems()
            }
          })
        }
      }
    )
  }

}
