import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { editOrderInterface, employeeInterface, newOrderInterface, orderInterface, UserInterface } from '../../../../shared/entities';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-orders-edit',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule, NgFor],
  templateUrl: './orders-edit.component.html',
  styleUrl: '../../admin-style.css'
})
export class OrdersEditComponent implements OnInit{

  employees: employeeInterface[] = [];
  editOrderForm!: FormGroup;
  currentOrder!: orderInterface | undefined;

  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployees();
    this.loadOrder();
  };

  getEmployees(){
    this.employeeService.fetchAll().subscribe(data => {
      this.employees = data;
    })
  };

  initializeForm(): void {
    this.editOrderForm = new FormGroup({
      employee: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  };

  loadOrder(): void {
    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.fetchById(orderId).subscribe(
        (order: orderInterface) => {
          this.currentOrder = order;
          this.editOrderForm.patchValue({
            employee: order.employee ? order.employee.toString() : '',
            status: order.status,
          });
          console.log(order.deliveryDate, order.createdAt, order.user['@id'])
        },
        (error) => {
          console.error('Error fetching order', error);
        }
      );
    }
  }

    //Fonction pour convertir une date du format DD/MM/YYYY en YYYY-MM-DD
    convertDate(date: string): string {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }

  onSubmit(): void {
    if (this.editOrderForm.valid && this.currentOrder) {
      const formValues = this.editOrderForm.value;

      const createdAtConvert = this.convertDate(this.currentOrder.createdAt);

      const updatedOrder: editOrderInterface = {
        id: this.currentOrder.id,
        price: this.currentOrder.price,
        status: formValues.status,
        delivery: this.currentOrder.delivery,
        deliveryDate: this.currentOrder.deliveryDate,
        commandItems: this.currentOrder.commandItems,
        createdAt: createdAtConvert,
        user: this.currentOrder.user['@id'],
        employee: formValues.employee,
      };
      console.log(updatedOrder)
      this.orderService.editOrder(updatedOrder).subscribe(() => {
        this.router.navigate(['/admin/order-list']);
      });
    } else {
      alert("Le formulaire n'est pas valide.");
  
    }
  }
}
