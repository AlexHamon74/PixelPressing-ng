import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(2)])
      })
    });
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value.credentials;
      this.authService.login({ username, password }).subscribe(
        (token) => {
          console.log('Token received:', token); // Pour déboguer
          this.authService.saveToken(token.token);
          this.router.navigate(['home']);
        },
        error => {
          console.error('Login failed', error);
          // Gérer les erreurs de connexion ici (par exemple, afficher un message d'erreur)
        }
      );
    }
  }
 }

