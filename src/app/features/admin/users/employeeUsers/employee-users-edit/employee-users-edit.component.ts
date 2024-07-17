import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../../../shared/entities';

@Component({
  selector: 'app-employee-users-edit',
  standalone: true,
  imports: [ReactiveFormsModule, SideNavAdminComponent],
  templateUrl: './employee-users-edit.component.html',
  styleUrl: '../../../admin-style.css',
})
export class EmployeeUsersEditComponent implements OnInit {

  //On définis les variables
  editFormEmployee!:FormGroup;
  employeeId: any;

  //On inject les services
  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);


  //Méthode utilisé lors de l'initialisation du composant
  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadEmployee();
  }

  //On initialise le formulaire
  initializeForm(): void {
    this.editFormEmployee = new FormGroup({
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    })
  }

// Fonction qui prend les informations d'un employé spécifique afin de les pré-afficher
loadEmployee() {
    this.userService.fetchEmployeeById(this.employeeId!).subscribe(employee => {
      this.editFormEmployee.patchValue({
        name: employee.name,
        firstname: employee.firstname,
        email: employee.email,
        adress: employee.adress,
        birthdate: employee.birthdate,
        gender: employee.gender,
      });
    });
  };

  //Méthode utilisé lors de la soumission du formulaire
  onSubmit() {
    if(this.editFormEmployee.valid){
      const updateEmployee: IUser = this.editFormEmployee.value;
      updateEmployee.id = this.employeeId!;
      this.userService.editEmployee(updateEmployee).subscribe(() =>{
        this.router.navigate(['/admin/employee-user-list']);
      })
    }else{
      alert("Le formulaire n'est pas correct")
    }
  }
}
