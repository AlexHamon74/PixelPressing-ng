import { Injectable } from '@angular/core';
import { cartItemInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localStorageKey = 'cartItems';

  addItemToCart(item: cartItemInterface) {
    // Récupérer les items existants du panier
    const currentCart = this.getCartItems();
    // Ajouter le nouvel item au panier
    currentCart.push(item);
    // Sauvegarder le panier mis à jour dans le Local Storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentCart));
  }

  getCartItems(): cartItemInterface[] {
    const cart = localStorage.getItem(this.localStorageKey);
    if (cart) {
      try {
        const parsedCart = JSON.parse(cart);
        // Vérifier si le résultat est un tableau
        if (Array.isArray(parsedCart)) {
          return parsedCart;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier depuis le localStorage:', error);
      }
    }
    // Retourner un tableau vide si le panier est vide ou mal formaté
    return [];
  }
}