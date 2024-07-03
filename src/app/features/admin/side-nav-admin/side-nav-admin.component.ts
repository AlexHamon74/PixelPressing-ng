import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-nav-admin',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './side-nav-admin.component.html',
  styleUrl: './side-nav-admin.component.css'
})
export class SideNavAdminComponent {

  isExpanded: boolean = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
