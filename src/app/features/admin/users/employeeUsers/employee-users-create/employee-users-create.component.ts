import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-users-create',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule],
  templateUrl: './employee-users-create.component.html',
  styleUrl: '../../../admin-style.css'
})
export class EmployeeUsersCreateComponent implements OnInit
{

  //On déclare les variables
  createEmployeeForm!:FormGroup;

  //On injecte les services
  userService = inject(UserService);
  router = inject(Router);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.initializeForm()
  };

  //On initialise le formulaire
  initializeForm(){
    this.createEmployeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),

    });
  };

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.createEmployeeForm.valid) {
      const newEmployee = {
        ...this.createEmployeeForm.value,
        roles: ['ROLE_USER', 'ROLE_EMPLOYEE']
      };

      this.userService.createEmployees(newEmployee).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/employee-user-list']);
          console.log(response);
        }
      });
    } else {
      alert("Le formulaire n'est pas valide");
    }
  }
}
