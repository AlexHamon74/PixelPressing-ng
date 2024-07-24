import { Component } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { DatePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-customer-users-list',
  standalone: true,
  imports: [SideNavAdminComponent, ModalDeleteComponent, NgFor, DatePipe],
  templateUrl: './customer-users-list.component.html',
  styleUrl: '../../../admin-style.css'
})
export class CustomerUsersListComponent{

}
