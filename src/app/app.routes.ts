import { Routes } from '@angular/router';
import { HomeComponent } from './features/user/home/home.component';
import { LoginComponent } from './features/user/login/login.component';
import { RegisterComponent } from './features/user/register/register.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UserComponent } from './features/user/user.component';
import { AdminComponent } from './features/admin/admin.component';
import { authGuard } from './core/guards/auth.guard';
import { ItemListComponent } from './features/admin/items/item-list/item-list.component';
import { ItemCreateComponent } from './features/admin/items/item-create/item-create.component';
import { ItemEditComponent } from './features/admin/items/item-edit/item-edit.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'item-list', component: ItemListComponent, canActivate: [authGuard] },
            { path: 'item-create', component: ItemCreateComponent, canActivate: [authGuard] },
            { path: 'item-edit/:id', component: ItemEditComponent, canActivate: [authGuard] },
        ]
    },
      {path:'**', redirectTo:'' },

];