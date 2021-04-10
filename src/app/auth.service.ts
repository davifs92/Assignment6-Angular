import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import { User } from './User';
import { RegisterUser } from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): any {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) return true;

    return false;
  }

  login(user: User): Observable<any> {
    const request = `${environment.userAPIBase}/login`;
    return this.http.post<any>(request, user);
  }

  public logout(): void {
    return localStorage.removeItem('access_token');
  }


  register(registerUser: RegisterUser): Observable<any> {
    const request = `${environment.userAPIBase}/register`;
    return this.http.post<any>(request, registerUser);
  }
}