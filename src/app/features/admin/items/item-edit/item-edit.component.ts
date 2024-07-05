import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { categoryInterface, itemsInterface } from '../../../../shared/entities';
import { CategoryService } from '../../../../core/services/category.service';
import { ItemService } from '../../../../core/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule, NgFor],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent implements OnInit, OnDestroy {

  //On déclare les variables
  editItemForm!: FormGroup;
  itemId: any;
  categories: categoryInterface[] = [];
  dataCategories!: Subscription;

  //On inject les services
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  categoryService = inject(CategoryService);
  itemService = inject(ItemService);

  //Methode pour initialiser le composant
  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
    this.getCategories();
    this.loadItem();
  };

  //Methode appelée lorsque on detruit le composant 
  ngOnDestroy(): void {
    this.dataCategories.unsubscribe();
  };

  //On initialise le formulaire
  initializeForm(): void {
    this.editItemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  };

  //On charge les données d'un article spécifique pour pré-remplir le formulaire de modification
  loadItem(): void {
    this.itemService.getItemById(this.itemId!).subscribe(item => {
      this.editItemForm.patchValue({
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image
      });
    });
  };

  //On récupère le liste des catégories pour le select
  getCategories(): void {
    this.dataCategories = this.categoryService.fetchAll().subscribe(data => {
      this.categories = data;
    });
  };

  //On soumet le formulaire de modification
  onSubmit(): void {
    if (this.editItemForm.valid) {
      const updatedItem: itemsInterface = this.editItemForm.value;
      updatedItem.id = this.itemId!;
      this.itemService.updateItem(updatedItem).subscribe(() => {
        this.router.navigate(['/admin/item-list']);
      });
    };
  };


}
