import { Component, OnInit} from '@angular/core';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-set-subscriptions',
  templateUrl: './set-subscriptions.component.html',
  styleUrls: ['./set-subscriptions.component.scss']
})
export class SetSubscriptionsComponent implements OnInit {

  sets: any[] = []
  isLoading: boolean = false

  constructor(
    private setService: SetService,
  ) {}

  ngOnInit() {
    this.getSubscriptions()
  }

  getSubscriptions(event= null) {
    this.isLoading = true
    this.setService.getSetsSubscribed().subscribe(
      (res: any) => {
        this.sets = res
        this.isLoading = false
      }
    )
  }

}
