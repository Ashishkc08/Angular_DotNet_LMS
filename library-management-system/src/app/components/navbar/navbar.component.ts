import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokens: number=0;


  constructor(private router: Router, private userService:UserService) { }

  ngOnInit(): void {
  }
  navigateToBooksBorrowed(): void {
    const id: number = +JSON.parse(sessionStorage.getItem('currentUserDetail') || '{}').userId;

    this.router.navigate(['./books/borrowed', id]);
  }
  navigateToBooksLented(): void {
    const id: number = +JSON.parse(sessionStorage.getItem('currentUserDetail') || '{}').userId;

    this.router.navigate(['./books/lent', id]);
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }
  getTokens(): number {
    let tokens: number = 0;
    const currentUserDetailString = sessionStorage.getItem('currentUserDetail');

    if (currentUserDetailString) {
      const currentUserDetail = JSON.parse(currentUserDetailString);
      tokens = currentUserDetail.tokensAvailable || 0;
    }

    return tokens;
  }
}
