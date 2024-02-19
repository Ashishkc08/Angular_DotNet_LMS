import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  user = {
    username: '',
    password: ''
  };
  constructor(private router: Router, private userService: UserService) {}
  onSubmit(): void {
    this.userService.login(this.user.username, this.user.password)
      .subscribe(
        response => {
          console.log('Login successful', response);

          sessionStorage.setItem('currentUser', response.user.username);
          sessionStorage.setItem('currentUserDetail', JSON.stringify(response.user));
          this.router.navigate(['/home']);

        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
  }
