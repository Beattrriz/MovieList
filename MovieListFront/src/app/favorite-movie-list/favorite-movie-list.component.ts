import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriteMovie } from '../_models/favorite-movie.model'; 
import { AuthService } from '../service/auth.service';
import { Movies } from '../_models/movies.model';
import { ShareLinkResponse } from '../_models/shareLink.model';

@Component({
  selector: 'app-favorite-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorite-movie-list.component.html',
  styleUrls: ['./favorite-movie-list.component.css'] 
})
export class FavoritesListComponent implements OnInit, AfterViewInit {
  favorites: Movies[] = [];
  userId: number | null = null;
  shareLink: string | null = null;
  shareLinkCopied: boolean = false;

  constructor(
    private favoriteMovieService: FavoriteMovieService,
    private authService: AuthService 
  ) {}
  
  ngAfterViewInit() {
    const tooltipElements = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipElements.forEach(element => new bootstrap.Tooltip(element));
  }

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      this.userId = userId;
      if (this.userId !== null) {
        this.loadFavorites();
      }
    });
  }

  loadFavorites(): void {
    if (this.userId !== null) {
      this.favoriteMovieService.getUserFavorites(this.userId).subscribe(
        (favorites) => {
          this.favorites = favorites;
        },
        error => {
          console.error('Erro ao carregar favoritos', error);
        }
      );
    }
  }
  
  removeFavorite(movieId: number): void {
    if (this.userId !== null) {
      this.favoriteMovieService.removeFavoriteMovie(this.userId, movieId).subscribe(
        () => {
          this.favorites = this.favorites.filter(f => f.id !== movieId); 
        },
        error => {
          console.error('Erro ao remover favorito', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
    }
  }

  formatReleaseDate(date?: string | null): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  generateShareLink(): void {
    if (this.userId !== null) {
      this.favoriteMovieService.shareFavorites(this.userId).subscribe(
        (response: ShareLinkResponse) => {
          this.shareLink = response.shareLink;
          this.copyToClipboard();
        },
        error => {
          console.error('Erro ao gerar link de compartilhamento', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
    }
  }

  copyToClipboard(): void {
    if (this.shareLink) {
      navigator.clipboard.writeText(this.shareLink).then(() => {
        alert('Link copiado para a área de transferência!');
      }, (err) => {
        console.error('Erro ao copiar o link: ', err);
        alert('Erro ao copiar o link.');
      });
    }
  }
  }

