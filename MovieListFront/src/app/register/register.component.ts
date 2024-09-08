import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CreateUser } from '../_models/create-user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  hidePassword = true;
  hideConfirmPassword = true;
  passwordsMismatch = false;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  onSubmit() {
    if (!this.isValidEmail(this.user.email)) {
      alert('Digite um e-mail válido.');
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.passwordsMismatch = true;
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        if (error.status === 400) {
          alert('O e-mail já está cadastrado.');
        } else {
          alert('Ocorreu um erro ao tentar registrar o usuário. Tente novamente.');
        }
      }
    });
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}