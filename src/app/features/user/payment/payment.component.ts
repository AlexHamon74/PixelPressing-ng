import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { cartItemInterface, newOrderInterface, orderInterface, UserInterface } from '../../../shared/entities';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  //On définis nos variables
  cartItems: cartItemInterface[] = [];
  user: UserInterface = {} as UserInterface;
  delivery_price: number = 10;
  status = 'En attente de réception des articles';
  delivery: boolean = false;
  deliveryDate: string | null = null;
  paymentForm!: FormGroup;
  isSubmitted = false;

  //On injecte les services
  cartService = inject(CartService);
  userService = inject(UserService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  router = inject(Router);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
    this.loadCartItems();
    this.initializeForm();
  };

  //On récupère les items qui sont dans le localStorage
  loadCartItems() {
    const cartItemsString = localStorage.getItem('cartItems');
    this.cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
  };
  
  //On vérifie si le user est conncté
  isLogged(): boolean {
    return this.authService.isLogged();
  };

  //On récupère les infos du user connecté
  getUser() {
    this.userService.getUserById().subscribe(data => {
      this.user = data;
    });
  };

  //On initialise le formulaire
  initializeForm() {
    this.paymentForm = new FormGroup({
      deliveryDate: new FormControl(null, [Validators.required])
    });
  };

  // Fonctions pour calculer les prix
  itemSubTotalPrice(cartItem: cartItemInterface): number {
    return cartItem.service.reduce((total, service) => total + service.price, cartItem.item.price) * cartItem.quantity;
  };
  subtotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };
  totalPrice(): number {
    return this.subtotalPrice() + (this.delivery ? this.delivery_price : 0);
  };

  //Fonction pour vérifier si on a choisis le livraion ou non
  onDeliveryChange(isDelivery: boolean) {
    this.delivery = isDelivery;
    if (!isDelivery) {
      this.paymentForm.get('deliveryDate')?.reset();
    }
  };
  
  //Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.isSubmitted = true;
    if (this.delivery && this.paymentForm.invalid) {
      return;
    }
    const createdAt = new Date().toISOString();
    const newOrder: newOrderInterface = {
      price: this.totalPrice(),
      status: this.status,
      delivery: this.delivery,
      deliveryDate: this.delivery ? this.paymentForm.get('deliveryDate')?.value : null,
      commandItems: this.cartItems,
      createdAt: createdAt,
      user: this.user['@id'],
    };

    this.orderService.createOrder(newOrder).subscribe(
      response => {
        console.log('Commande créée', response);
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
  };

}


