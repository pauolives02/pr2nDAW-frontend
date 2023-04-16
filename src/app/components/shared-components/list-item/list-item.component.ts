import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { Set } from 'src/app/models/set.model';
import { environment } from 'src/environments/environment';
import { ExerciseService } from 'src/app/services/exercise.service';
import { SetService } from 'src/app/services/set.service';

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
  subscribed: boolean = false
  private itemService

  constructor(
    private exerciseService: ExerciseService,
    private setService: SetService,
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
      this.itemService.removeSubscription(this.item.id)
      .subscribe(
        (data) => {
          console.log(data)
          this.subscribed = false
        }
      )
    } else {
      this.itemService.addSubscription(this.item.id)
      .subscribe(
        (data) => {
          console.log(data)
          this.subscribed = true
        }
      )
    }
    // this.subscribed = !this.subscribed
    // console.log(this.item.id)
  }
}