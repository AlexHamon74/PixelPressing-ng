import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { ActivatedRoute, Router } from '@angular/router';
import { employeeInterface } from '../../../../../shared/entities';
import { EmployeeService } from '../../../../../core/services/employee.service';

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
  employeeService = inject(EmployeeService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  //Methode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadEmployee();
  };

  //On initialize le formulaire
  initializeForm(): void {
    this.editEmployeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
    });
  };

  //Fonction pour convertir une date du format DD/MM/YYYY en YYYY-MM-DD
  convertDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  //On charge les données d'un article spécifique pour pré-remplir le formulaire de modification
  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId!).subscribe(data => {
      const birthdate = this.convertDate(data.birthdate);
      this.editEmployeeForm.patchValue({
        name: data.name,
        firstname: data.firstname,
        email: data.email,
        gender: data.gender,
        birthdate: birthdate,
        adress: data.adress,
      });
    });
  };


  //Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.editEmployeeForm.valid) {
      const updateEmployee: employeeInterface = {
        ...this.editEmployeeForm.value,
        id: this.employeeId!,
      };
      this.employeeService.editEmployee(updateEmployee).subscribe(() => {
        this.router.navigate(['/admin/employee-user-list']);
      });
    }
  }
}



