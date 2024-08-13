import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { cartItemInterface, orderInterface, UserInterface } from '../../../shared/entities';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe, ReactiveFormsModule],
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

  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
    this.loadCartItems();
  
    this.paymentForm = this.fb.group({
      deliveryDate: [this.deliveryDate]
    });
  
    // Abonnement aux changements de formulaire pour mettre à jour la date de livraison
    this.paymentForm.get('deliveryDate')?.valueChanges.subscribe(value => {
      this.deliveryDate = value;
    });
  }

loadCartItems() {
  const cartItemsString = localStorage.getItem('cartItems');
  if (cartItemsString) {
    this.cartItems = JSON.parse(cartItemsString);
  } else {
    this.cartItems = []; // Initialisez avec un tableau vide si rien n'est trouvé
  }
}

  calculateTotalPrice(cartItem: cartItemInterface): number {
    let total = cartItem.item.price;
    cartItem.service.forEach(service => {
      total += service.price;
    });
    return total * cartItem.quantity;
  }

  subtotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  totalPrice() {
    return this.subtotalPrice() + (this.delivery ? this.delivery_price : 0);
  }

  getUser() {
    this.userService.getUserById().subscribe(data => {
      this.user = data;
    });
  }

  isLogged() {
    return this.authService.isLogged();
  }

  onDeliveryChange(isDelivery: boolean) {
    this.delivery = isDelivery;
    if (!isDelivery) {
      this.deliveryDate = null;  // Clear delivery date if delivery is not selected
      this.paymentForm.get('deliveryDate')?.setValue(null);
    }
  }
  
  payOrder() {
    const isoDate = this.delivery ? new Date(this.deliveryDate || '').toISOString() : null;
    const createdAt = new Date().toISOString();  // Ajout de la date actuelle en format ISO

    const newOrder: orderInterface = {
      price: this.totalPrice(),
      status: this.status,
      delivery: this.delivery,
      deliveryDate: isoDate,
      commandItems:this.cartItems,
      createdAt: createdAt,  // Ajout du champ createdAt
      user: this.user['@id'] || `"/api/users/${this.user.id}"`,  // Utiliser l'IRI de l'utilisateur
    };
    console.log('Prix total :' + this.totalPrice())
    console.log('Status :' + this.status)
    console.log('Livraison :' + this.delivery)
    console.log('Date de livraison : ' + isoDate);
    console.log(this.cartItems);
    console.log('Date de création :' + createdAt),
    console.log('User :' + this.user['@id'] || `"/api/users/${this.user.id}"`)
  
    this.orderService.createOrder(newOrder).subscribe(
      response => {
        console.log('Order created successfully:', response);
        // Rediriger ou afficher un message de succès
      },
      error => {
        console.error('Error creating order:', error);
      }
    );
  }
}


