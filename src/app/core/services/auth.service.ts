import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IToken, IUser } from '../../shared/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;
  http = inject(HttpClient);
  router = inject(Router)

  login(credentials: { username: string; password: string }): Observable<IToken> {
    return this.http.post<IToken>(`${this.url}/login_check`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  }
  
  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }
    // Exemple : décodez le token JWT pour récupérer les rôles
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.roles; // Supposons que les rôles sont stockés sous forme de tableau dans le token
  }

  register(user:IUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post(`${this.url}/users`, user, {headers});
  }
}
