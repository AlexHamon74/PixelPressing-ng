import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { ItemService } from '../../../../core/services/item.service';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { itemsInterface } from '../../../../shared/entities';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, SideNavAdminComponent, NgFor],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit{
  dataItems !:Subscription;
  items: itemsInterface[] = [];
  service = inject(ItemService);

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.dataItems = this.service.fetchAll().subscribe(data => {
      console.log(this.items = data);
      this.items = data
    })
  }
}
