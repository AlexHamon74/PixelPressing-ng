import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { categoryInterface } from '../../../../shared/entities';
import { CategoryService } from '../../../../core/services/category.service';
import { ItemService } from '../../../../core/services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent implements OnInit{

  editItemForm!: FormGroup;
  itemService = inject(ItemService);
  router = inject(Router);

  dataCategories !: Subscription;
  categories: categoryInterface[] = [];
  categoryService = inject(CategoryService);


  ngOnInit() {
    this.editItemForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });
    this.getCategories();
  }


  onSubmit(){

  }

  getCategories(){
    this.dataCategories = this.categoryService.fetchAll().subscribe(data => {
      console.log(this.categories);
      this.categories = data })
  };

}
