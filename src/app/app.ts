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

  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated.set(this.hasActiveSession());
      }
    });
  }

  private hasActiveSession(): boolean {
    return sessionStorage.getItem('flipshotCurrentUser') !== null;
  }
}
