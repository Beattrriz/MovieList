import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieSearchService } from '../service/movie-search.service';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { Movies } from '../_models/movies.model';
import { AuthService } from '../service/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  movies: Movies[] = [];
  query: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  userId: number | null = null;
  paginatedMovies: Movies[] = [];
  totalMovies: number = 0;
  pageSize: number = 9;
  p: number = 1;

  constructor(
    private movieSearchService: MovieSearchService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(
      id => {
        this.userId = id;
        this.updateMoviesList(); 
      },
      error => {
        console.error('Erro ao obter o ID do usuário', error);
        this.userId = null;
      }
    );

    this.movieSearchService.movies$.subscribe(
      movies => {
        this.movies = movies;
        this.totalMovies = movies.length;
        this.updatePaginatedMovies();
        this.isLoading = false;
        this.errorMessage = movies.length === 0 && this.query ? 'Nenhum filme encontrado.' : '';
        this.query = '';
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar filmes.';
        console.error('Erro ao buscar filmes', error);
        this.query = '';
      }
    );
  }

  initializeTooltips() {
    const tooltipElements = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipElements.forEach(element => new bootstrap.Tooltip(element));
  }

  ngAfterViewInit() {
    this.initializeTooltips();
  }

  searchMovies() {
    if (this.query.trim()) {
      this.isLoading = true;
      this.errorMessage = '';
      this.movieSearchService.searchMovies(this.query);
    } else {
      this.movies = [];
      this.totalMovies = 0;
      this.isLoading = false;
    }
  }

  updatePaginatedMovies() {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMovies = this.movies.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.p = page;
    this.updatePaginatedMovies();
  }

  formatReleaseDate(date?: string): string {
    if (!date) {
      return 'Data não disponível'; 
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric' }; 
    return new Date(date).toLocaleDateString(undefined, options);
  }

  updateMoviesList() {
    if (this.query.trim()) {
      this.movieSearchService.searchMovies(this.query);
    }
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}