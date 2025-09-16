// src/app/diagnostics/components/diagnostic-result/diagnostic-result.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiagnosticResultComponent } from './diagnostic-result'; // adapte si besoin

describe('DiagnosticResult', () => {
  let component: DiagnosticResultComponent;
  let fixture: ComponentFixture<DiagnosticResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticResultComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // le composant fait: this.route.queryParams.subscribe(...)
            queryParams: of({ score: '12' }),
            // si le composant lit aussi params/snapshot, on peut les ajouter :
            params: of({ id: '42' }),
            snapshot: { params: { id: '42' }, queryParams: { score: '12' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait lire le score depuis les query params', () => {
    expect(component['score']).toBe(12); // adapte si c’est une propriété publique
  });
});
