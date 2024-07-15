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

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'commander', component: CommanderComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

            { path: 'item-list', component: ItemListComponent, canActivate: [AuthGuard] },
            { path: 'item-create', component: ItemCreateComponent, canActivate: [AuthGuard] },
            { path: 'item-edit/:id', component: ItemEditComponent, canActivate: [AuthGuard] },
            { path: 'service-list', component: ServiceListComponent, canActivate: [AuthGuard] },
            { path: 'service-create', component: ServiceCreateComponent, canActivate: [AuthGuard] },
            { path: 'service-edit/:id', component: ServiceEditComponent, canActivate: [AuthGuard] },
        ]
    },
      {path:'**', redirectTo:'' },

];