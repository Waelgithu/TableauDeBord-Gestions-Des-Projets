import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../../services/users/signupS/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';

  grades = ['SENIOR', 'MIDDLE', 'JUNIOR'];
  roles = ['ADMIN', 'PROJECT_MANAGER', 'PERSONNEL_ADMINISTRATIF', 'TEAM_LEADER', 'DEVELOPER', 'TESTER', 'DESIGNER'];

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      grade: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupService.register(this.signupForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/waiting-for-acceptance']);
        },
        error => {
          console.error('Registration failed', error);
          this.errorMessage = 'Failed to register. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}