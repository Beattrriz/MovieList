import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../_models/user.models';
import { CreateUser } from '../_models/create-user.model';
import { LoginResponse } from '../_models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5017/api/Users';

  constructor(private http: HttpClient) {}

  register(userData: CreateUser): Observable<any> { 
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.error('Resposta inválida do servidor:', response);
        }
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        return throwError(() => new Error('Erro no login. Verifique suas credenciais e tente novamente.'));
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null); 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/current`, { headers });
  }
  
  getCurrentUserId(): Observable<number | null> {
    return this.getCurrentUser().pipe(
      map(user => user ? user.id : null)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  redirectToLogin(): void {
    window.location.href = '/login';
  }
}