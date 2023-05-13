import { Component, Input, OnInit } from '@angular/core';
import { SharedTableService } from 'src/app/services/sharedTable.service';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnInit {
  @Input() fields: any[]
  @Input() buttons: any[]
  @Input() endPoint: string

  isLoading: boolean = false
  items: any[] = []

  constructor(
    private sharedTableService: SharedTableService
  ) {}

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    this.sharedTableService.getItems(this.endPoint)
    .subscribe({
      next: (result) => {
        this.items = result
        this.isLoading = false
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false
      }
    })
  }

  isFunction(v) {
    return typeof v === 'function'
  }
}
