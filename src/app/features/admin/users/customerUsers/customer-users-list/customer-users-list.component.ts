import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { DatePipe, NgFor } from '@angular/common';
import { IUser } from '../../../../../shared/entities';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-customer-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, ModalDeleteComponent, NgFor, DatePipe],
  templateUrl: './customer-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class CustomerUsersListComponent implements OnInit{

  //On déclare les variables
  users: IUser[] = [];
  currentUser: IUser | null = null;
  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;

  //On inject les services
  userService = inject(UserService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getUsers();   
  };

  //Je récupère tous les users
  getUsers(){
    this.userService.fetchAll().subscribe(user => {
      this.users = user;
    });
  };

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(user: IUser){
    this.currentUser = user;
  };

  //Fonction pour supprimer l'élément actuel
  onUserDeleted() {
    this.getUsers();
    this.modalDeleteComponent.closeModal();
  }
}
