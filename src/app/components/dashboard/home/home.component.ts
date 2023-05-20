import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dailyGoals: any[] = []
  isLoading: boolean = false
  setImgUrl: string = environment.apiUrl + '/api/set/get-image/'
  exerciseImgUrl: string = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.getDailyGoals()
  }

  getDailyGoals() {
    this.isLoading = true
    this.homeService.getDailyGoals().subscribe({
      next: (result: any) => {
        this.dailyGoals = result
        this.isLoading = false
        console.log(this.dailyGoals)
      },
      error: () => this.isLoading = false
    })
  }
}
