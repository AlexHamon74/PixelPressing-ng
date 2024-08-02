import { Injectable } from '@angular/core';
import { cartItemInterface } from '../../shared/entities';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localStorageKey = 'cartItems';

  addItemToCart(cartItem: cartItemInterface) {
    const currentCart = this.getCartItems();
    currentCart.push(cartItem);
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentCart));
  }

  getCartItems(): cartItemInterface[] {
    const cart = localStorage.getItem(this.localStorageKey);
    if (cart) {
      const parsedCart = JSON.parse(cart);
      return parsedCart;
    }
    return [];
  }

  deleteCartItems(cartItemId: number): Observable<void>{
    let currentCart = this.getCartItems();
    currentCart = currentCart.filter(cartItem => cartItem.id !== cartItemId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentCart));
    return of(void 0);
  }
}