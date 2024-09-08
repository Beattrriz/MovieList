import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movies } from '../_models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbMovieService {
  private apiUrl = 'http://localhost:5017/api/movies/search';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<Movies[]> {
    if (!query.trim()) {
      return of([]); 
    }
    return this.http.get<Movies[]>(`${this.apiUrl}?query=${query}`);
  }
}
