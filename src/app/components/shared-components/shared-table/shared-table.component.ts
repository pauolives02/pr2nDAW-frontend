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
  searchTimeout: any
  filters: any[] = []

  constructor(
    private sharedTableService: SharedTableService
  ) {}

  ngOnInit() {
    this.getItems()
  }

  getItems(filters?) {
    this.isLoading = true
    this.sharedTableService.getItems(this.endPoint, filters)
    .subscribe({
      next: (result) => {
        this.items = result
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
      }
    })
  }

  isFunction(v) {
    return typeof v === 'function'
  }

  onSearch(key, event) {
    const value = (event.target as HTMLInputElement).value
    if (this.filters[key] !== value) {
      this.filters[key] = value
      if (this.searchTimeout) clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.getItems(this.filters)
      }, 1500)
    }
  }
}
