import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: boolean = false
  isLoading: boolean = false

  constructor(
    private userService: UserService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true
      const username = this.loginForm.get('username').value
      const password = this.loginForm.get('password').value
      this.userService.login(username, password)
    }
  }
}
