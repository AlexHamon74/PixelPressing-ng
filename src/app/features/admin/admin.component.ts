
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: '<router-outlet />',
  styleUrl: 'admin.component.css'
})
export class AdminComponent {

}
