import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';
import { commandInterface, editCommandInterface, newCommandInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiURL;
  http = inject(HttpClient);
  userService = inject(UserService);

  fetchAll():Observable<commandInterface[]>{
    return this.http.get<any>(`${this.url}/commands`).pipe(
      map(response => response['hydra:member'])
    );
  };

  fetchById(id: string): Observable<commandInterface> {
    return this.http.get<commandInterface>(`${this.url}/commands/${id}`);
  };

  createOrder(newOrder: newCommandInterface): Observable<newCommandInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<newCommandInterface>(`${this.url}/commands`, newOrder, { headers });
  };

  editOrder(updateOrder: editCommandInterface): Observable<editCommandInterface>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<editCommandInterface>(`${this.url}/commands/${updateOrder.id}`, updateOrder, {headers})
  };
}
