import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbMovieService {
  private apiUrl = 'http://localhost:5017/api/movies/search';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?query=${encodeURIComponent(query)}`);
  }
}