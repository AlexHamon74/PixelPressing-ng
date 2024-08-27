import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { NgFor } from '@angular/common';
import { UserInterface } from '../../../../../shared/entities';
import { UserService } from '../../../../../core/services/user.service';
import { FilterUsersPipe } from '../../../../../core/pipes/filter-users.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customer-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, ModalDeleteComponent, NgFor, FilterUsersPipe, FormsModule],
  templateUrl: './customer-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class CustomerUsersListComponent implements OnInit {

  //On définis les variables
  customers: UserInterface[] = [];
  currentUser: UserInterface | null = null;
  searchText: string = '';
  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;

  //On injecte les services
  userService = inject(UserService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getCustomers();
  };

  //Je récupère mes clients
  getCustomers() {
    this.userService.fetchAll().subscribe(response => {
      this.customers = response;
    })
  };

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(user: UserInterface) {
    this.currentUser = user;
  };

  //Fonction pour supprimer l'élément actuel
  deleteUser() {
    this.currentUser = null;
    this.getCustomers();
    this.modalDeleteComponent.closeModal();
  };
}
