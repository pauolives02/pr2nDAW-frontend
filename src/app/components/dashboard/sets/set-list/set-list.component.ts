import { Component, OnInit} from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/models/set.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {

  sets: Set[] = []
  isPrivate: boolean
  isLoading: boolean = false
  title: string

  constructor(
    private setService: SetService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.isPrivate = this.route.snapshot.data['isPrivate']
  }

  ngOnInit() {
    this.isLoading = true
    if (!this.isPrivate) {
      this.title = 'Public'
      this.setService.getPublicSets().subscribe(
        (res: any) => {
          this.sets = res
          this.isLoading = false
        }
      )
    } else {
      this.title = 'Private'
      this.setService.getPrivateSets().subscribe(
        (res: any) => {
          this.sets = res
          this.isLoading = false
        }
      )
    }
  }
}
