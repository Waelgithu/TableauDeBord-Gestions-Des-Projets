import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/users/loginS/auth.service';
import { Router } from '@angular/router';
import { stockTokenRole } from 'src/utils/stockTokenRole';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value).subscribe(
        (response: any) => {
          // console.log('Authentication successful', response);
          if (response?.token.length != 0 && response?.token != null) {
            stockTokenRole("Bearer " + response?.token, response?.role)
            if(response?.role=="ADMIN")
            this.router.navigate(['/admin/users']);
          }

          // handle successful authentication, e.g., redirect to another page
        },
        error => {
          console.error('Authentication failed', error);
          this.errorMessage = 'Failed to authenticate. Please check your credentials.';
          // handle authentication error, e.g., display error message
        }
      );
    } else {
      this.errorMessage = 'Form is invalid. Please check your input.';
    }
  }
}
