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
export class EmployeeUsersListComponent{



}
