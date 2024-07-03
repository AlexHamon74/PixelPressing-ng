import { Component } from '@angular/core';
import { SideNavAdminComponent } from '../../../shared/side-nav-admin/side-nav-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}
