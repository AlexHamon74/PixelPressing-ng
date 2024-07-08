import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { serviceInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.apiURL;
  http = inject(HttpClient);

  fetchAll(): Observable<serviceInterface[]>{
    return this.http.get<any>(`${this.url}/services`).pipe(
      map(response => response['hydra:member'])
    );
  };

  getServiceById(id:number): Observable<serviceInterface>{
    return this.http.get<serviceInterface>(`${this.url}/services/${id}`);
  };

  createService(newService:serviceInterface): Observable<serviceInterface>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<serviceInterface>(`${this.url}/services`, newService, {headers});
  };

  editService(updateService: serviceInterface): Observable<serviceInterface>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<serviceInterface>(`${this.url}/services/${updateService.id}`, updateService, {headers})
  };

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/services/${id}`);
  };

}
