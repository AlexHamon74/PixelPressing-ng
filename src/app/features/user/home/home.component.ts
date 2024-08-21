import { NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { categoryInterface } from '../../../shared/entities';
import { CategoryService } from '../../../core/services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  categories: categoryInterface[] = [];

  categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.fetchAll().subscribe(categorie => {
      this.categories = categorie;
    })
  }
}
