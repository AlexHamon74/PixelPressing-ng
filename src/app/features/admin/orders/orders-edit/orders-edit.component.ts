import { Component, inject, OnInit } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { editOrderInterface, employeeInterface, orderInterface } from '../../../../shared/entities';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-orders-edit',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './orders-edit.component.html',
  styleUrl: '../../admin-style.css'
})
export class OrdersEditComponent implements OnInit {

  employees: employeeInterface[] = [];
  editOrderForm!: FormGroup;
  currentOrder!: orderInterface | undefined;
  isSubmitted = false;

  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployees();
    this.loadOrder();
  };

  getEmployees() {
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
            employee: order.employee ? `/api/employees/${order.employee?.id}` : null,
            status: order.status,
          });
        },
      );
    };
  };

  //Fonction pour convertir une date du format DD/MM/YYYY en YYYY-MM-DD
  convertDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.editOrderForm.valid && this.currentOrder) {
      const formValues = this.editOrderForm.value;

      let deliveryDateConvert = null;
        if (this.currentOrder.delivery) {
          if (this.currentOrder.deliveryDate !== null) {
              deliveryDateConvert = this.convertDate(this.currentOrder.deliveryDate);
          }
      }
      const createdAtConvert = this.convertDate(this.currentOrder.createdAt);

      const updatedOrder: editOrderInterface = {
        id: this.currentOrder.id,
        price: this.currentOrder.price,
        status: formValues.status,
        delivery: this.currentOrder.delivery,
        deliveryDate: deliveryDateConvert,
        commandItems: this.currentOrder.commandItems,
        createdAt: createdAtConvert,
        user: this.currentOrder.user['@id'],
        employee: formValues.employee,
      };
      this.orderService.editOrder(updatedOrder).subscribe(() => {
        this.router.navigate(['/admin/order-list']);
      });
    }
  };

  //Méthode pour vérifier si les champs ont une erreur spécifique
  public hasError(controlName: string, errorName: string) {
    return this.editOrderForm.controls[controlName].hasError(errorName);
  };

}