
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideNavAdminComponent } from '../../shared/side-nav-admin/side-nav-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SideNavAdminComponent],
  template: '<router-outlet />',
})
export class AdminComponent {

}
