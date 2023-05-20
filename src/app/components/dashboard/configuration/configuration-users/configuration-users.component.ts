import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-configuration-users',
  templateUrl: './configuration-users.component.html',
  styleUrls: ['./configuration-users.component.scss']
})
export class ConfigurationUsersComponent implements OnInit {

  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''
  avatarUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tableConfig()
  }

  tableConfig() {
    this.endPoint = '/api/user/get-all'

    this.fields = [
      {
        name: 'Avatar',
        key: 'image',
        image: true,
        noSearch: true,
        render: (item) => this.avatarUrl + item.avatar
      },
      {
        name: 'Email',
        key: 'email',
        type: 'text'
      },
      {
        name: 'Username',
        key: 'username',
        type: 'text'
      },
      {
        name: 'Creation date',
        key: 'creationDate',
        type: 'date',
        render: (item) => item.creationDate.split("T")[0]
      },
    ]

    this.buttons = [
      {
        text: 'Delete',
        icon: 'fa-ban',
        class: 'bgRed',
        onclick: (item) => this.onDelete(item)
      },
    ]
  }

  onDelete(item) {

  }

}
