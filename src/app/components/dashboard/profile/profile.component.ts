import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userStats: any
  userData: any
  progress: number = 0
  avatarUrl: string = environment.apiUrl + '/api/avatar/get-avatar/'
  selfProfile: boolean = true

  constructor (
    private userService: UserService
  ) { }
  
  ngOnInit() {
    this.userService.getUserStats()
    .subscribe({
      next: (data) => {
        this.userStats = data
        this.progress = this.userStats.current_xp * 100 / this.userStats.nextLvlXp
      },
      error: (err) => console.log(err)
    })

    this.userService.getAuthUser()
    .subscribe({
      next: (data) => {
        this.userData = data
      },
      error: (err) => console.log(err)
    })
  }

}
