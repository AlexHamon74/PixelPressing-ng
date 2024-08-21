import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isSubmitted = false

  authService = inject(AuthService);
  router = inject(Router);

  //Initialisation du formulaire avec validations
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]),
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    adress: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
  });

  //Méthode de soumission du formulaire
  onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['login']).then(() => location.reload());
        },
      });
    };
  };

  //Méthode pour vérifier si les champs ont une erreur spécifique
  public hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

}
