import { Component, OnInit } from '@angular/core';

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
        text: 'Public',
        url: '/dashboard/exercises',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Private',
        url: '/dashboard/exercises/private',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Subscriptions',
        url: '/dashboard/exercises/subscriptions',
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
