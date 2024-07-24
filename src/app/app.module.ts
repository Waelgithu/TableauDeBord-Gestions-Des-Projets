import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { AuthService } from './services/users/loginS/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/users/signup/signup.component';
import { WaitingForAcceptanceComponent } from './components/users/waiting-for-acceptance/waiting-for-acceptance.component';
import { AdminUserListComponent } from './components/users/admin-user-list/admin-user-list.component';
import { ProjectComponent } from './components/projects/listprojects/listprojects.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WaitingForAcceptanceComponent,
    AdminUserListComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
