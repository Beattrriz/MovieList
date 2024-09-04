import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieSearchService } from '../service/movie-search.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  query: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private movieSearchService: MovieSearchService) {}

  searchMovies() {
    if (this.query.trim()) {
      this.isLoading = true;
      this.errorMessage = '';
      this.movieSearchService.searchMovies(this.query);
    } else {
      this.movieSearchService.searchMovies(''); 
      this.isLoading = false;
    }
  }
}