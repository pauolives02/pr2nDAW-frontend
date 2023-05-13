import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  navLinks: any[] = [];

  constructor() { }

  ngOnInit() {

    this.navLinks = [
      {
        text: 'New',
        url: '/dashboard/suggestions',
        icon: 'fa-plus'
      },
      {
        text: 'My suggestions',
        url: '/dashboard/suggestions/my-suggestions',
        icon: 'fa-dumbbell'
      },
      {
        text: 'All',
        url: '/dashboard/suggestions/all',
        icon: 'fa-list',
        admin: true
      },
    ]
  }

}
