import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  public_exercises: Exercise[] = [];
  private_exercises: Exercise[] = [];
  isLoadingPublic: boolean = false;
  isLoadingPrivate: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
  ) {}

  ngOnInit() {
    this.isLoadingPublic = true
    this.exerciseService.getPublicExercises().subscribe(
      (res: any) => {
        this.public_exercises = res
        this.isLoadingPublic = false
      }
    )

    this.isLoadingPrivate = true
    this.exerciseService.getPrivateExercises().subscribe(
      (res: any) => {
        this.private_exercises = res
        this.isLoadingPrivate = false
      }
    )
  }
}
