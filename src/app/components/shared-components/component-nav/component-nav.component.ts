import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.component.html',
  styleUrls: ['./component-nav.component.scss']
})
export class ComponentNavComponent implements OnInit {

  @Input() navLinks: any[]

  isAdmin: boolean = false

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin()
  }
}
