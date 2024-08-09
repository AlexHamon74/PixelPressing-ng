import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { DatePipe, NgFor } from '@angular/common';
import { UserInterface } from '../../../../../shared/entities';
import { UserService } from '../../../../../core/services/user.service';


@Component({
  selector: 'app-customer-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, ModalDeleteComponent, NgFor, DatePipe],
  templateUrl: './customer-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class CustomerUsersListComponent implements OnInit {

  //On définis les variables
  customers: UserInterface[] = [];
  currentCustomer: UserInterface | null = null;
  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;

  //On injecte les services
  userService = inject(UserService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getCustomers();
  };

  //Je récupère mes clients
  getCustomers() {
    this.userService.fetchAllCustomers().subscribe(response => {
      this.customers = response;
    })
  };

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(customer: UserInterface) {
    this.currentCustomer = customer;
  }

  //Fonction pour supprimer l'élément actuel
  deleteCustomer() {
    this.currentCustomer = null;
    this.getCustomers();
    this.modalDeleteComponent.closeModal();
  }
}
