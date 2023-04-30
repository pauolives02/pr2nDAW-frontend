import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  error: boolean = false
  isLoading: boolean = false
  errorMsg: string = ''
  registerForm: FormGroup

  constructor(
    private userService: UserService,
    private authService: AuthService
    // private router: Router
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rpassword: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true
      this.error = false
      
      const authData: User = {
        email: this.registerForm.get('email').value,
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value
      }

      this.userService.register(authData).subscribe({
        next: (response) => {
          this.authService.login(response.token, response.expiresIn)
          // if (response.status == 201) {
          //   this.router.navigate(['/login'])
          // }
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
