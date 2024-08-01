import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token, UserInterface } from '../../shared/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;

  //Injection des services
  http = inject(HttpClient);

  //Méthode pour effectuer la connexion
  login(credentials: { username: string; password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login_check`, credentials);
  };

  //Méthode pour sauvegarder le token dans le localStorage
  saveToken(token: Token) {
    localStorage.setItem('token', token.token);
  };

  //Méthode pour vérifier si l'utilisateur est connecté
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  };

  //Méthode pour se déconnecter et remove le localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
  };

  //Méthode pour enregistrer un nouvel utilisateur
  register(user:UserInterface): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post(`${this.url}/users`, user, {headers});
  };
}
