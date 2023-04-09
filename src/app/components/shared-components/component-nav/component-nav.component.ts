import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.component.html',
  styleUrls: ['./component-nav.component.scss']
})
export class ComponentNavComponent implements OnInit {

  @Input() navLinks: any[];

  constructor() {}

  ngOnInit() {
  }
}
