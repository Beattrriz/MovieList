import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TmdbMovieService } from '../service/tmdb-movie.service';
import { MoviesResponse } from '../_models/movies-response.model';
import { Movies } from '../_models/movies.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
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
          this.movies = data;
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

  onSearchSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    this.searchMovies(); // Call your search function
  }
}