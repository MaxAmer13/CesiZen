import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Exemple de données dynamiques
    public features = [
      { icon: '💡', title: 'Conseils santé mentale', desc: 'Des articles pour comprendre et agir' },
      { icon: '🧘', title: 'Exercices de respiration', desc: 'Des outils pour réduire le stress' },
      { icon: '📝', title: 'Autodiagnostics', desc: 'Évalue ton niveau de stress' }
    ];
}
