import { Component, ViewChild, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { Set } from 'src/app/models/set.model';
import { environment } from 'src/environments/environment';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SetService } from 'src/app/services/set.service';
import { MatDialog } from "@angular/material/dialog";
import { ItemSubscriptionDialogComponent } from './item-subscription-dialog/item-subscription-dialog.component';
import { MessageModalService } from 'src/app/services/messageModal.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class ListItemComponent implements OnInit {

  isLoading: boolean = false
  imagesUrl: string
  dropdownClicked: boolean = false
  dropdownCliks: number = 0
  @ViewChild('dropdown') dropdown: ElementRef
  @Input() item: Exercise | Set
  @Input() itemType: string
  @Output() updateList = new EventEmitter<string>()
  subscribed: boolean = false
  private itemService

  constructor(
    private exerciseService: ExerciseService,
    private setService: SetService,
    private dialog: MatDialog,
    private messageModalService: MessageModalService
  ) {}

  ngOnInit() {
    // console.log(this.item)
    this.subscribed = this.item.isSubscribed
    if (this.itemType === 'exercise') {
      this.imagesUrl = environment.apiUrl + '/api/exercise/get-image/'
      this.itemService = this.exerciseService
    } else if (this.itemType === 'set') {
      this.imagesUrl = environment.apiUrl + '/api/set/get-image/'
      this.itemService = this.setService
    }
  }

  toggleDropdown() {
    this.dropdownClicked = !this.dropdownClicked
    this.dropdownCliks += 1
  }

  onClick(event) {
    if(event.target != this.dropdown.nativeElement && this.dropdownClicked) {
      this.toggleDropdown()
      this.dropdownCliks = 0
    }
  }

  itemSubscription() {
    if (this.subscribed) {
      this.isLoading = true
      this.itemService.removeSubscription(this.item.id).subscribe({
        next: (data) => {
          this.subscribed = false
          this.isLoading = false
          this.updateList.next(null)
          this.messageModalService.openModal(data.msg, 1)
        },
        error: () => this.isLoading = false
      })
    } else {
      let dialogRef = this.dialog.open(ItemSubscriptionDialogComponent, {
        width: '80%',
        height: '70vh',
        data: {
          item: this.item,
          imagesUrl: this.imagesUrl
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isLoading = true
          this.itemService.addSubscription(this.item.id, result).subscribe({
            next: (data) => {
              this.subscribed = true
              this.isLoading = false
              this.messageModalService.openModal(data.msg, 1)
            },
            error: () => this.isLoading = false
          })
        }
      })
    }
  }

}
