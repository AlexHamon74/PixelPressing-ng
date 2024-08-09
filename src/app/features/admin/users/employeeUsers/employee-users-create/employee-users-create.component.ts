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
export class EmployeeUsersCreateComponent{

//On déclare les variable
createEmployeeForm!:FormGroup;

//On injecte les services
userService = inject(UserService);
router = inject(Router);

//Methode appelée lors de l'initialisation du composant
ngOnInit(): void {
  this.initializeForm();
};

//On initialise le formulaire
initializeForm(){
  this.createEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    adress: new FormControl('', [Validators.required]),
    
  });
};

//Fonction appelée lors de la soumission du formulaire
onSubmit(){
  const formData = {
    ...this.createEmployeeForm.value,
    roles: ['ROLE_EMPLOYEE'] // Ajoute le rôle ROLE_EMPLOYEE
  };
  this.userService.createEmployee(formData).subscribe({
    next: () => {
      this.router.navigate(['/admin/employee-user-list']);
    }
  });
};

}
