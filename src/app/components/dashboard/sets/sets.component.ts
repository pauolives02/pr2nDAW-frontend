import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {

  navLinks: any[] = [];

  constructor() { }

  ngOnInit() {

    this.navLinks = [
      {
        text: 'Public',
        url: '/dashboard/sets',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Private',
        url: '/dashboard/sets/private',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Subscriptions',
        url: '/dashboard/sets/subscriptions',
        icon: 'fa-dumbbell'
      },
      {
        text: 'Add',
        url: '/dashboard/sets/add',
        icon: 'fa-plus'
      },
    ]
  }
}
