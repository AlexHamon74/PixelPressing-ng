import { Component, inject } from '@angular/core';
import { cartItemInterface, serviceInterface } from '../../../shared/entities';
import { CartService } from '../../../core/services/cart.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartItems: cartItemInterface[] = [];

  cartService = inject(CartService)

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getServiceNames(services: serviceInterface[]): string {
    return services.map(service => service.name).join(', ');
  }
}

