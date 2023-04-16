import { Component, OnInit} from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/models/set.model';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {

  sets: Set[] = []
  isLoading: boolean = false
  // imagesUrl: string  = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private setService: SetService,
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.setService.getPublicSets().subscribe(
      (res: any) => {
        this.sets = res
        this.isLoading = false
      }
    )
  }
}
