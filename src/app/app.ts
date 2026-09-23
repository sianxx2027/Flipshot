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

  constructor(private readonly router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated.set(this.hasActiveSession());
      }
    });
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

  protected logout(): void {
    sessionStorage.removeItem('flipshotCurrentUser');
    this.isAuthenticated.set(false);
    void this.router.navigateByUrl('/login');
  }

  private hasActiveSession(): boolean {
    return sessionStorage.getItem('flipshotCurrentUser') !== null;
  }
}
