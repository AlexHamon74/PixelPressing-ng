import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { newOrderInterface, orderInterface } from '../../shared/entities';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiURL;
  http = inject(HttpClient);
  userService = inject(UserService);

  fetchAll():Observable<orderInterface[]>{
    return this.http.get<any>(`${this.url}/commands`).pipe(
      map(response => response['hydra:member'])
    );
  };

  fetchOrdersByUser(): Observable<orderInterface[]> {
    const userId = this.userService.getUserId();
    return this.http.get<any>(`${this.url}/commands`).pipe(
      map(response => 
        response['hydra:member'].filter((order: orderInterface) => order.user.id === userId)
      )
    );
  };

  createOrder(newOrder: newOrderInterface): Observable<newOrderInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<newOrderInterface>(`${this.url}/commands`, newOrder, { headers });
  };
}
