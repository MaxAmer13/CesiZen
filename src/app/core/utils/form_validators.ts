import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

/**
 * Valide si les deux mots de passe correspondent.
 */
export function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

/**
 * Vérifie la robustesse d'un mot de passe.
 */
export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const hasMinLength = value.length >= 8;

  const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasMinLength;

  return valid ? null : { weakPassword: true };
}
