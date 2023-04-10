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

  navLinks: any[] = [];

  constructor() { }

  ngOnInit() {

    this.navLinks = [
      {
        text: 'List',
        url: '/dashboard/exercises',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Add',
        url: '/dashboard/exercises/add',
        icon: 'fa-plus'
      },
    ]
  }
}
