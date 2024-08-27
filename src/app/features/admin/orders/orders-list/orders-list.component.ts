import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { NgClass, NgFor } from '@angular/common';
import { orderInterface } from '../../../../shared/entities';
import { OrderService } from '../../../../core/services/order.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [SideNavAdminComponent, NgFor, RouterLink, NgClass],
  templateUrl: './orders-list.component.html',
  styleUrl: '../../admin-style.css'
})
export class OrdersListComponent implements OnInit {

  orders: orderInterface[] = [];

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
