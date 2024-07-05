import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { itemsInterface } from '../../shared/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = environment.apiURL;
  http = inject(HttpClient);

  fetchAll(): Observable<itemsInterface[]> {
    return this.http.get<any>(`${this.url}/items`).pipe(
      map(response => response['hydra:member'])
    );
  };

  getItemById(id: number): Observable<itemsInterface> {
    return this.http.get<itemsInterface>(`${this.url}/items/${id}`);
  };

  createItem(newItem: itemsInterface): Observable<itemsInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<itemsInterface>(`${this.url}/items`, newItem, { headers });
  };

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/items/${id}`);
  };

  updateItem(updatedItem: itemsInterface): Observable<itemsInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<itemsInterface>(`${this.url}/items/${updatedItem.id}`, updatedItem, { headers });
  };

}
