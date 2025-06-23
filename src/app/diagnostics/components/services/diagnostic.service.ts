import { Injectable } from '@angular/core';
import { DiagnosticQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private questions: DiagnosticQuestion[] = [
    { id: 1, label: "Changement d’emploi", points: 36, selected: false },
    { id: 2, label: "Déménagement", points: 20, selected: false },
    { id: 3, label: "Problème de santé", points: 53, selected: false },
    // Ajoute les autres événements ici
  ];

  getQuestions(): DiagnosticQuestion[] {
    return [...this.questions]; // copie immuable
  }

  calculateScore(questions: DiagnosticQuestion[]): number {
    return questions.filter(q => q.selected).reduce((total, q) => total + q.points, 0);
  }
}
