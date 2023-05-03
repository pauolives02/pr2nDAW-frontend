import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  navLinks: any[] = [];

  constructor() { }

  ngOnInit() {

    this.navLinks = [
      {
        text: 'Avatars',
        url: '/dashboard/configuration/avatars',
        icon: 'fa-robot'
      },
      {
        text: 'Suggestions',
        url: '/dashboard/configuration/subjects',
        icon: 'fa-message'
      },
      {
        text: 'Users list',
        url: '/dashboard/configuration/user-list',
        icon: 'fa-users'
      },
    ]
  }

}
