import { Component, OnInit} from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[] = []
  isPrivate: boolean
  isLoading: boolean = false
  title: string

  constructor(
    private exerciseService: ExerciseService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.isPrivate = this.route.snapshot.data['isPrivate']
  }

  ngOnInit() {
    this.isLoading = true
    if (!this.isPrivate) {
      this.title = 'Public'
      this.exerciseService.getPublicExercises().subscribe(
        (res: any) => {
          this.exercises = res
          this.isLoading = false
        }
      )
    } else {
      this.title = 'Private'
      this.exerciseService.getPrivateExercises().subscribe(
        (res: any) => {
          this.exercises = res
          this.isLoading = false
        }
      )
    }
  }

}
