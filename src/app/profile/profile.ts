import { Component } from '@angular/core';

interface CurrentUser {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {
  protected readonly user = this.getCurrentUser();
  protected readonly savedCount = this.getSavedCount();

  private getCurrentUser(): CurrentUser {
    const currentUser = sessionStorage.getItem('flipshotCurrentUser');

    if (!currentUser) {
      return { name: 'Guest', email: 'guest@flipshot.app' };
    }

    try {
      return JSON.parse(currentUser) as CurrentUser;
    } catch {
      return { name: 'Guest', email: 'guest@flipshot.app' };
    }
  }

  private getSavedCount(): number {
    try {
      return JSON.parse(localStorage.getItem('flipshotSavedTopics') ?? '[]').length as number;
    } catch {
      return 0;
    }
  }
}
