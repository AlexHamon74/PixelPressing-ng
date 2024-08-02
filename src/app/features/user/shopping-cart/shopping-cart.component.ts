import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { cartItemInterface } from '../../../shared/entities';
import { CartService } from '../../../core/services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgIf, NgFor, ModalDeleteComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

  //On définis les variables
  cartItems: cartItemInterface[] = [];
  currentCartItem: cartItemInterface | null = null;

  //On injecte les services
  cartService = inject(CartService);

  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;


  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.loadCartItems();
  }

  //On récupère les CartItems
  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  //On calcule le prix total du panier
  totalPrice(){
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(cartItem: cartItemInterface) {
    this.currentCartItem = cartItem;
  }

  //Fonction pour recharger les éléments du panier et fermer la modal après suppression.
  onServiceDeleted() {
    this.loadCartItems();
    this.modalDeleteComponent.closeModal();
  }

}

