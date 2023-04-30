import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: boolean = false
  isLoading: boolean = false
  errorMsg: string = ''
  loginForm: FormGroup

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true
      this.error = false
      const username = this.loginForm.get('username').value
      const password = this.loginForm.get('password').value
      this.userService.login(username, password).subscribe({
        next: (response) => {
          this.authService.login(response.token, response.expiresIn)
        },
        error: (error) => {
          this.isLoading = false
          this.error = true
          this.errorMsg = error
        }
      })
    }
  }
}
