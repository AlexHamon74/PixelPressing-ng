import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken, IUser } from '../../shared/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;

  //Injection des services
  http = inject(HttpClient);

  //Méthode pour effectuer la connexion
  login(credentials: { username: string; password: string }): Observable<IToken> {
    return this.http.post<IToken>(`${this.url}/login_check`, credentials);
  };

  //Méthode pour sauvegarder le token dans le localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  };

  //Méthode pour vérifier si l'utilisateur est connecté
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  };

  //Méthode pour récupérer le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  };

  //Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('token');
  };

  //Méthode pour vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  };
  
  //Méthode pour récupérer les rôles de l'utilisateur à partir du token
  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }
    //Décodage du token JWT pour récupérer les rôles
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.roles;
  };

  //Méthode pour enregistrer un nouvel utilisateur
  register(user:IUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post(`${this.url}/users`, user, {headers});
  };
}
