import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TmdbMovieService } from './service/tmdb-movie.service';
import { AuthInterceptor } from './service/auth.interceptor';
import { FavoriteMovieService } from './service/favorite-movie.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    FavoriteMovieService,
    TmdbMovieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};