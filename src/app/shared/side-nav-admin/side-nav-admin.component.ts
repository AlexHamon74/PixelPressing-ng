import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-nav-admin',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './side-nav-admin.component.html',
  styleUrl: './side-nav-admin.component.css'
})
export class SideNavAdminComponent {

  authService = inject(AuthService)
  logout(){
  this.authService.logout();
}

  isExpanded: boolean = false;
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
