import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { UserInterface } from '../entities';
import { ModalCartComponent } from '../modal-cart/modal-cart.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, NgIf, ModalCartComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  user: UserInterface | null = null;
  cartItemsCount: number = 0;

  @ViewChild(ModalCartComponent) modalCartComponent!: ModalCartComponent;

  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  cartService = inject(CartService)

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
    //Initialiser le compteur avec le nombre d'éléments actuels dans le panier
    this.cartItemsCount = this.cartService.getCartItems().length;

    //S'abonner aux changements du nombre d'éléments dans le panier
    this.cartService.cartItemsCount$.subscribe(count => {
      this.cartItemsCount = count;
    });
  };

  //Méthode pour se déconnecter
  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
    setTimeout(() => {
      location.reload();
    }, 1);
  };

  //Méthode pour savoir si le user est connecté
  isLogged() {
    return this.authService.isLogged();
  };

  //Méthode pour récupérer le prénom du user
  getUser() {
    this.userService.getUserById().subscribe((data: UserInterface) => {
      this.user = data;
      console.log(data);
    })
  };

  //Méthode pour savoir si le user est un admin ou un employée
  isAdminOrEmployee() {
    const roles = this.userService.getUserRoles();
    return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_EMPLOYEE');
  };

  openCartModal() {
    this.modalCartComponent.openOffcanvas();
  }

}
