import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = signal<undefined | null>(undefined);

}
