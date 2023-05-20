import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { SharedTableComponent } from 'src/app/components/shared-components/shared-table/shared-table.component';
import { MessageModalService } from 'src/app/services/messageModal.service';
import { SuggestionService } from 'src/app/services/suggestions.service';
import { DetailSuggestionComponent } from '../detail-suggestion/detail-suggestion.component';

@Component({
  selector: 'app-all-suggestions',
  templateUrl: './all-suggestions.component.html',
  styleUrls: ['./all-suggestions.component.scss']
})
export class AllSuggestionsComponent implements OnInit {

  @ViewChild(SharedTableComponent) sharedTable: SharedTableComponent
  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''
  subjects: any[] = []

  constructor(
    private dialog: MatDialog,
    private suggestionService: SuggestionService,
    private messageModalService: MessageModalService
  ) {}

  ngOnInit() {
    this.getSubjects()
    this.tableConfig()
  }

  tableConfig() {
    this.endPoint = '/api/suggestion/all'

    this.fields = [
      {
        name: 'Date',
        key: 'date',
        type: 'date',
        render: (item) => item.date.split("T")[0]
      },
      {
        name: 'Subject',
        key: 'subject',
        type: 'select',
        selOptions: this.subjects,
        render: (item) => item.subject ? item.subject.name ?? 'Undefined' : 'Undefined'
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
        name: 'Owner',
        key: 'user_id',
        type: 'text',
        render: (item) => item.user_id.username
      },
      {
        name: 'Status',
        key: 'status',
        type: 'select',
        selOptions: [
          { value: 0, text: 'Pending' },
          { value: 1, text: 'Accepted' },
          { value: 2, text: 'Denied' },
        ],
        render: (item) => {
          let text = ''
          if (item.status == 0) {
            text = 'Pending'
          } else if (item.status == 1) {
            text = 'Accepted'
          } else {
            text = 'Denied'
          }
          return text
        }
      },
    ]

    this.buttons = [
      {
        text: 'Show',
        icon: 'fa-eye',
        onclick: (item) => this.showDetail(item)
      },
      {
        text: 'Accept',
        icon: 'fa-thumbs-up',
        class: 'bgGreen',
        hidden: (item) => item.status == 1,
        onclick: (item) => this.onChangeStatus(item, 1)
      },
      {
        text: 'Pending',
        icon: 'fa-pause',
        class: 'bgOrange',
        hidden: (item) => item.status == 0,
        onclick: (item) => this.onChangeStatus(item, 0)
      },
      {
        text: 'Deny',
        icon: 'fa-thumbs-down',
        class: 'bgRed',
        hidden: (item) => item.status == 2,
        onclick: (item) => this.onChangeStatus(item, 2)
      },
      {
        text: 'Delete',
        icon: 'fa-trash',
        class: 'bgRed',
        onclick: (item) => this.onDelete(item)
      },
    ]
  }

  getSubjects() {
    this.suggestionService.getSuggestionSubjects().subscribe({
      next: (result: any) => {
        result.map((subject) => {
          this.subjects.push({
            value: subject.id,
            text: subject.name
          })
        })
      }
    })
  }

  showDetail(item) {
    const dialogRef = this.dialog.open(DetailSuggestionComponent, {
      width: '80vw',
      height: '56vh',
      data: {
        item
      }
    })
  }

  openDialog(message) {
    return this.dialog.open(ConfirmDialogComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        message: message,
      },
    })
  }

  onChangeStatus(item, status) {
    let message = 'Are you sure you want to change this suggestion to pending?'
    if (status == 1) {
      message = 'Are you sure you want to accept this suggestion?'
    } else if (status == 2) {
      message = 'Are you sure you want to deny this suggestion?'
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        message: message,
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed) {
          this.suggestionService.changeStatus(item, status).subscribe({
            next: (result: any) => {
              this.messageModalService.openModal(result.msg, 1)
              this.sharedTable.getItems()
            }
          })
        }
      }
    )
  }

  onDelete(item) {
    const dialogRef = this.openDialog('Are you sure you want to delete this suggestion?')

    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed) {
          this.suggestionService.deleteSuggestion(item).subscribe({
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
