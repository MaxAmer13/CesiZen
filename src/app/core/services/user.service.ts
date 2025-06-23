import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiRoutes } from '../../api.routes';
import { jwtDecode } from 'jwt-decode';

export enum UserRole {
  Utilisateur = 'Utilisateur',
  Administrateur = 'Administrateur',
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  email: string;
  password: string;
  prenom?: string;
  nom?: string;
}

export interface LoginResultDto {
  success: boolean;
  id?: number;
  email?: string;
  prenom?: string;
  nom?: string;
  errorCode?: string;
  token?: string;
}

const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private _role = new BehaviorSubject<UserRole | null>(this.getRoleFromToken());

  isLoggedIn$ = this._isLoggedIn.asObservable();
  role$ = this._role.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginUserDto): Observable<LoginResultDto> {
    return this.http.post<LoginResultDto>(ApiRoutes.User.Login, credentials).pipe(
      tap(result => {
        if (result.success && result.token) {
          this.saveSession(result);
        }
      })
    );
  }

  register(data: RegisterUserDto): Observable<LoginResultDto> {
    return this.http.post<LoginResultDto>(ApiRoutes.User.Register, data).pipe(
      tap(result => {
        if (result.success && result.token) {
          this.saveSession(result);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this._isLoggedIn.next(false);
    this._role.next(null);
  }

  autoLogin(): void {
    if (this.hasToken()) {
      this._isLoggedIn.next(true);
      this._role.next(this.getRoleFromToken());
    } else {
      this.logout();
    }
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasRole(role: UserRole): boolean {
    return this._role.value === role;
  }

  getCurrentRole(): UserRole | null {
    return this._role.value;
  }

  private saveSession(result: LoginResultDto): void {
    localStorage.setItem('token', result.token!);
    localStorage.setItem('userId', result.id?.toString() ?? '');
    this._isLoggedIn.next(true);
    this._role.next(this.getRoleFromToken());
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getRoleFromToken(): UserRole | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<{ [ROLE_CLAIM]: string }>(token);
      const role = decoded[ROLE_CLAIM];
      if (role === UserRole.Utilisateur || role === UserRole.Administrateur) {
        return role as UserRole;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Pour futur usage
  restoreAccount(email: string): Observable<any> {
    const url = `${ApiRoutes.User.RestoreAccount}?email=${encodeURIComponent(email)}`;
    return this.http.put(url, {});
  }
}
