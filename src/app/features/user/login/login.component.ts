import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string | null = null;
  isSubmitted = false;

  authService = inject(AuthService);
  router = inject(Router);

  //Initialisation du formulaire avec validations
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,])
  });

  //Méthode de soumission du formulaire
  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = null;

    if (this.loginForm.valid) {

      const { username, password } = this.loginForm.value;
      this.authService.login({ username, password }).subscribe({
        next: (token) => {
          this.authService.saveToken(token);
          this.router.navigate(['home']).then(() => location.reload());
        },
        error: () => {
          this.errorMessage = 'Votre identifiant ou votre mot de passe est incorrect.';
        }
      });
    }
  };

  //Méthode pour vérifier si les champs ont une erreur spécifique
  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

}

