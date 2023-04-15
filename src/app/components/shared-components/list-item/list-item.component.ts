import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class ListItemComponent {

  isLoading: boolean = false
  imagesUrl: string  = environment.apiUrl + '/api/exercise/get-image/'
  dropdownClicked: boolean = false
  dropdownCliks: number = 0
  @ViewChild('dropdown') dropdown: ElementRef
  @Input() exercise: Exercise

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

}
