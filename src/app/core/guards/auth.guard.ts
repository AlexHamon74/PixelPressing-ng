import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // Ensure AuthGuard is provided at root level
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLogged()) {
      const userRoles = this.authService.getUserRoles();
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
