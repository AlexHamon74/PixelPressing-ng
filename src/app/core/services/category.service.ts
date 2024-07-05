import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { categoryInterface } from '../../shared/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiURL;
  http = inject(HttpClient);


  //Je récupère toutes les catégories
  fetchAll(): Observable<categoryInterface[]>{
    return this.http.get<any>(`${this.url}/categories`).pipe(
      map(response => response['hydra:member'])
    )
  }
}
