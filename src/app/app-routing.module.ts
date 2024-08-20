import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { WaitingForAcceptanceComponent } from './components/users/waiting-for-acceptance/waiting-for-acceptance.component';
import { AdminUserListComponent } from './components/users/admin-user-list/admin-user-list.component';

import { ListprojectsComponent } from './components/projects/listprojects/listprojects.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';
import { ListTasksComponent } from './components/tasks/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/tasks/task-details/task-details.component';
import { EdittaskComponent } from './components/tasks/edittask/edittask.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAuthGuard } from './gurds/adminAuth.guard';
import { doesTheUserLoggedIn } from 'src/utils/doesTheUserLoggedIn';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [doesTheUserLoggedIn]
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
    component: AdminUserListComponent,
    canActivate: [AdminAuthGuard]

  },
  {
    path: 'projectlist',
    component: ListprojectsComponent

  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent
  },
  {
    path: 'edit-project/:id',
    component: EditProjectComponent
  },
  {
    path: 'tasklist',
    component: ListTasksComponent
  },
  {
    path: 'tasks/:id',
    component: TaskDetailsComponent
  },

  {
    path: 'edit-task/:id',
    component: EdittaskComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pieChart',
    component: PieChartComponent
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
