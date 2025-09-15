import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: Partial<{ login: jest.Mock }>;
  let mockRouter: Partial<{ navigate: jest.Mock }>;

  beforeEach(async () => {
    mockUserService = {
      login: jest.fn()
    };

    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: 'UserService', useValue: mockUserService } as any,
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

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

  it('ne doit pas appeler userService.login si formulaire invalide', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect((mockUserService.login as jest.Mock).mock.calls.length).toBe(0);
    expect(component.submitted).toBe(true);
  });

  it('doit appeler userService.login et naviguer sur succès', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    (mockUserService.login as jest.Mock).mockReturnValue(of({}));

    component.onSubmit();

    expect(mockUserService.login).toHaveBeenCalledWith(credentials);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.errorMessage).toBe('');
  });

  it('si 401 et errorCode === "ACCOUNT_DELETED_PENDING" => showModal true', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    const err = {
      status: 401,
      error: { errorCode: 'ACCOUNT_DELETED_PENDING' }
    };

    (mockUserService.login as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmit();

    expect(mockUserService.login).toHaveBeenCalled();
    expect(component.showModal).toBe(true);
    expect(component.errorMessage).toBe('');
  });

  it('si 401 et autre message => errorMessage renseigné', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    const err = {
      status: 401,
      error: { message: 'Mauvais identifiants' }
    };

    (mockUserService.login as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmit();

    expect(component.errorMessage).toBe('Mauvais identifiants');
  });

  it('si erreur non 401 => message générique', () => {
    const credentials = { email: 'a@b.com', password: 'secret' };
    component.loginForm.setValue(credentials);

    const err = { status: 500 };

    (mockUserService.login as jest.Mock).mockReturnValue(throwError(() => err));

    component.onSubmit();

    expect(component.errorMessage).toBe("Une erreur est survenue. Veuillez réessayer.");
  });

  it('closeModal met showModal à false', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('goToLogin navigue vers /home', () => {
    component.goToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
