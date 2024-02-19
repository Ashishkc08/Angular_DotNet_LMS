import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showSuccessAlert: boolean = false;
  showErrorAlert: { status: boolean, message: string } = { status: false, message: '' };
  user = {
    name: '',
    username: '',
    password: '',
  };
  confirmPassword='';
  constructor(private userService: UserService, private router: Router){}

  onSubmit(){
    if (this.user.name && this.user.username && this.user.password && this.confirmPassword){
    if (this.user.password !== this.confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }
    this.userService.signup(this.user).subscribe(
      (response) => {
        this.showSuccessAlert = true;
        console.log('Signup successful:', response);

        setTimeout(() => {
          this.router.navigate(['/login']);
          this.showSuccessAlert = false;

        }, 3000);
      },
      (error) => {
        console.error('Signup error:', error);
        this.showErrorAlert.status = true;
        this.showErrorAlert.message = "Something Went Wrong"
        setTimeout(() => {
          this.showErrorAlert.status = false;

        }, 3000);
      }
    );
  }
  else{
  this.showErrorAlert.status = true;
  this.showErrorAlert.message = "All fields are required"
  setTimeout(()=>{
    this.showErrorAlert.status = false;
  },3000)
}
  }
}

