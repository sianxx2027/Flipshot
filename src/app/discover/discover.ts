import { Component } from '@angular/core';

@Component({
  selector: 'app-discover',
  standalone: false,
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class DiscoverComponent {
  protected readonly topics = ['Quiet mornings', 'Golden hour', 'Urban rhythm', 'Studio textures', 'Coastal tones'];
  protected searchTerm = '';

  protected get filteredTopics(): string[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.topics;
    }

    return this.topics.filter((topic) => topic.toLowerCase().includes(term));
  }

  protected saveTopic(topic: string): void {
    const saved = JSON.parse(localStorage.getItem('flipshotSavedTopics') ?? '[]') as string[];

    if (!saved.includes(topic)) {
      saved.push(topic);
      localStorage.setItem('flipshotSavedTopics', JSON.stringify(saved));
    }
  }
}
