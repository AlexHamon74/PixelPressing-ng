import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cartItemInterface } from '../entities';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-modal-cart',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './modal-cart.component.html',
  styleUrl: './modal-cart.component.css'
})
export class ModalCartComponent implements OnInit {

  //On définis les variables
  cartItems: cartItemInterface[] = [];
  currentCartItem: cartItemInterface | null = null;

  //On injecte les services
  cartService = inject(CartService);
  renderer = inject(Renderer2);

  @ViewChild('offcanvasRight') offcanvasRight!: ElementRef;
  @ViewChild('offcanvasBackdrop') offcanvasBackdrop!: ElementRef;


  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.loadCartItems();
  };

  //On récupère les CartItems
  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  };

  //On calcule le prix total du panier
  totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  deleteCartItem(cartItemId: number) {
    this.cartService.deleteCartItems(cartItemId).subscribe(() => {
      this.loadCartItems();
      location.reload();
    });
  };

  openOffcanvas() {
    const offcanvasElement = this.offcanvasRight.nativeElement;
    this.renderer.addClass(offcanvasElement, 'show');
    this.renderer.setStyle(offcanvasElement, 'visibility', 'visible');
    this.renderer.setStyle(offcanvasElement, 'transform', 'translateX(0)');
    this.offcanvasRight.nativeElement.classList.add('show');
    this.offcanvasBackdrop.nativeElement.classList.add('show');
  };

  closeOffcanvas() {
    const offcanvasElement = this.offcanvasRight.nativeElement;
    this.renderer.removeClass(offcanvasElement, 'show');
    this.renderer.setStyle(offcanvasElement, 'visibility', 'hidden');
    this.renderer.setStyle(offcanvasElement, 'transform', 'translateX(100%)');
    this.offcanvasRight.nativeElement.classList.remove('show');
    this.offcanvasBackdrop.nativeElement.classList.remove('show');
  };

}
