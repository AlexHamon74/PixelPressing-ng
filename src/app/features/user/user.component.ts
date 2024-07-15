
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/nav/nav.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, NavComponent, RouterOutlet, FooterComponent],
  template: '<app-nav /> <router-outlet /> <app-footer />',
  styleUrl: 'user.component.css'
})
export class UserComponent {

}
