import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { orderInterface } from '../../shared/entities';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiURL;
  http = inject(HttpClient);
  userService = inject(UserService);


  fetchOrdersByUser(): Observable<orderInterface[]> {
    const userId = this.userService.getUserId();
    return this.http.get<any>(`${this.url}/commands`).pipe(
      map(response => 
        response['hydra:member'].filter((order: any) => order.user.id === userId)
      )
    );
  };

  createOrder(newOrder: orderInterface): Observable<orderInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<orderInterface>(`${this.url}/commands`, newOrder, { headers });
  };
}
