import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Router, NavigationStart } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public_exercises: Exercise[] = [];
  private_exercises: Exercise[] = [];
  navLinks: any[] = [];
  hideContent: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        if(event.url === '/dashboard/exercises') {
          this.hideContent = false;
        } else {
          this.hideContent = true;
        }
      }
    })
  }

  ngOnInit() {
    console.log(this.router.url)
    this.exerciseService.getPublicExercises().subscribe(
      (res: any) => {
        this.public_exercises = res
        console.log(this.public_exercises)
      }
    )

    this.exerciseService.getPrivateExercises().subscribe(
      (res: any) => {
        this.private_exercises = res
        console.log(this.private_exercises)
      }
    )

    this.navLinks = [
      {
        text: 'Exercises',
        url: '/dashboard/exercises',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Add',
        url: '/dashboard/exercises/add',
        icon: 'fa-plus'
      },
      // {
      //   text: 'Test',
      //   url: '/test',
      //   icon: 'fa-home'
      // },
      // {
      //   text: 'Test',
      //   url: '/test',
      //   icon: 'fa-home'
      // },
    ]
  }
}
