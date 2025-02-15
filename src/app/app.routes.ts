import { Routes } from '@angular/router';
import { HomeComponent } from './features/user/home/home.component';
import { LoginComponent } from './features/user/login/login.component';
import { RegisterComponent } from './features/user/register/register.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UserComponent } from './features/user/user.component';
import { AdminComponent } from './features/admin/admin.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ItemListComponent } from './features/admin/items/item-list/item-list.component';
import { ItemCreateComponent } from './features/admin/items/item-create/item-create.component';
import { ItemEditComponent } from './features/admin/items/item-edit/item-edit.component';
import { ServiceListComponent } from './features/admin/servicesItem/service-list/service-list.component';
import { ServiceCreateComponent } from './features/admin/servicesItem/service-create/service-create.component';
import { ServiceEditComponent } from './features/admin/servicesItem/service-edit/service-edit.component';
import { CommanderComponent } from './features/user/commander/commander.component';
import { CustomerUsersListComponent } from './features/admin/users/customerUsers/customer-users-list/customer-users-list.component';
import { EmployeeUsersListComponent } from './features/admin/users/employeeUsers/employee-users-list/employee-users-list.component';
import { EmployeeUsersCreateComponent } from './features/admin/users/employeeUsers/employee-users-create/employee-users-create.component';
import { EmployeeUsersEditComponent } from './features/admin/users/employeeUsers/employee-users-edit/employee-users-edit.component';
import { MyProfileComponent } from './features/user/my-profile/my-profile.component';
import { MyProfileEditComponent } from './features/user/my-profile-edit/my-profile-edit.component';
import { AuthAdminGuard } from './core/guards/auth-admin.guard';
import { PaymentComponent } from './features/user/payment/payment.component';
import { OrderValidatedComponent } from './features/user/order-validated/order-validated.component';
import { MyOrdersComponent } from './features/user/my-orders/my-orders.component';
import { OurServicesComponent } from './features/user/our-services/our-services.component';
import { OrdersListComponent } from './features/admin/orders/orders-list/orders-list.component';
import { OrdersEditComponent } from './features/admin/orders/orders-edit/orders-edit.component';
import { AuthAdminOrEmployeeGuard } from './core/guards/auth-admin-or-employee.guard';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'services', component: OurServicesComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'commander', component: CommanderComponent },
            { path: 'myProfile', component: MyProfileComponent, canActivate: [AuthGuard] },
            { path: 'myProfile-edit', component: MyProfileEditComponent, canActivate: [AuthGuard] },
            { path: 'payment', component: PaymentComponent },
            { path: 'commande-valide', component: OrderValidatedComponent, canActivate: [AuthGuard] },
            { path: 'mes-commandes', component: MyOrdersComponent, canActivate: [AuthGuard] },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthAdminOrEmployeeGuard] },

            { path: 'customer-user-list', component: CustomerUsersListComponent, canActivate: [AuthAdminGuard] },

            { path: 'employee-user-list', component: EmployeeUsersListComponent, canActivate: [AuthAdminGuard] },
            { path: 'employee-user-create', component: EmployeeUsersCreateComponent, canActivate: [AuthAdminGuard] },
            { path: 'employee-user-edit/:id', component: EmployeeUsersEditComponent, canActivate: [AuthAdminGuard] },

            { path: 'item-list', component: ItemListComponent, canActivate: [AuthAdminGuard] },
            { path: 'item-create', component: ItemCreateComponent, canActivate: [AuthAdminGuard] },
            { path: 'item-edit/:id', component: ItemEditComponent, canActivate: [AuthAdminGuard] },
            
            { path: 'service-list', component: ServiceListComponent, canActivate: [AuthAdminGuard] },
            { path: 'service-create', component: ServiceCreateComponent, canActivate: [AuthAdminGuard] },
            { path: 'service-edit/:id', component: ServiceEditComponent, canActivate: [AuthAdminGuard] },

            { path: 'order-list', component: OrdersListComponent, canActivate: [AuthAdminOrEmployeeGuard] },
            { path: 'order-edit/:id', component: OrdersEditComponent, canActivate: [AuthAdminOrEmployeeGuard] },
        ]
    },
      {path:'**', redirectTo:'/' },

];