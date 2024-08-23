import { Component, inject, OnInit } from '@angular/core';
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
  selectedServices: serviceInterface[] = [];

  //On injecte les services
  serviceService = inject(ServiceService);
  itemService = inject(ItemService);
  cartService = inject(CartService);

  //Méthode appélée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getItems();
    this.getServices();
  };

  //On récupère tous les items
  getItems() {
    this.itemService.fetchAll().subscribe(data => {
      this.items = data;
      this.setDefaultItem()
      this.updateTotalPrice();
    })
  };

  //On récupère tous les services
  getServices() {
    this.serviceService.fetchAll().subscribe(data => {
      this.services = data;
    })
  };

  //Affiche la chemise de base
  setDefaultItem(){
    this.selectedItem = this.items.find(item => item.name === 'Chemise') || null;
  };
  
  //Fonction pour afficher l'item clicker
  selectItem(item: itemsInterface) {
    this.selectedItem = item;
    this.selectedServices = [];
    this.updateTotalPrice();
  };
  
  //Ajoute ou retire un service de la liste des services sélectionnés
  toggleService(service: serviceInterface) {
    const index = this.selectedServices.findIndex(s => s.id === service.id);
    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
    this.updateTotalPrice();
  };

  //Fonction pour augmenter la quantité
  addQty() {
    this.quantity++;
    this.updateTotalPrice();
  };

  //Fonction pour diminuer la quantité
  removeQty() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotalPrice();
    }
  };

  //Fonction pour modifier le prix total
  updateTotalPrice() {
    if (this.selectedItem) {
      const servicesPrice = this.selectedServices.reduce((somme, service) => somme + service.price, 0);
      this.totalPrice = (this.selectedItem.price + servicesPrice) * this.quantity;
    }
  };

  //Ajoute l'item et les services sélectionnés au panier et réinitialise les sélections
  addItemToCart() {
    if (this.selectedItem) {
      const cartItem: cartItemInterface = {
        id: Date.now(),
        item: this.selectedItem,
        service: this.selectedServices,
        quantity: this.quantity,
        totalPrice: this.totalPrice,
      };
      this.cartService.addItemToCart(cartItem);
      this.resetSelection();
    }
  };

  resetSelection() {
    this.quantity = 1;
    this.setDefaultItem();
    this.selectedServices = [];
    this.updateTotalPrice();
    location.reload();

  };

}