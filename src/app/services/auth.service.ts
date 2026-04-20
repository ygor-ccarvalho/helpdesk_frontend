import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService) { }
  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      return !this.jwtService.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

   logout() {
   localStorage.clear();
  }

}
