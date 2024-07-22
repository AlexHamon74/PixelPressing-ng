import { Component, inject, OnInit } from '@angular/core';
import { commandItemInterface, itemsInterface, serviceInterface } from '../../../shared/entities';
import { ServiceService } from '../../../core/services/service.service';
import { NgFor, NgIf } from '@angular/common';
import { ItemService } from '../../../core/services/item.service';

@Component({
  selector: 'app-commander',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './commander.component.html',
  styleUrl: './commander.component.css'
})
export class CommanderComponent implements OnInit {

  //On définis les variables
  services: serviceInterface[] = [];
  items: itemsInterface[] = [];
  commandItem: commandItemInterface[] = [];
  selectedItem: itemsInterface | null = null;
  defaultCheckedServices: string[] = ['Lavage', 'Repassage'];

  //On injecte les services
  serviceService = inject(ServiceService);
  itemService = inject(ItemService);

  //Méthode appélée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getServices();
    this.getItems();
  }

  getServices() {
    this.serviceService.fetchAll().subscribe(service => {
      this.services = service;
    })
  }

  getItems() {
    this.itemService.fetchAll().subscribe(item => {
      this.items = item;

      // Sélectionner l'item "Chemise" par défaut
      const defaultItem = this.items.find(i => i.name === 'Chemise');
      if (defaultItem) {
        this.selectedItem = defaultItem;
      }
    })
  }

  selectItem(item: itemsInterface) {
    this.selectedItem = item;
  }

  isServiceChecked(serviceName: string): boolean {
    return this.defaultCheckedServices.includes(serviceName);
  }


  addQty(){

  }

  removeQty(){

  }

}
