import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideNavAdminComponent } from '../../../../../shared/side-nav-admin/side-nav-admin.component';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../../../../shared/entities';

@Component({
  selector: 'app-employee-users-edit',
  standalone: true,
  imports: [ReactiveFormsModule, SideNavAdminComponent],
  templateUrl: './employee-users-edit.component.html',
  styleUrl: '../../../admin-style.css',
})
export class EmployeeUsersEditComponent {

}
