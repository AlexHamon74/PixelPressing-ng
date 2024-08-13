import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { orderInterface } from '../../shared/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiURL;
  http = inject(HttpClient);

  createOrder(newOrder: orderInterface): Observable<orderInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<orderInterface>(`${this.url}/commands`, newOrder, { headers });
  };
}
