import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/components/shared-components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { SuggestionService } from 'src/app/services/suggestions.service';

@Component({
  selector: 'app-configuration-subjects',
  templateUrl: './configuration-subjects.component.html',
  styleUrls: ['./configuration-subjects.component.scss']
})
export class ConfigurationSubjectsComponent implements OnInit {

  fields: any[] = []
  buttons: any[] = []
  endPoint: string = ''

  constructor(
    private suggestionService: SuggestionService,
    private dialog: MatDialog
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

  // getSubjects() {
  //   this.suggestionService.getSuggestionSubjects()
  //   .subscribe({
  //     next: (result) => {
  //       this.subjects = result
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
        message: `Are you sure you want to delete subject '${item.name}'?`
      },
    })

    dialogRef.afterClosed().subscribe(
      confirmed => {
        console.log(confirmed)
      }
    )
  }

}
