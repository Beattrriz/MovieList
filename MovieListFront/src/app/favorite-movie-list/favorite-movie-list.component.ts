import { Component, OnInit } from '@angular/core';
import { FavoriteMovieService } from '../service/favorite-movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriteMovie } from '../_models/favorite-movie.model'; 

@Component({
  selector: 'app-favorite-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorite-movie-list.component.html',
  styleUrls: ['./favorite-movie-list.component.css'] 
})
export class FavoritesListComponent implements OnInit {

  favorites: FavoriteMovie[] = []; 
  userId = 1; 

  constructor(private favoriteMovieService: FavoriteMovieService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteMovieService.getUserFavorites(this.userId).subscribe(
      data => this.favorites = data,
      error => console.error('Erro ao carregar favoritos', error)
    );
  }

  addFavorite(movieId: number): void {
    this.favoriteMovieService.addFavoriteMovie(this.userId, movieId).subscribe(
      () => this.loadFavorites(),
      error => console.error('Erro ao adicionar favorito', error)
    );
  }

  removeFavorite(movieId: number): void {
    this.favoriteMovieService.removeFavoriteMovie(this.userId, movieId).subscribe(
      () => this.loadFavorites(),
      error => console.error('Erro ao remover favorito', error)
    );
  }
}