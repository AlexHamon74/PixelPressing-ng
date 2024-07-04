import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  service = inject(AuthService);
  router = inject(Router);

  public registerForm:FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required, ]),
    password: new FormControl('', [Validators.required, ]),
    name: new FormControl('', [Validators.required, ]),
    firstname: new FormControl('', [Validators.required, ]),
    adress: new FormControl('', [Validators.required, ]),
    gender: new FormControl('', [Validators.required, ]),
    birthdate: new FormControl('', [Validators.required, ]),
  })

  onSubmit() {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          console.log(this.registerForm.value);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Erreur inscription', error);
          console.log(this.registerForm.value);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

}
