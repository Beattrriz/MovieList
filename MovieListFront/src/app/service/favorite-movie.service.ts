import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError, using } from 'rxjs';
import { FavoriteMovie } from '../_models/favorite-movie.model';
import { Movies } from '../_models/movies.model';
import { ShareLinkResponse } from '../_models/shareLink.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  private apiUrl = 'http://localhost:5017/api/FavoriteMovie';

  constructor(private http: HttpClient) {}

  getUserFavorites(userId: number): Observable<Movies[]> {
    return this.http.get<Movies[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map(favorites => favorites || []), 
      catchError(err => {
        console.error('Erro ao obter favoritos do usuário', err);
        return of([]); 
      })
    );
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
      switchMap(favorites => {
        const isFavorite = favorites ? favorites.some(f => f.id === movie.id) : false;
        if (isFavorite) {
          return this.removeFavoriteMovie(userId, movie.id);
        } else {
          return this.addFavoriteMovie(userId, movie.id);
        }
      }),
      catchError(err => {
        console.error('Erro ao alternar favorito', err);
        return throwError(() => new Error('Erro ao alternar favorito'));
      })
    );
  }

  isFavorite(movie: Movies, userId: number): Observable<boolean> {
    return this.getUserFavorites(userId).pipe(
      map(favorites => favorites ? favorites.some(f => f.id === movie.id) : false),
      catchError(err => {
        console.error('Erro ao verificar favoritos', err);
        return of(false); 
      })
    );
  }

  getMovieDetails(movieId: number): Observable<Movies> {
    return this.http.get<Movies>(`http://localhost:5017/api/Movies/${movieId}`);
  }

  shareFavorites(userId: number): Observable<ShareLinkResponse> {
    return this.http.get<ShareLinkResponse>(`${this.apiUrl}/share/${userId}`);
  }
}