import { Injectable } from '@angular/core';
import { cartItemInterface, serviceInterface } from '../../shared/entities';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localStorageKey = 'cartItems';

  addItemToCart(cartItem: cartItemInterface) {
    const currentCart = this.getCartItems();
    const existingCartItemIndex = currentCart.findIndex(item => 
      item.item.id === cartItem.item.id && 
      this.areServicesEqual(item.service, cartItem.service)
    );

    if (existingCartItemIndex > -1) {
      currentCart[existingCartItemIndex].quantity += cartItem.quantity;
      currentCart[existingCartItemIndex].totalPrice += cartItem.totalPrice;
    } else {
      currentCart.push(cartItem);
    }

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

  areServicesEqual(services1: serviceInterface[], services2: serviceInterface[]): boolean {
    if (services1.length !== services2.length) {
      return false;
    }

    const serviceIds1 = services1.map(service => service.id).sort();
    const serviceIds2 = services2.map(service => service.id).sort();

    return serviceIds1.every((id, index) => id === serviceIds2[index]);
  }
}
