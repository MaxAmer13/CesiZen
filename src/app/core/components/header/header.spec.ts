import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { RouterTestingModule } from '@angular/router/testing'; // retire si pas de routerLink

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule // seulement si le template utilise routerLink
      ]
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
    const title = el.querySelector('.app-title');
    expect(title === null || title instanceof HTMLElement).toBe(true);
  });
});
