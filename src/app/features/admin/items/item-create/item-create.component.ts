import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../../../core/services/item.service';
import { Router } from '@angular/router';
import { categoryInterface } from '../../../../shared/entities';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../../core/services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule, NgFor],
  templateUrl: './item-create.component.html',
  styleUrl: '../../admin-style.css'

})
export class ItemCreateComponent implements OnInit, OnDestroy{
  
  //On déclare les variables
  createItemForm!: FormGroup;
  itemService = inject(ItemService);
  router = inject(Router);

  //On inject les services
  dataCategories !: Subscription;
  categories: categoryInterface[] = [];
  categoryService = inject(CategoryService);

  //Methode pour initialiser le composant
  ngOnInit() {
    this.initializeForm();
    this.getCategories();
  };

  //Methode appelée lorsque on detruit le composant 
  ngOnDestroy(): void {
    this.dataCategories.unsubscribe();
  };

  //On initialise le formulaire
  initializeForm(): void {
    this.createItemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  };

  //Je recupere les categories pour les afficher dans le select du formulaire
  getCategories(){
    this.dataCategories = this.categoryService.fetchAll().subscribe(data => {
    this.categories = data })
  };

  //On soumet le formulaire pour créer un nouvel item
  onSubmit() {
    this.itemService.createItem(this.createItemForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/item-list']);
      },
    });
  };

}
