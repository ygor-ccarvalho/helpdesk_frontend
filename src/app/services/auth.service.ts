import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfullLogin(authToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      const token = authToken.replace('Bearer ', '');
      localStorage.setItem('token', token);
    }
  }

  isAuthenticated(): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      return !this.jwtService.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  getNomeUsuario(): string {
    const token = localStorage.getItem('token');
    if (!token) return 'Admin';

    try {
      const decoded = this.jwtService.decodeToken(token);
      return decoded?.nome ?? decoded?.sub ?? 'Admin';
    } catch {
      return 'Admin';
    }
  }
}