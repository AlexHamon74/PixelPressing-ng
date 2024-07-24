import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-users-create',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule],
  templateUrl: './employee-users-create.component.html',
  styleUrl: '../../../admin-style.css'
})
export class EmployeeUsersCreateComponent{


}
