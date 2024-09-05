import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError, using } from 'rxjs';
import { FavoriteMovie } from '../_models/favorite-movie.model';
import { AuthService } from './auth.service';
import { Movies } from '../_models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  private apiUrl = 'http://localhost:5017/api/favorite-movies';

  constructor(private http: HttpClient) {}

  getUserFavorites(userId: number): Observable<FavoriteMovie[]> {
    return this.http.get<FavoriteMovie[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavoriteMovie(userId: number, movieId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, { userId, movieId });
  }

  removeFavoriteMovie(userId: number, movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${userId}/${movieId}`);
  }

  toggleFavorite(movie: Movies, userId: number): Observable<void> {
    return this.getUserFavorites(userId).pipe(
      switchMap(favorites => {
        const movieId = Number(movie.id); // Converter o id do filme para número
        const isFavorite = favorites.some(f => f.movieId === movieId);
        if (isFavorite) {
          return this.removeFavoriteMovie(userId, movieId);
        } else {
          return this.addFavoriteMovie(userId, movieId);
        }
      })
    );
  }

  isFavorite(movie: Movies, userId: number): Observable<boolean> {
    return this.getUserFavorites(userId).pipe(
      map(favorites => favorites.some(f => f.movieId === Number(movie.id)))
    );
  }
}