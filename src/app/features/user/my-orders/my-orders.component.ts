import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { orderInterface, UserInterface } from '../../../shared/entities';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orders: orderInterface[] = [];
  user: UserInterface = {} as UserInterface;

  orderService = inject(OrderService);
  userService = inject(UserService);
  selectedOrderId: number | null = null;

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
    })
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
