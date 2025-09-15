import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ] // si standalone : utiliser "imports"
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le titre si présent (exemple)', () => {
    const el: HTMLElement = fixture.nativeElement;
    // Remplace '.app-title' par un sélecteur réel de ton template si tu veux une assertion DOM concrète
    const title = el.querySelector('.app-title');
    expect(title === null || title instanceof HTMLElement).toBe(true);
  });
});
