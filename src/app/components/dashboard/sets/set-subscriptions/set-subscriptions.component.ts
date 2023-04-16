import { Component, OnInit} from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/models/set.model';

@Component({
  selector: 'app-set-subscriptions',
  templateUrl: './set-subscriptions.component.html',
  styleUrls: ['./set-subscriptions.component.scss']
})
export class SetSubscriptionsComponent implements OnInit {

  sets: Set[] = []
  isLoading: boolean = false
  // imagesUrl: string  = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private setService: SetService,
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.setService.getSetsSubscribed().subscribe(
      (res: any) => {
        this.sets = res
        this.isLoading = false
      }
    )
  }

}
