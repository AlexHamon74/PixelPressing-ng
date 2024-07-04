import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  service = inject(AuthService)
  public registerForm:FormGroup = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    firstname: new FormControl(''),
    adress: new FormControl(''),
    gender: new FormControl(''),
    birthdate: new FormControl(''),
    
  })

  onSubmit() {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          console.log(this.registerForm.value);
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
