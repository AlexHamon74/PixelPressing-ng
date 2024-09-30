import { Component, inject, OnInit } from '@angular/core';
import { commandInterface, UserInterface } from '../../../shared/entities';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  //On définis nos variables
  user: UserInterface = {} as UserInterface;
  selectedCommandId: number | null = null;

  //On injecte nos services
  userService = inject(UserService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getUser();
  };

  //On récupère les informations du user connecté
  getUser() {
    this.userService.getUserById().subscribe(data => {
      this.user = data;
    })
  };

  calculateTotalOfSubTotal(command: commandInterface): number {
    let subTotal = 0;
    command.commandItems.forEach(item => {
      subTotal += item.totalPrice;
    });
    return subTotal;
  };

  selectOrder(commandId: number): void {
    this.selectedCommandId = this.selectedCommandId === commandId ? null : commandId;
  };
};
