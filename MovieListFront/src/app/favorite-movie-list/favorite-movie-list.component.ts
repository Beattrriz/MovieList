import { Component, OnInit } from '@angular/core';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriteMovie } from '../_models/favorite-movie.model'; 
import { AuthService } from '../service/auth.service';
import { TmdbMovieService } from '../service/tmdb-movie.service';
import { Movies } from '../_models/movies.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorite-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorite-movie-list.component.html',
  styleUrls: ['./favorite-movie-list.component.css'] 
})
export class FavoritesListComponent implements OnInit {
  favorites: Movies[] = [];
  userId: number | null = null;

  constructor(
    private favoriteMovieService: FavoriteMovieService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      this.userId = userId;
      if (this.userId !== null) {
        this.loadFavorites();
      }
    });
  }

  loadFavorites(): void {
    if (this.userId !== null) {
      this.favoriteMovieService.getUserFavorites(this.userId).subscribe(
        (favoriteIds) => {
          const movieDetails$ = favoriteIds.map(movieId =>
            this.favoriteMovieService.getMovieDetails(movieId)
          );
          forkJoin(movieDetails$).subscribe(
            details => {
              this.favorites = details;
            },
            error => {
              console.error('Erro ao carregar detalhes dos filmes', error);
            }
          );
        },
        error => {
          console.error('Erro ao carregar favoritos', error);
        }
      );
    }
  }

  removeFavorite(movieId: number): void {
    if (this.userId !== null) {
      this.favoriteMovieService.removeFavoriteMovie(this.userId, movieId).subscribe(
        () => {
          this.favorites = this.favorites.filter(f => f.id !== movieId); 
        },
        error => {
          console.error('Erro ao remover favorito', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
    }
  }
}