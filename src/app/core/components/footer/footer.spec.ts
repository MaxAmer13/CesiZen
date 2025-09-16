import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer';
import { RouterTestingModule } from '@angular/router/testing'; // retire si pas de routerLink

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        RouterTestingModule // seulement si le template utilise routerLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait contenir au moins un élément dans le footer (exemple)', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('footer') || el.querySelector('.footer')).not.toBeNull();
  });
});
