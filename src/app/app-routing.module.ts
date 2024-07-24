import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { WaitingForAcceptanceComponent } from './components/users/waiting-for-acceptance/waiting-for-acceptance.component';
import { AdminUserListComponent } from './components/users/admin-user-list/admin-user-list.component';

import { ProjectComponent } from './components/projects/listprojects/listprojects.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'waiting-for-acceptance',
    component: WaitingForAcceptanceComponent
  },
  {
    path: 'admin/users',
    component: AdminUserListComponent

  },
  {
    path: 'projects',
    component:  ProjectComponent

  },
  {
    path: '', redirectTo: '/login',
    pathMatch: 'full'

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
