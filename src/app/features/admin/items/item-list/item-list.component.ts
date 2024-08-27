import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { ItemService } from '../../../../core/services/item.service';
import { NgFor } from '@angular/common';
import { itemsInterface } from '../../../../shared/entities';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, SideNavAdminComponent, NgFor, ModalDeleteComponent],
  templateUrl: './item-list.component.html',
  styleUrl: '../../admin-style.css'
})
export class ItemListComponent implements OnInit {

  //On déclare les variables
  items: itemsInterface[] = [];
  currentItem: itemsInterface | null = null;

  //On inject les services
  itemService = inject(ItemService);

  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;


  //Methode pour initialiser le composant
  ngOnInit(): void {
    this.getItems();
  };

  //Je recupere tous les items
  getItems() {
    this.itemService.fetchAll().subscribe(item => {
      console.log(this.items = item);
    })
  };

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(item: itemsInterface) {
    this.currentItem = item;
  }

  //Fonction pour supprimer l'élément actuel
  onItemDeleted() {
    this.getItems();
    this.modalDeleteComponent.closeModal();
  }
}