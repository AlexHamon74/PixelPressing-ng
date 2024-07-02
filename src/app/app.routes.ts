import { Routes } from '@angular/router';
import { HomeComponent } from './features/user/home/home.component';
import { LoginComponent } from './features/user/login/login.component';
import { RegisterComponent } from './features/user/register/register.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UserComponent } from './features/user/user.component';
import { AdminComponent } from './features/admin/admin.component';

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
        component:AdminComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent }
        ]
      },
    //   {path:'**', component:Error404Component},

];