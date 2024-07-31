import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/users/login/login.component';
import { AuthService } from './services/users/loginS/auth.service';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WaitingForAcceptanceComponent,
    AdminUserListComponent,
    ListprojectsComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    EditProjectComponent,
    ListTasksComponent,
    TaskDetailsComponent,
    EdittaskComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
