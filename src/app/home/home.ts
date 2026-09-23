import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  protected get savedTopics(): string[] {
    try {
      return JSON.parse(localStorage.getItem('flipshotSavedTopics') ?? '[]') as string[];
    } catch {
      return [];
    }
  }
}
