import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { AuthService } from '../service/auth.service';
import { Movies } from '../_models/movies.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {
  movie$: Observable<Movies> | null = null;
  userId: number | null = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private favoriteMovieService: FavoriteMovieService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movie$ = this.favoriteMovieService.getMovieDetails(Number(movieId));
      this.checkIfFavorite(Number(movieId));
    }
  
    // Garantir que o ID do usuário seja carregado, mas não afetar a exibição dos detalhes do filme
    this.authService.getCurrentUserId().subscribe(userId => {
      this.userId = userId;
    });
  }

  ngAfterViewInit(): void {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));
  }

  formatReleaseDate(date?: string | null): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  checkIfFavorite(movieId: number): void {
    if (this.userId !== null) {
      this.favoriteMovieService.isFavorite({ id: movieId } as Movies, this.userId).subscribe(isFavorite => {
        this.isFavorite = isFavorite;
      });
    }
    else {
      this.isFavorite = false;
    }
  }

  toggleFavorite(movie: Movies): void {
    if (this.userId !== null) {
      this.favoriteMovieService.toggleFavorite(movie, this.userId).subscribe(() => {
        this.isFavorite = !this.isFavorite;
      }, error => {
        console.error('Erro ao alternar favorito', error);
      });
    } else {
      console.error('Usuário não autenticado');
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']); 
  }

  onFavoriteClick(movie: Movies): void {
    if (this.userId !== null) {
      this.toggleFavorite(movie);
    } else {
      this.redirectToLogin();
    }
  }

  getTooltipText(): string {
    if (this.userId === null) {
      return 'Faça login para adicionar aos favoritos';
    } else if (this.isFavorite) {
      return 'Remover dos favoritos';
    } else {
      return 'Adicionar aos favoritos';
    }
  }
}