import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TmdbMovieService } from './service/tmdb-movie.service';
import { AuthInterceptor } from './service/auth.interceptor';
import { FavoriteMovieService } from './service/favorite-movie.service';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    FavoriteMovieService,
    FormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule,
    MatCardModule,
    TmdbMovieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(), provideAnimationsAsync()
  ]
};