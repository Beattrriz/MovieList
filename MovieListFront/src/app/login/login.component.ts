import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../_models/login-response';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          if (response.user && response.user.id) {
            localStorage.setItem('userId', response.user.id.toString());

            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          } else {
            console.error('Usuário não encontrado na resposta.');
            this.errorMessage = 'Usuário não encontrado na resposta.';
          }
        } else {
          this.errorMessage = 'Não foi possível obter o token de autenticação.';
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
