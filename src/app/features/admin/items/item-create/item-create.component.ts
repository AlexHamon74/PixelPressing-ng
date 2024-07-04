import { Component, inject, OnInit, runInInjectionContext } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../../../core/services/item.service';
import { Router } from '@angular/router';
import { categoryInterface, itemsInterface } from '../../../../shared/entities';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../../core/services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule, NgFor],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})
export class ItemCreateComponent implements OnInit{
  
  createItemForm!: FormGroup;
  itemService = inject(ItemService);
  router = inject(Router);

  dataCategories !: Subscription;
  categories: categoryInterface[] = [];
  categoryService = inject(CategoryService);


  ngOnInit() {
    this.createItemForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });
    this.getCategories();
  }

  onSubmit() {
    this.itemService.createItem(this.createItemForm.value).subscribe({
      next: () => {
        // Redirection après la création (optionnel)
        this.router.navigate(['item-list']);
      },
    });
  }

  getCategories(){
    this.dataCategories = this.categoryService.fetchAll().subscribe(data => {
      console.log(this.categories);
      this.categories = data })
  };
}
