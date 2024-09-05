import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TmdbMovieService } from './tmdb-movie.service';
import { Movies } from '../_models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private moviesSubject = new BehaviorSubject<Movies[]>([]);
  movies$ = this.moviesSubject.asObservable();

  constructor(private tmdbMovieService: TmdbMovieService) {}

  searchMovies(query: string): void {
    this.tmdbMovieService.searchMovies(query).subscribe(
      (movies: Movies[]) => {
        this.moviesSubject.next(movies);
      },
      (error: any) => {
        console.error('Erro ao buscar filmes', error);
        this.moviesSubject.next([]);
      }
    );
  }
}