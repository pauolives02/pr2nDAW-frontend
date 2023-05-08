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
        icon: 'fa-lock-open'
      },
      {
        text: 'Private',
        url: '/dashboard/exercises/private',
        icon: 'fa-lock'
      },
      {
        text: 'Subscriptions',
        url: '/dashboard/exercises/subscriptions',
        icon: 'fa-check'
      },
      {
        text: 'Add',
        url: '/dashboard/exercises/add',
        icon: 'fa-plus'
      },
      {
        text: 'All',
        url: '/dashboard/exercises/all',
        icon: 'fa-list',
        admin: true
      },
    ]
  }
}
