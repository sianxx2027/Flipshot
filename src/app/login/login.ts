import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface StoredAccount {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  protected submitted = false;
  protected loginSuccess = false;
  protected loginError = '';

  protected readonly loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(private readonly router: Router) {}

  protected onSubmit(): void {
    this.submitted = true;
    this.loginSuccess = false;
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    const normalizedEmail = email.trim().toLowerCase();
    const account = this.getStoredAccounts().find(
      (storedAccount) => storedAccount.email === normalizedEmail && storedAccount.password === password
    );

    if (!account) {
      this.loginError = 'Email or password is incorrect.';
      return;
    }

    sessionStorage.setItem('flipshotCurrentUser', JSON.stringify({
      name: account.name,
      email: account.email
    }));
    this.loginForm.reset();
    this.submitted = false;
    this.loginSuccess = true;
    void this.router.navigateByUrl('/home');
  }

  protected showError(controlName: keyof LoginForm): boolean {
    const control = this.loginForm.controls[controlName];
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
