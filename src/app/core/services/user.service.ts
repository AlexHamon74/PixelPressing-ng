import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiURL;
  http = inject(HttpClient);

  fetchAllCustomers(): Observable<IUser[]>{
    return this.http.get<any>(`${this.url}/users`).pipe(
      map(response => response['hydra:member']),
      map(users => users.filter((user: IUser) => !user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_EMPLOYEE')))
    )
  }

  deleteUser(id :number): Observable<void>{
    return this.http.delete<void>(`${this.url}/users/${id}`)
  }
}
