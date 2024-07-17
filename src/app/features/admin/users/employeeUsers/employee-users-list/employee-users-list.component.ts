import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { RouterLink } from '@angular/router';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { UserService } from '../../../../../core/services/user.service';
import { IUser } from '../../../../../shared/entities';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, RouterLink, ModalDeleteComponent, NgFor, DatePipe],
  templateUrl: './employee-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class EmployeeUsersListComponent implements OnInit{

  //On définis les variables
  users:IUser[] = [];
  currentUser: IUser | null = null;
  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;


  //On injecte les services
  userService = inject(UserService);


  ngOnInit(): void {
    this.getUsers();  
  };

  getUsers(){
    this.userService.fetchAllEmployees().subscribe(user => {
      this.users = user;
      console.log(user);
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
  };

}
