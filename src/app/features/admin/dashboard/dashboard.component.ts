import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../shared/side-nav-admin/side-nav-admin.component';
import { commandInterface, employeeInterface, UserInterface } from '../../../shared/entities';
import { OrderService } from '../../../core/services/order.service';
import { UserService } from '../../../core/services/user.service';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: '../admin-style.css'
})
export class DashboardComponent implements OnInit {

  orders: commandInterface[] = [];
  users: UserInterface[] = [];
  employees: employeeInterface[] = [];

  totalClients: number = 0;
  totalEmployees: number = 0;
  completedOrders: number = 0;
  ongoingOrders: number = 0;

  orderService = inject(OrderService);
  userService = inject(UserService);
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getOrders();
    this.getUsers();
    this.getEmployees();
  };

  getOrders() {
    this.orderService.fetchAll().subscribe(data => {
      this.orders = data;
      this.completedOrders = this.orders.filter(order => order.status === 'Livré').length;
      this.ongoingOrders = this.orders.filter(order => order.status !== 'Livré').length;
    });
  };

  getUsers() {
    this.userService.fetchAll().subscribe(data => {
      this.users = data;
      this.totalClients = this.users.length;
    });
  };

  getEmployees() {
    this.employeeService.fetchAll().subscribe(data => {
      this.employees = data;
      this.totalEmployees = this.employees.length;
    });
  };
}
