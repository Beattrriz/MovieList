import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TmdbMovieService } from '../service/tmdb-movie.service';
import { Movies } from '../_models/movies.model';
import { MoviesResponse } from '../_models/movies-response.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchBarComponent {
  query: string = '';
  movies: Movies[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private tmdbMovieService: TmdbMovieService) {}

  searchMovies() {
    if (this.query.trim()) {
      this.isLoading = true;
      this.errorMessage = '';

      this.tmdbMovieService.searchMovies(this.query).subscribe(
        (data: Movies[]) => {
          console.log('Data received:', data);

          this.movies = data || [];
          this.isLoading = false;
        },
        (error: any) => {
          this.errorMessage = 'Error fetching movies';
          this.isLoading = false;
        }
      );
    } else {
      this.movies = [];
      this.isLoading = false;
    }
  }
}