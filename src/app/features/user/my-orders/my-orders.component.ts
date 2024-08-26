import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { newOrderInterface, orderInterface, UserInterface } from '../../../shared/entities';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { OrderDateFilterPipe } from '../../../core/pipes/order-date-filter.pipe';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, OrderDateFilterPipe],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orders: orderInterface[] = [];
  user: UserInterface = {} as UserInterface;
  selectedOrderId: number | null = null;
  searchDate: string = '';


  orderService = inject(OrderService);
  userService = inject(UserService);

  ngOnInit(): void {
    this.getOrders();
    this.getUser();
  };

  getOrders() {
    this.orderService.fetchOrdersByUser().subscribe(data => {
      this.orders = data
      this.orders.forEach(order => {
        order.subTotal = this.calculateTotalOfSubTotal(order);
      });
    });
  };

  getUser() {
    this.userService.getUserById().subscribe(data => {
      this.user = data;
    })
  };

  calculateTotalOfSubTotal(order: orderInterface): number {
    let subTotal = 0;
    order.commandItems.forEach(item => {
      subTotal += item.totalPrice;
    });
    return subTotal;
  };

  selectOrder(orderId: number): void {
    this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
  };

}
