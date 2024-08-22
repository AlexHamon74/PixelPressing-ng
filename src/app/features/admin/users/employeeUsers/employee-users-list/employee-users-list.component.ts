import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { RouterLink } from '@angular/router';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { NgFor } from '@angular/common';
import { employeeInterface } from '../../../../../shared/entities';
import { EmployeeService } from '../../../../../core/services/employee.service';

@Component({
  selector: 'app-employee-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, RouterLink, ModalDeleteComponent, NgFor],
  templateUrl: './employee-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class EmployeeUsersListComponent implements OnInit {

  //On définis les variables
  employees: employeeInterface[] = [];
  currentEmployee: employeeInterface | null = null;
  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;

  //On injecte les services
  employeeService = inject(EmployeeService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getEmployees();
  };

  //On récupère tous les employées
  getEmployees() {
    this.employeeService.fetchAll().subscribe(data =>
      this.employees = data
    )
  };

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(employee: employeeInterface) {
    this.currentEmployee = employee;
  };

  //Fonction pour supprimer l'élément actuel
  deleteEmployee() {
    this.currentEmployee = null;
    this.getEmployees();
    this.modalDeleteComponent.closeModal();
  };

}
