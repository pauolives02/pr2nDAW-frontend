import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { SuggestionService } from 'src/app/services/suggestions.service';
import { SharedTableComponent } from 'src/app/components/shared-components/shared-table/shared-table.component';
import { MessageModalService } from 'src/app/services/messageModal.service';
import { SubjectsAddModalComponent } from './subjects-add-modal/subjects-add-modal.component';


@Component({
  selector: 'app-configuration-subjects',
  templateUrl: './configuration-subjects.component.html',
  styleUrls: ['./configuration-subjects.component.scss']
})
export class ConfigurationSubjectsComponent implements OnInit {

  @ViewChild(SharedTableComponent) sharedTable: SharedTableComponent
  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''

  constructor(
    private suggestionService: SuggestionService,
    private dialog: MatDialog,
    private messageModalService: MessageModalService
  ) {}

  ngOnInit() {
    this.tableConfig()
  }

  tableConfig() {
    this.endPoint = '/api/suggestion/suggestion-subjects-nd'

    this.fields = [
      {
        name: 'Subject',
        key: 'name',
        type: 'text'
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
    const dialogRef = this.dialog.open(SubjectsAddModalComponent, {
      height: '40vh',
      width: '80vh',
      data: {
        item: item
      },
    })

    dialogRef.afterClosed().subscribe(
      form => {
        if (form) {
          if (!item) {
            this.suggestionService.addSubject(form).subscribe({
              next: (result: any) => {
                this.messageModalService.openModal(result.msg, 1)
                this.sharedTable.getItems()
              }
            })
          } else {
            this.suggestionService.updateSubject(item, form.name).subscribe({
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
        message: `Are you sure you want to delete subject '${item.name}'?`
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        if (confirmed) {
          this.suggestionService.deleteSubject(item)
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
