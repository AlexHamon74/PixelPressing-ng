import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-side-nav-admin',
  standalone: true,
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './side-nav-admin.component.html',
  styleUrl: './side-nav-admin.component.css'
})
export class SideNavAdminComponent {

  authService = inject(AuthService)
  userService = inject(UserService);

  logout() {
    this.authService.logout();
  };

  isExpanded: boolean = false;
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  };

  //Méthode pour savoir si le user est un admin ou un employée
  isAdmin() {
    const roles = this.userService.getUserRoles();
    return roles.includes('ROLE_ADMIN');
  };

}
