import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordsMatchValidator, strongPasswordValidator} from '../../utils/form_validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  confirmPassword: any;
  password: any;
  email: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.errorMessage = 'Formulaire invalide. Veuillez vérifier vos informations.';
      return;
    }

    const formValue = this.registerForm.value;
    // TODO: Appeler un service d'inscription avec formValue.email, formValue.password, etc.
    console.log('Compte créé:', formValue.email);

    // Redirection après inscription réussie
    this.router.navigate(['/auth/login']);
  }
}
