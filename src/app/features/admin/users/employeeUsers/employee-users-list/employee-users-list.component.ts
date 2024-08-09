import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { RouterLink } from '@angular/router';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { UserService } from '../../../../../core/services/user.service';
import { DatePipe, NgFor } from '@angular/common';
import { UserInterface } from '../../../../../shared/entities';

@Component({
  selector: 'app-employee-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, RouterLink, ModalDeleteComponent, NgFor, DatePipe],
  templateUrl: './employee-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class EmployeeUsersListComponent implements OnInit {

  //On définis les variables
  employees: UserInterface[] = [];
  currentUser: UserInterface | null = null;
  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;

  //On injecte les services
  userService = inject(UserService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getEmployees();
  };

  //On récupère tous les employées
  getEmployees() {
    this.userService.fetchAllEmployees().subscribe(response =>
      this.employees = response
    )
  };

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(user: UserInterface) {
    this.currentUser = user;
  };

  //Fonction pour supprimer l'élément actuel
  deleteUser() {
    this.currentUser = null;
    this.getEmployees();
    this.modalDeleteComponent.closeModal();
  };

}
