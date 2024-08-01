import { Component, inject, Input, OnInit } from '@angular/core';
import { cartItemInterface, itemsInterface, serviceInterface } from '../../../shared/entities';
import { ServiceService } from '../../../core/services/service.service';
import { NgFor, NgIf } from '@angular/common';
import { ItemService } from '../../../core/services/item.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-commander',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './commander.component.html',
  styleUrl: './commander.component.css'
})
export class CommanderComponent implements OnInit {

  //On définis les variables
  quantity: number = 1;
  totalPrice: number = 0;

  services: serviceInterface[] = [];
  items: itemsInterface[] = [];
  selectedItem: itemsInterface | null = null;
  selectedServices: string[] = [];

  //On injecte les services
  serviceService = inject(ServiceService);
  itemService = inject(ItemService);
  cartService = inject(CartService);


  //Méthode appélée lors de l'initialisation du composant
  ngOnInit(): void {
    // this.initializeForm();
    this.getServices();
    this.getItems();
  };

  //On récupère tous les services
  getServices() {
    this.serviceService.fetchAll().subscribe(data => {
      this.services = data;
    })
  };

  //On récupère tous les items
  getItems() {
    this.itemService.fetchAll().subscribe(data => {
      this.items = data;
      // Sélectionner l'item "Chemise" par défaut
      this.selectedItem = this.items.find(i => i.name === 'Chemise') || null;
      this.updateTotalPrice();

    })
  };

  //Fonction pour afficher l'item clicker
  selectItem(item: itemsInterface) {
    this.selectedItem = item;
    this.updateTotalPrice();
  };

  toggleService(serviceName: string) {
    if (this.selectedServices.includes(serviceName)) {
      this.selectedServices = this.selectedServices.filter(service => service !== serviceName);
    } else {
      this.selectedServices.push(serviceName);
    }
    this.updateTotalPrice();
  }


  addQty() {
    this.quantity++;
    this.updateTotalPrice();
  }

  removeQty() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    if (this.selectedItem) {
      // Prix des services sélectionnés (ajoutez le prix des services)
      const servicesPrice = this.selectedServices.length * 5; // Par exemple, ajouter 5€ par service
      this.totalPrice = (this.selectedItem.price + servicesPrice) * this.quantity;
    }
  }
  addItemToCart() {
    if (this.selectedItem) {
      const cartItem: cartItemInterface = {
        item: this.selectedItem,
        service: this.services.filter(service => this.selectedServices.includes(service.name)),
        quantity: this.quantity,
        totalPrice: this.totalPrice
      };

      this.cartService.addItemToCart(cartItem);
      // Réinitialiser les valeurs après ajout
      this.quantity = 1;
      this.selectedServices = [];
      this.updateTotalPrice();
    }
  }
}