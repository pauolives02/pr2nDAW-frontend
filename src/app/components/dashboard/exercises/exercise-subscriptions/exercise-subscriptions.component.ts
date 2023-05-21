import { Component, OnInit} from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-subscriptions',
  templateUrl: './exercise-subscriptions.component.html',
  styleUrls: ['./exercise-subscriptions.component.scss']
})
export class ExerciseSubscriptionsComponent implements OnInit {

  exercises: any[] = []
  isLoading: boolean = false

  constructor(
    private exerciseService: ExerciseService,
  ) {}

  ngOnInit() {
    this.getSubscriptions()
  }

  getSubscriptions(event= null) {
    this.isLoading = true
    this.exerciseService.getExercisesSubscribed().subscribe(
      (res: any) => {
        this.exercises = res
        this.isLoading = false
      }
    )
  }

}