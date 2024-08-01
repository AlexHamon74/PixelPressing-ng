import { Injectable } from '@angular/core';
import { cartItemInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localStorageKey = 'cartItems';

  addItemToCart(item: cartItemInterface) {
    const currentCart = this.getCartItems();
    currentCart.push(item);
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
}