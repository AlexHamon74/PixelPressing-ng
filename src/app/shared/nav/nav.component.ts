import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { UserInterface } from '../entities';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  user: UserInterface | null = null;

  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    if (this.isLogged()) {
      this.getUser();
    }
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

  //Méthode pour savoir si le user est un admin
  isAdmin() {
    const roles = this.userService.getUserRoles();
    return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_EMPLOYEE');
  };

}
