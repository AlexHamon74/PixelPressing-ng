import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { cartItemInterface, UserInterface } from '../../../shared/entities';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

//On définis les variables
cartItems: cartItemInterface[] = [];
user: UserInterface = {} as UserInterface;

//On injecte les services
cartService = inject(CartService);
userService = inject(UserService);
authService = inject(AuthService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
    this.loadCartItems();
  }

  //On récupère les CartItems
  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  //On calcule le prix total du panier
  totalPrice() {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  //On récupère les informations du user connecté
  getUser(){
    this.userService.getUserById().subscribe(data =>{
      this.user = data;
    })
  }

  //Méthode pour savoir si le user est connecté
  isLogged() {
    return this.authService.isLogged();
  };

}
