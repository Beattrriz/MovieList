import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMovieListComponent } from './favorite-movie-list.component';

describe('FavoriteMovieListComponent', () => {
  let component: FavoriteMovieListComponent;
  let fixture: ComponentFixture<FavoriteMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMovieListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
