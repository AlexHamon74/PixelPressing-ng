import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { commandItemInterface } from '../../shared/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = environment.apiURL;
  http = inject(HttpClient);

  createCommandItem(newCommandItem:commandItemInterface): Observable<commandItemInterface>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<commandItemInterface>(`${this.url}/panier`, newCommandItem, {headers});
  };

}
