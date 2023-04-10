import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss']
})
export class ExerciseDetailComponent implements OnInit {

  exercise: Exercise;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getExercise(params['id'])
    })
  }

  getExercise(id) {
    this.exerciseService.getExerciseById(id)
    .subscribe(exercise => {
      this.exercise = exercise
      console.log(this.exercise)
    })
  }
}
