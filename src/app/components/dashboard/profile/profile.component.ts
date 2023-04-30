import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userData: any
  progress: number = 0

  constructor (
    private userService: UserService
  ) { }
  
  ngOnInit(): void {
    this.userService.getUserStats()
    .subscribe({
      next: (data) => {
        this.userData = data
        this.progress = this.userData.current_xp * 100 / this.userData.nextLvlXp
      },
      error: (err) => console.log(err)
    })
  }

}
