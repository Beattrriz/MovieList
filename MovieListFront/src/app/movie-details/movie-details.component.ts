import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { AuthService } from '../service/auth.service';
import { Movies } from '../_models/movies.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<Movies> | null = null;
  userId: number | null = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private favoriteMovieService: FavoriteMovieService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      this.userId = userId;
      const movieId = this.route.snapshot.paramMap.get('id');
      if (movieId) {
        this.movie$ = this.favoriteMovieService.getMovieDetails(Number(movieId));
        this.checkIfFavorite(Number(movieId));
      }
    });
  }

  formatReleaseDate(date?: string | null): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  checkIfFavorite(movieId: number): void {
    if (this.userId !== null) {
      this.favoriteMovieService.isFavorite({ id: movieId } as Movies, this.userId).subscribe(isFavorite => {
        this.isFavorite = isFavorite;
      });
    }
  }

  toggleFavorite(movie: Movies): void {
    if (this.userId !== null) {
      this.favoriteMovieService.toggleFavorite(movie, this.userId).subscribe(() => {
        this.isFavorite = !this.isFavorite;
      });
    } else {
      console.error('Usuário não autenticado');
    }
  }
}