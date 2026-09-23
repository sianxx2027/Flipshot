import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

interface StoredAccount {
  name: string;
  email: string;
  password: string;
}

const matchingPasswordsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordsDoNotMatch: true };
};

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  protected submitted = false;
  protected signupSuccess = false;
  protected signupError = '';

  protected readonly signupForm = new FormGroup<SignupForm>(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    },
    { validators: matchingPasswordsValidator }
  );

  constructor(private readonly router: Router) {}

  protected onSubmit(): void {
    this.submitted = true;
    this.signupSuccess = false;
    this.signupError = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signupForm.getRawValue();
    const accounts = this.getStoredAccounts();
    const normalizedEmail = email.trim().toLowerCase();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      this.signupError = 'An account with this email already exists.';
      return;
    }

    accounts.push({
      name: name.trim(),
      email: normalizedEmail,
      password
    });
    localStorage.setItem('flipshotAccounts', JSON.stringify(accounts));
    sessionStorage.setItem('flipshotCurrentUser', JSON.stringify({
      name: name.trim(),
      email: normalizedEmail
    }));

    this.signupForm.reset();
    this.submitted = false;
    this.signupSuccess = true;
    void this.router.navigateByUrl('/home');
  }

  protected showError(controlName: keyof SignupForm): boolean {
    const control = this.signupForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted);
  }

  private getStoredAccounts(): StoredAccount[] {
    const storedAccounts = localStorage.getItem('flipshotAccounts');

    if (!storedAccounts) {
      return [];
    }

    try {
      return JSON.parse(storedAccounts) as StoredAccount[];
    } catch {
      return [];
    }
  }
}
