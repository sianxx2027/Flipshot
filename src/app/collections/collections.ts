import { Component } from '@angular/core';

@Component({
  selector: 'app-collections',
  standalone: false,
  templateUrl: './collections.html',
  styleUrl: './collections.css'
})
export class CollectionsComponent {
  protected collections: string[] = this.loadCollections();

  protected removeTopic(topic: string): void {
    this.collections = this.collections.filter((item) => item !== topic);
    localStorage.setItem('flipshotSavedTopics', JSON.stringify(this.collections));
  }

  private loadCollections(): string[] {
    try {
      return JSON.parse(localStorage.getItem('flipshotSavedTopics') ?? '[]') as string[];
    } catch {
      return [];
    }
  }
}
