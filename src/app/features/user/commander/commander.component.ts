import { Component, inject, OnInit } from '@angular/core';
import { commandItemInterface, itemsInterface, serviceInterface } from '../../../shared/entities';
import { ServiceService } from '../../../core/services/service.service';
import { NgFor, NgIf } from '@angular/common';
import { ItemService } from '../../../core/services/item.service';
import { CartService } from '../../../core/services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commander',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './commander.component.html',
  styleUrl: './commander.component.css'
})
export class CommanderComponent implements OnInit {

  //On définis les variables
  createCommandItemForm!:FormGroup;
  services: serviceInterface[] = [];
  items: itemsInterface[] = [];
  commandItem: commandItemInterface[] = [];
  selectedItem: itemsInterface | null = null;
  defaultCheckedServices: string[] = ['Lavage', 'Repassage'];

  //On injecte les services
  serviceService = inject(ServiceService);
  itemService = inject(ItemService);
  cartService = inject(CartService);

  //Méthode appélée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getServices();
    this.getItems();
    this.initializeForm();
  };

  //On récupère tous les services
  getServices() {
    this.serviceService.fetchAll().subscribe(service => {
      this.services = service;
    })
  };

  //On récupère tous les items
  getItems() {
    this.itemService.fetchAll().subscribe(item => {
      this.items = item;
      // Sélectionner l'item "Chemise" par défaut
      const defaultItem = this.items.find(i => i.name === 'Chemise');
      if (defaultItem) {
        this.selectedItem = defaultItem;
      }
    })
  };

  //Fonction pour afficher l'item clicker
  selectItem(item: itemsInterface) {
    this.selectedItem = item;
  };

  //Fonction pour checker par default les services voulus
  isServiceChecked(serviceName: string): boolean {
    return this.defaultCheckedServices.includes(serviceName);
  };

  //On initialise le formulaire
  initializeForm(){
    this.createCommandItemForm = new FormGroup({
      item: new FormControl ('', Validators.required),
      service: new FormControl ('', Validators.required),
      quantity: new FormControl('', Validators.required)
    })
  };

  //Fonction appelée lors de la soumission du formulaire
  onSubmit(){
    this.cartService.createCommandItem(this.createCommandItemForm.value).subscribe();
  }

}
