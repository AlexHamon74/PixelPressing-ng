import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { cartItemInterface, orderInterface, UserInterface } from '../../../shared/entities';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  cartItems: cartItemInterface[] = [];
  user: UserInterface = {} as UserInterface;
  delivery_price = 10;
  status = 'En attente de prise en charge';
  delivery: boolean = false;
  deliveryDate: string | null = null;
  paymentForm!: FormGroup;

  cartService = inject(CartService);
  userService = inject(UserService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
    this.loadCartItems();
    this.initPaymentForm();
  }

  private initPaymentForm() {
    this.paymentForm = this.fb.group({
      deliveryDate: [this.deliveryDate]
    });
    
    this.paymentForm.get('deliveryDate')?.valueChanges.subscribe(value => {
      this.deliveryDate = value;
    });
  }

loadCartItems() {
  const cartItemsString = localStorage.getItem('cartItems');
  this.cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
}

  calculateTotalPrice(cartItem: cartItemInterface): number {
    return cartItem.service.reduce((total, service) => total + service.price, cartItem.item.price) * cartItem.quantity;
  }

  subtotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  totalPrice(): number {
    return this.subtotalPrice() + (this.delivery ? this.delivery_price : 0);
  }

  getUser() {
    this.userService.getUserById().subscribe(data => {
      this.user = data;
    });
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  onDeliveryChange(isDelivery: boolean) {
    this.delivery = isDelivery;
    this.deliveryDate = isDelivery ? this.deliveryDate : null;
    this.paymentForm.get('deliveryDate')?.setValue(this.deliveryDate);
  }
  
  payOrder() {
    const createdAt = new Date().toISOString();

    const newOrder: orderInterface = {
      price: this.totalPrice(),
      status: this.status,
      delivery: this.delivery,
      deliveryDate: this.deliveryDate,
      commandItems:this.cartItems,
      createdAt: createdAt,
      user: this.user['@id'],
    };
  
    this.orderService.createOrder(newOrder).subscribe(
      response => {
        console.log('Commande crée', response);
        localStorage.removeItem('cartItems');
        setTimeout(() => {
          location.reload();
        }, 1);
        this.router.navigate(['commande-valide']);
      },
      error => {
        console.error('Erreur lors de la création de la commande', error);
      }
    );
  }
}


