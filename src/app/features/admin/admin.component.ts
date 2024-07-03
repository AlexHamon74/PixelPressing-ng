
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideNavAdminComponent } from './side-nav-admin/side-nav-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SideNavAdminComponent],
  template: '<app-side-nav-admin /> <router-outlet />',
  styleUrl: 'admin.component.css'
})
export class AdminComponent {

}
