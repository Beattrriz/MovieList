import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MovieSearchService } from '../service/movie-search.service';
import { AuthService } from '../service/auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  query: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  user$: Observable<User | null> = of(null); // Inicialize com Observable.of(null)
  user: User | null = null;

  constructor(
    private movieSearchService: MovieSearchService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.user$ = this.authService.getCurrentUser();
    this.user$.subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Erro ao carregar usuário', error);
      }
    );
  }

  searchMovies() {
    if (this.query.trim()) {
      this.isLoading = true;
      this.errorMessage = '';
      this.movieSearchService.searchMovies(this.query);
      this.router.navigate(['/']);
      this.query = '';
    } else {
      this.movieSearchService.searchMovies(''); 
      this.isLoading = false;
    }
  }

  isLoggedIn(): boolean {
    return !!this.user; 
  }

  logout() {
    localStorage.removeItem('authToken');
    this.user = null; 
    this.router.navigate(['/']); 
  }
}