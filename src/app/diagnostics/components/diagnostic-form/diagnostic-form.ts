import { Component } from '@angular/core';
import { DiagnosticService} from '../services/diagnostic.service';
import { Router } from '@angular/router';
import { DiagnosticQuestion} from '../models/question.model';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnostic-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './diagnostic-form.html',
  styleUrl: './diagnostic-form.css'
})
export class DiagnosticFormComponent {
  questions: DiagnosticQuestion[] = [];

  constructor(private diagnosticService: DiagnosticService, private router: Router) {
    this.questions = this.diagnosticService.getQuestions();
  }

  onSubmit(): void {
    const score = this.diagnosticService.calculateScore(this.questions);
    this.router.navigate(['/diagnostics/result'], { queryParams: { score } });
  }
}
