import { Component, OnInit } from '@angular/core';
// import { AvatarService } from 'src/app/services/avatar.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-configuration-avatars',
  templateUrl: './configuration-avatars.component.html',
  styleUrls: ['./configuration-avatars.component.scss']
})
export class ConfigurationAvatarsComponent implements OnInit {

  avatarUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'
  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''

  constructor(
    // private avatarsService: AvatarService,
    private dialog: MatDialog
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
        render: (item) => this.avatarUrl + item.image
      },
      {
        name: 'Lvl required',
        key: 'lvl'
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

  // getAvatars() {
  //   this.isLoading = true
  //   this.avatarsService.getAllAvatars()
  //   .subscribe({
  //     next: (result) => {
  //       this.avatars = result
  //       this.isLoading = false
  //     },
  //     error: (error) => {
  //       console.log(error)
  //       this.isLoading = false
  //     }
  //   })
  // }

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
        console.log(confirmed)
      }
    )
  }

}
