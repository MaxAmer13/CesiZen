import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { UserService } from '../../services/user.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  submitted = false;
  showPassword: boolean = false;
  showModal: boolean = true;
  credentials = { email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.userService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          const errorCode = err.error?.errorCode;
          if (errorCode === "ACCOUNT_DELETED_PENDING") {
            this.showModal = true;
          } else {
            this.errorMessage = err.error?.message || "Erreur d'authentification.";
          }
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  goToLogin(): void {
    this.router.navigate(['/home']);
  }
}
