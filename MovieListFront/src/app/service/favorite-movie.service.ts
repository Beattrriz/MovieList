import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError, using } from 'rxjs';
import { FavoriteMovie } from '../_models/favorite-movie.model';
import { Movies } from '../_models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  private apiUrl = 'http://localhost:5017/api/FavoriteMovie';

  constructor(private http: HttpClient) {}

  getUserFavorites(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/user/${userId}`);
  }

  addFavoriteMovie(userId: number, movieId: number): Observable<void> {
    const url = `${this.apiUrl}/add?userId=${userId}&movieId=${movieId}`;
    return this.http.post<void>(url, null);
  }

  removeFavoriteMovie(userId: number, movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove?userId=${userId}&movieId=${movieId}`);
  }

  toggleFavorite(movie: Movies, userId: number): Observable<void> {
    return this.getUserFavorites(userId).pipe(
      switchMap(favoriteIds => {
        const movieId = Number(movie.id);
        const isFavorite = favoriteIds.includes(movieId);
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
      map(favoriteIds => favoriteIds.includes(Number(movie.id)))
    );
  }

  getMovieDetails(movieId: number): Observable<Movies> {
    return this.http.get<Movies>(`http://localhost:5017/api/Movies/${movieId}`);
  }

  shareFavorites(userId: number): Observable<string> {
    return this.http.get<{ ShareLink: string }>(`${this.apiUrl}/share/${userId}`).pipe(
      map(response => response.ShareLink)
    );
  }
}