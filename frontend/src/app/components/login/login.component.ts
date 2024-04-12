import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/shared/models/loginResponse.model';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  handleLogin(username: string, password: string) {
    if (username == '') {
      this.errorMessage = '* Missing username';
    } else if (password == '') {
      this.errorMessage = '* Missing password';
    } else {
      this.errorMessage = '';
      // logic to save cookie and redirect to /dashboard

      const loginData = {
        email: username,
        password: password,
      };

      this.userService.login(loginData).subscribe({
        next: (response: any) => {
          const loginResponse: LoginResponse = response;

          localStorage.setItem('token', loginResponse.token);
          localStorage.setItem('user', JSON.stringify(loginResponse.user));

          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.errorMessage = "login error"
        }
      });
    }

  }
}
