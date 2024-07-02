import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient);
  service = inject(AuthService);
  router = inject(Router);

  public loginForm:FormGroup = new FormGroup ({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]}),  
  });

  onSubmit(): void {

    const loginData = this.loginForm.getRawValue();
    this.http.post<any>('http://127.0.0.1:8000/api/login_check', loginData)
      .subscribe(
        (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            // Vous pouvez stocker d'autres informations utilisateur si nécessaire
            this.service.currentUser.set(response);
            this.router.navigateByUrl('');
            console.log(response);
          }
        },
      );
  }
  
  


}
