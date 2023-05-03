import { Component, ElementRef, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  toggle: boolean = false
  small: boolean = false
  large: boolean = false

  locked: boolean = false

  isAdmin: boolean = false


  clicks: number = 0
  @Output() closeNav: EventEmitter<any> = new EventEmitter()

  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(!this.eRef.nativeElement.contains(event.target) && this.toggle) {
      if(this.clicks == 0) {
        this.clicks += 1
      } else {
        if(this.toggle) {
          this.toggle = false
          this.locked = !this.locked
          this.closeNav.emit(this.toggle)
        }
        this.clicks = 0
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 1024) {
      if(!this.locked) {
        this.small = false
        this.large = true
      }
    } else if (window.innerWidth < 1024 && window.innerWidth >= 640) {
      if(!this.locked) {
        this.small = true
        this.large = false
      }
    } else {
      this.small = false
      this.large = false
    }
  }

  constructor(
    private eRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.onResize(null)
    this.isAdmin = this.authService.getIsAdmin()
  }

  toggleNav() {
    if (window.innerWidth >= 1024) {
      this.small = !this.small
      this.large = !this.large
    } else if (window.innerWidth < 1024 && window.innerWidth >= 640) {
      this.small = !this.small
      this.large = !this.large
    } else {
      this.toggle = !this.toggle
      return true
    }
    return false
  }
}
