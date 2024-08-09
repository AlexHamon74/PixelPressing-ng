import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../../../../shared/entities';

@Component({
  selector: 'app-employee-users-edit',
  standalone: true,
  imports: [ReactiveFormsModule, SideNavAdminComponent],
  templateUrl: './employee-users-edit.component.html',
  styleUrl: '../../../admin-style.css',
})
export class EmployeeUsersEditComponent {

//On déclare les variables
editEmployeeForm!: FormGroup;
employeeId: any;

//On inject les services
userService = inject(UserService);
router = inject(Router);
activatedRoute = inject(ActivatedRoute);

//Methode appelée lors de l'initialisation du composant
ngOnInit(): void {
  this.employeeId = this.activatedRoute.snapshot.paramMap.get('id');
  this.initializeForm();
  this.loadService();
};

//On initialize le formulaire
initializeForm(): void{
  this.editEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    adress: new FormControl('', [Validators.required]),
  });
};

//On charge les données d'un article spécifique pour pré-remplir le formulaire de modification
loadService(): void {
  this.userService.getEmployeeById(this.employeeId!).subscribe(employee => {
    const formattedBirthdate = this.formatDate(employee.birthdate);
    this.editEmployeeForm.patchValue({
      name: employee.name,
      firstname: employee.firstname,
      email: employee.email,
      gender: employee.gender,
      birthdate: formattedBirthdate,
      adress: employee.adress,
    });
  });
}


formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


//Fonction appelée lors de la soumission du formulaire
onSubmit(){
  if(this.editEmployeeForm.valid){
    const updateEmployee: UserInterface = this.editEmployeeForm.value;
    updateEmployee.id = this.employeeId!;
    this.userService.editEmployee(updateEmployee).subscribe(() =>{
      this.router.navigate(['/admin/employee-user-list']);
    });
  };
};
}
