import { Component, inject, OnInit } from '@angular/core';
import { UserInterface } from '../../../shared/entities';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  //On définis nos variables
  user: UserInterface = {} as UserInterface;

  //On injecte nos services
  userService = inject(UserService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getUser();
  }

  //On récupère les informations du user connecté
  getUser(){
    this.userService.getUserById().subscribe(data =>{
      this.user = data;
    })
  }

}
