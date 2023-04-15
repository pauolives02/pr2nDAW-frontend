import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exercise-private-list',
  templateUrl: './exercise-private-list.component.html',
  styleUrls: ['./exercise-private-list.component.scss']
})
export class ExercisePrivateListComponent implements OnInit {

  exercises: Exercise[] = []
  isLoading: boolean = false
  imagesUrl: string  = environment.apiUrl + '/api/exercise/get-image/'

  constructor(
    private exerciseService: ExerciseService,
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.exerciseService.getPrivateExercises().subscribe(
      (res: any) => {
        this.exercises = res
        this.isLoading = false
      }
    )
  }

}
