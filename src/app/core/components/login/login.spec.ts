// src/app/core/components/login/login.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login';
import { UserService } from '../../services/user.service'; // <-- adapte le chemin

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  // mock strict du service métier
  let mockUserService: Pick<UserService, 'login'>;

  beforeEach(async () => {
    mockUserService = {
      login: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,           // composant standalone => dans imports
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: mockUserService } // <-- override la classe, pas un string token
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockResolvedValue(true as any);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('togglePassword inverse showPassword', () => {
    expect(component.showPassword).toBe(false);
    component.togglePassword();
    expect(component.showPassword).toBe(true);
    component.togglePassword();
    expect(component.showPassword).toBe(false);
  });

  it('onSubmit OK => appelle login et navigue vers /home', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);
    (mockUserService.login as jest.Mock).mockReturnValue(of({}));

    component.onSubmit();

    expect(mockUserService.login).toHaveBeenCalledWith(credentials);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.errorMessage).toBe('');
  });

  it('401 + errorCode ACCOUNT_DELETED_PENDING => showModal true', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    const err = { status: 401, error: { errorCode: 'ACCOUNT_DELETED_PENDING' } };
    (mockUserService.login as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmit();

    expect(mockUserService.login).toHaveBeenCalled();
    expect(component.showModal).toBe(true);
    expect(component.errorMessage).toBe('');
  });

  it('401 + message => errorMessage renseigné', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    const err = { status: 401, error: { message: 'Mauvais identifiants' } };
    (mockUserService.login as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmit();

    expect(component.errorMessage).toBe('Mauvais identifiants');
  });

  it('erreur non 401 => message générique', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    const err = { status: 500 };
    (mockUserService.login as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmit();

    expect(component.errorMessage).toBe('Une erreur est survenue. Veuillez réessayer.');
  });

  it('goToLogin navigue vers /home', () => {
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
