import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { itemsInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = 'http://localhost:8000/api/items';
  http = inject(HttpClient);

  fetchAll(): Observable<itemsInterface[]>{
    return this.http.get<any>(this.url).pipe(
      map(response => response['hydra:member'])
    )
  }

  createItem(newItem: itemsInterface): Observable<itemsInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<itemsInterface>(this.url, newItem, {headers})
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateItem(updatedItem: itemsInterface): Observable<itemsInterface> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<itemsInterface>(`${this.url}/${updatedItem.id}`, updatedItem, { headers });
  }

  getItemById(id: number): Observable<itemsInterface> {
    return this.http.get<itemsInterface>(`${this.url}/${id}`);
  }
}
