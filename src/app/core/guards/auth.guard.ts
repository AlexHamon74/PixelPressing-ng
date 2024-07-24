import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject, Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  //Cette fonction vérifie si le user est connecté et qual est son rôle
  canActivate(): boolean {
    if (this.authService.isLogged()) {
      const userRoles = this.userService.getUserRoles();
      // Vérifie si l'utilisateur a le rôle ROLE_ADMIN ou ROLE_EMPLOYEE
      if (userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_EMPLOYEE')) {
        return true;
      } else {
        // Redirection vers une page non autorisée ou un autre traitement
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
