import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  avatarUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'
  topLvl: any[] = []
  isLoadingTopLvl: boolean = false
  topExercises: any[] = []
  isLoadingTopExercises: boolean = false

  constructor(
    private rankingService: RankingService
  ) {}

  ngOnInit() {
    this.getTopLvl()
    this.getTopExercises()
  }

  getTopLvl() {
    this.isLoadingTopLvl = true
    this.rankingService.getTopLvl().subscribe({
      next: (result: any) => {
        this.topLvl = result
        this.isLoadingTopLvl = false
      },
      error: () => this.isLoadingTopLvl = false
    })
  }

  getTopExercises() {
    this.isLoadingTopExercises = true
    this.rankingService.getTopExercises().subscribe({
      next: (result: any) => {
        this.topExercises = result
        this.isLoadingTopExercises = false
      },
      error: () => this.isLoadingTopExercises = false
    })
  }
}
