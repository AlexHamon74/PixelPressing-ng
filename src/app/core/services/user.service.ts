import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiListResponse, UserInterface } from '../../shared/entities';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiURL;

  http = inject(HttpClient);
  authService = inject(AuthService);

  //Méthode pour récupérer le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  };

  //Méthode pour récupérer les rôles de l'utilisateur à partir du token
  getUserRoles() {
    const token = this.getToken();
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      const roles = tokenPayload.roles;
      return roles;
    }
  };

  //Méthode pour récupérer l'id de l'utilisateur à partir du token
  getUserId() {
    const token = this.getToken();
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      const id = tokenPayload.id;
      return id;
    }
  };

  //Méthode pour récupérer un user/id
  getUserById(): Observable<UserInterface> {
    const userId = this.getUserId();
    return this.http.get<UserInterface>(this.url + '/users/' + userId);
  };


  // Méthode pour récupérer les users avec le rôle [ROLE_EMPLOYEE]
  fetchAllEmployees(): Observable<UserInterface[]> {
    return this.http.get<{ 'hydra:member': UserInterface[] }>(this.url + '/users').pipe(
      map(response => response['hydra:member']),
      map(users => users.filter((user: UserInterface) => 
        user.roles.includes('ROLE_EMPLOYEE')
      ))
    );
  }


  // Méthode pour récupérer les utilisateurs avec uniquement le rôle [ROLE_USER]
  fetchAllCustomers(): Observable<UserInterface[]> {
    return this.http.get<{ 'hydra:member': UserInterface[] }>(this.url + '/users').pipe(
      map(response => response['hydra:member']),
      map(users => users.filter((user: UserInterface) => 
        user.roles.includes('ROLE_USER') && user.roles.length === 1
      ))
    );
  }


  //Méthode pour mettre à jour les infos du user connecté
  updateUser(user: UserInterface): Observable<UserInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<UserInterface>(this.url + '/users/' + user.id, user, { headers });
  };

  //Méthode pour supprimer un user
  deleteUser(id: number) {
    return this.http.delete<void>(this.url + '/users/' + id)
  }


}
