import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7114/api';
  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/signup`, user);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, { username, password });
  }

logout(): void {
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUserDetail')
}

getUserByUsername(username: string): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/User/${username}`);
}

getUserIdByUsername(username: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/User/${username}/UserId`);
}

isLoggedIn(): boolean {
  return !!sessionStorage.getItem('currentUserDetail');
}
}
