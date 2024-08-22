import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { employeeInterface } from '../../shared/entities';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = environment.apiURL;
  http = inject(HttpClient);

  fetchAll(): Observable<employeeInterface[]> {
    return this.http.get<any>(`${this.url}/employees`).pipe(
      map(response => response['hydra:member'])
    );
  };

  getEmployeeById(id: number): Observable<employeeInterface> {
    return this.http.get<employeeInterface>(`${this.url}/employees/${id}`);
  };

  createEmployee(newEmployee: employeeInterface): Observable<employeeInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<employeeInterface>(`${this.url}/employees`, newEmployee, { headers });
  };

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/employees/${id}`);
  };

  editEmployee(updatedEmployee: employeeInterface): Observable<employeeInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<employeeInterface>(`${this.url}/employees/${updatedEmployee.id}`, updatedEmployee, { headers });
  };

}
