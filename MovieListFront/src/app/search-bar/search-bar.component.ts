import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieSearchService } from '../service/movie-search.service';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { Movies } from '../_models/movies.model';
import { AuthService } from '../service/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  movies: Movies[] = [];
  query: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  userId: number | null = null;

  constructor(
    private movieSearchService: MovieSearchService,
    private authService: AuthService,
    private favoriteService: FavoriteMovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUserId().subscribe(
      id => {
        this.userId = id;
      },
      error => {
        console.error('Erro ao obter o ID do usuário', error);
        this.userId = null;
      }
    );

    this.movieSearchService.movies$.subscribe(
      movies => {
        this.movies = movies;
        this.isLoading = false;
        this.errorMessage = movies.length === 0 && this.query ? 'Nenhum filme encontrado.' : '';
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar filmes.';
        console.error('Erro ao buscar filmes', error);
      }
    );
  }

  searchMovies() {
    if (this.query.trim()) {
      this.isLoading = true;
      this.errorMessage = '';
      this.movieSearchService.searchMovies(this.query);
    } else {
      this.movies = [];
      this.isLoading = false;
    }
  }

  toggleFavorite(movie: Movies) {
    if (this.authService.isAuthenticated() && this.userId !== null) {
      this.favoriteService.toggleFavorite(movie, this.userId).subscribe(
        () => {
          this.movies = [...this.movies]; 
        },
        error => console.error('Erro ao atualizar favoritos', error)
      );
    } else {
      this.authService.redirectToLogin();
    }
  }

  isFavorite(movie: Movies): Observable<boolean> {
    if (this.userId !== null) {
      return this.favoriteService.isFavorite(movie, this.userId);
    }
    return of(false);
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}