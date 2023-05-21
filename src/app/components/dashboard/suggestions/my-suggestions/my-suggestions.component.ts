import { Component, OnInit, ViewChild } from '@angular/core';
import { SuggestionService } from 'src/app/services/suggestions.service';
import { DetailSuggestionComponent } from '../detail-suggestion/detail-suggestion.component';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { SharedTableComponent } from 'src/app/components/shared-components/shared-table/shared-table.component';
import { MessageModalService } from 'src/app/services/messageModal.service';

@Component({
  selector: 'app-my-suggestions',
  templateUrl: './my-suggestions.component.html',
  styleUrls: ['./my-suggestions.component.scss']
})
export class MySuggestionsComponent implements OnInit {

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
    this.endPoint = '/api/suggestion/user-suggestions'

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
      height: '65vh',
      data: {
        item
      }
    })
  }

  onDelete(item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '50vh',
      width: '80vh',
      data: {
        message: 'Are you sure you want to delete this suggestion?',
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed) {
          this.suggestionService.deleteSuggestionByUser(item).subscribe({
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
