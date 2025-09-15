import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsComponent } from './informations';

describe('Informations', () => {
  let component: InformationsComponent;
  let fixture: ComponentFixture<InformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsComponent] // si le composant est standalone
    }).compileComponents();

    fixture = TestBed.createComponent(InformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait rendre le template sans erreur', () => {
    const el: HTMLElement = fixture.nativeElement;
    // vérifie qu'un élément du template existe — adapte le sélecteur si tu connais un id/class attendu
    expect(el).toBeDefined();
  });
});
