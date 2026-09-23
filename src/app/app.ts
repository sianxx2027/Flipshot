import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('flipshot');
  protected readonly isAuthenticated = signal(this.hasActiveSession());
  protected readonly isDarkMode = signal(this.getStoredTheme() === 'dark');

  constructor(private readonly router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated.set(this.hasActiveSession());
      }
    });

    this.applyTheme(this.isDarkMode());
  }

  protected get userName(): string {
    const currentUser = sessionStorage.getItem('flipshotCurrentUser');

    if (!currentUser) {
      return 'Guest';
    }

    try {
      return JSON.parse(currentUser).name || 'Guest';
    } catch {
      return 'Guest';
    }
  }

  protected toggleTheme(): void {
    const nextMode = !this.isDarkMode();
    this.isDarkMode.set(nextMode);
    localStorage.setItem('flipshotTheme', nextMode ? 'dark' : 'light');
    this.applyTheme(nextMode);
  }

  protected logout(): void {
    sessionStorage.removeItem('flipshotCurrentUser');
    this.isAuthenticated.set(false);
    void this.router.navigateByUrl('/login');
  }

  private applyTheme(isDark: boolean): void {
    document.body.classList.toggle('flipshot-dark', isDark);
    document.body.classList.toggle('flipshot-light', !isDark);
  }

  private getStoredTheme(): string {
    return localStorage.getItem('flipshotTheme') ?? 'light';
  }

  private hasActiveSession(): boolean {
    return sessionStorage.getItem('flipshotCurrentUser') !== null;
  }
}
