import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    );
  };

  fetchAllEmployees(): Observable<IUser[]>{
    return this.http.get<any>(`${this.url}/users`).pipe(
      map(response => response['hydra:member']),
      map(users => users.filter((user:IUser) => user.roles.includes('ROLE_EMPLOYEE')))
    );
  };

  fetchEmployeeById(id: number): Observable<IUser>{
    return this.http.get<IUser>(`${this.url}/users/${id}`);
  };

  createEmployees(newEmployee: IUser): Observable<IUser>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<IUser>(`${this.url}/users`, newEmployee, {headers})
  };

  editEmployee(updateEmployee: IUser): Observable<IUser>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<IUser>(`${this.url}/users/${updateEmployee.id}`, updateEmployee, {headers});
  };

  deleteUser(id :number): Observable<void>{
    return this.http.delete<void>(`${this.url}/users/${id}`)
  };
}
