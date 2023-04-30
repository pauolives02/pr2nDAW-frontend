import { Component, ViewChild, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { Set } from 'src/app/models/set.model';
import { environment } from 'src/environments/environment';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SetService } from 'src/app/services/set.service';
import { MatDialog } from "@angular/material/dialog";
import { ItemSubscriptionDialogComponent } from './item-subscription-dialog/item-subscription-dialog.component';

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
    private dialog: MatDialog
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
    this.isLoading = true
    if (this.subscribed) {
      this.itemService.removeSubscription(this.item.id)
      .subscribe(
        (data) => {
          console.log(data)
          this.subscribed = false
          this.isLoading = false
          this.updateList.next(null)
        }
      )
    } else {
      let dialogRef = this.dialog.open(ItemSubscriptionDialogComponent, {
        width: '80%',
        height: '50vh',
        data: {
          item: this.item,
          imagesUrl: this.imagesUrl
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.itemService.addSubscription(this.item.id, result)
          .subscribe(
            (data) => {
              console.log(data)
              this.subscribed = true
              this.isLoading = false
            }
          )
        } else {
          this.isLoading = false
        }
      })
      // if (this.itemType === 'exercise') {
      //   console.log('popup')
      //   this.openDialog()
      //   // this.addSubscription(10)
      // } else if (this.itemType === 'set') {
      //   // this.addSubscription(1)
      // }
    }
  }

  // addSubscription(ammount: number) {
  //   this.itemService.addSubscription(this.item.id, ammount)
  //   .subscribe(
  //     (data) => {
  //       console.log(data)
  //       this.subscribed = true
  //       this.isLoading = false
  //     }
  //   )
  // }

  // openSubscribeDialog() {
  //   let dialogRef = this.dialog.open(ItemSubscriptionDialogComponent, {
  //     width: '500px',
  //     height: '100px',
  //     data: {
  //       test: 'aaaaa'
  //     }
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result)
  //   })
  // }
}
