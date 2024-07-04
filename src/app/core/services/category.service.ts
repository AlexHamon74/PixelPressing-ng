import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { categoryInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'http://localhost:8000/api/categories';
  http = inject(HttpClient);

  fetchAll(): Observable<categoryInterface[]>{
    return this.http.get<any>(this.url).pipe(
      map(response => response['hydra:member'])
    )
  }
}
