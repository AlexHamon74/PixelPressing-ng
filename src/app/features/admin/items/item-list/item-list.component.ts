import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { ItemService } from '../../../../core/services/item.service';
import { NgFor } from '@angular/common';
import { categoryInterface, itemsInterface } from '../../../../shared/entities';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, SideNavAdminComponent, NgFor],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  //On déclare les variables
  items: itemsInterface[] = [];
  categories: categoryInterface[] = [];

  //On inject les services
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);

  //Methode pour initialiser le composant
  ngOnInit(): void {
    this.getCategories();
  };

  //Je recupere tous les items
  getItems() {
    this.itemService.fetchAll().subscribe(items => {
      this.items = items.map(item => {
        //Si catégorie existe on split '/' pour recuperer le reste dans pop()
        const categoryId = +item.category?.split('/').pop();
        //Ici je cherche a comparer l'id de catégories dans la liste des categories
        const category = this.categories.find(cat => cat.id === categoryId);
        return { ...item, category };
      });
    });
  };

  //Je recupere toutes les catégories et j'appel les items
  getCategories() {
    this.categoryService.fetchAll().subscribe(categories => {
      this.categories = categories;
      this.getItems();
    });
  };


  // FONCTION POUR DELETE UN ITEM
  // POUR ALLER PLUS LOINS INSERER UN MODALE POUR CONFIRMER LA SUPRESSION
  confirmDelete(item: itemsInterface) {
    if (confirm(`Etes-vous sûr de vouloir supprimer : ${item.name}?`)) {
      this.deleteItem(item.id);
    };
  };

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }
}
