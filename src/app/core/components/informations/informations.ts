import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-informations',
  imports: [CommonModule,RouterModule],
  templateUrl: './informations.html',
  styleUrl: './informations.css'
})
export class InformationsComponent {
  articles = [
    { id: 1, titre: 'Conseils de santé', extrait: 'Découvrez des astuces simples pour réduire le stress.' },
    { id: 2, titre: 'Exercices de respiration', extrait: 'Apprenez à mieux respirer en quelques minutes par jour.' },
    { id: 3, titre: 'Améliorer son sommeil', extrait: 'Un bon sommeil est essentiel pour votre bien-être.' },
    // ...
  ];

}
