import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieSearchService } from '../service/movie-search.service';
import { Movies } from '../_models/movies.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  query: string = '';
  movies: Movies[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private movieSearchService: MovieSearchService) {}

  ngOnInit() {

    this.movieSearchService.movies$.subscribe(movies => {
      this.movies = movies;
      this.isLoading = false;
      this.errorMessage = movies.length === 0 && this.query ? 'Nenhum filme encontrado.' : '';
    });
  }

  searchMovies() {
    if (this.query.trim()) {
      this.isLoading = true;
      this.errorMessage = '';
      

      this.movieSearchService.searchMovies(this.query);
    } else {
      this.movies = [];
      this.isLoading = false;
    }
  }
}