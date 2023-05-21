import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    private homeService: HomeService,
    private router: Router 
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
      },
      error: () => this.isLoading = false
    })
  }

  play(goal) {
    if (goal.completed_repetitions < goal.repetitions) {
      const type = goal.subscriptionType.toLowerCase()
      this.router.navigate([`/dashboard/play/${type}/${goal.id}`])
    }
  }
}
