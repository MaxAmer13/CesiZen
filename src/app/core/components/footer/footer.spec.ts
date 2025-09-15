import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ] // si standalone : utiliser "imports"
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
