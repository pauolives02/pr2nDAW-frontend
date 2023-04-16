import { Component, OnInit} from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-subscriptions',
  templateUrl: './exercise-subscriptions.component.html',
  styleUrls: ['./exercise-subscriptions.component.scss']
})
export class ExerciseSubscriptionsComponent implements OnInit {

  exercises: Exercise[] = []
  isLoading: boolean = false
  // imagesUrl: string  = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private exerciseService: ExerciseService,
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.exerciseService.getExercisesSubscribed().subscribe(
      (res: any) => {
        // console.log(res)
        this.exercises = res
        // console.log(this.exercises)
        this.isLoading = false
      }
    )
  }

}