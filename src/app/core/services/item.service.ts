import { HttpClient } from '@angular/common/http';
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
}
