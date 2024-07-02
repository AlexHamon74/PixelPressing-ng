
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, NavComponent, RouterOutlet],
  template: '<app-nav /> <router-outlet />',
  styleUrl: 'user.component.css'
})
export class UserComponent {

}
