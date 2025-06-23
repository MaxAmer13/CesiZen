import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnostic-result',
  imports: [],
  templateUrl: './diagnostic-result.html',
  styleUrl: './diagnostic-result.css'
})
export class DiagnosticResultComponent {
  score: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.score = +params['score'] || 0;
    });
  }

  getLevel(): string {
    if (this.score < 150) return "Niveau de stress faible";
    if (this.score < 300) return "Stress modéré – vigilance";
    return "Stress élevé – attention ⚠️";
  }
}
