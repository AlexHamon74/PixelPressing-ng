import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { NgClass, NgFor } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterOrdersPipe } from '../../../../core/pipes/filter-orders.pipe';
import { commandInterface } from '../../../../shared/entities';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [SideNavAdminComponent, NgFor, RouterLink, NgClass, FilterOrdersPipe, FormsModule],
  templateUrl: './orders-list.component.html',
  styleUrl: '../../admin-style.css'
})
export class OrdersListComponent implements OnInit {

  orders: commandInterface[] = [];
  searchText: string = '';

  orderService = inject(OrderService);

  ngOnInit(): void {
    this.getOrders();
  };
  
  getOrders(){
    this.orderService.fetchAll().subscribe(data =>{
      this.orders = data;
      console.log(data);
    })
  };

  getStatusClass(status: string): string {
    switch (status) {
      case 'En attente de réception des articles':
        return 'bg-danger';
      case 'En cours de lavage':
        return 'bg-warning';
      case 'Prêt à être récupéré':
        return 'bg-info'; 
      case 'En cours de livraison':
        return 'bg-info';
      case 'Livré':
        return 'bg-success'; 
      default:
        return 'bg-secondary';
    }
  };

}
