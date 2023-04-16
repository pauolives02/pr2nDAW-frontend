import { Component, OnInit} from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/models/set.model';

@Component({
  selector: 'app-set-private-list',
  templateUrl: './set-private-list.component.html',
  styleUrls: ['./set-private-list.component.scss']
})
export class SetPrivateListComponent implements OnInit {

  sets: Set[] = []
  isLoading: boolean = false
  // imagesUrl: string  = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private setService: SetService,
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.setService.getPrivateSets().subscribe(
      (res: any) => {
        this.sets = res
        this.isLoading = false
      }
    )
  }

}
