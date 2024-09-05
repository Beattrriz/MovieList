using Microsoft.EntityFrameworkCore;
using MovieListApi.Entite;
using System.Collections.Generic;
using System.Linq;
using MovieListApi.Data;
using System.Threading.Tasks;

namespace MovieListApi.Services
{
    public class FavoriteMovieService
    {
        private readonly DataContext _context;

        public FavoriteMovieService(DataContext context)
        {
            _context = context;
        }

        public async Task AddFavoriteMovie(int userId, int movieId)
        {
            var favoriteMovie = new FavoriteMovie
            {
                UserId = userId,
                MovieId = movieId
            };

            var existingFavorite = await _context.FavoriteMovies
                .FirstOrDefaultAsync(fm => fm.UserId == userId && fm.MovieId == movieId);

            if (existingFavorite == null)
            {
                _context.FavoriteMovies.Add(favoriteMovie);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveFavoriteMovie(int userId, int movieId)
        {
            var favoriteMovie = await _context.FavoriteMovies
                .FirstOrDefaultAsync(fm => fm.UserId == userId && fm.MovieId == movieId);

            if (favoriteMovie != null)
            {
                _context.FavoriteMovies.Remove(favoriteMovie);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<int>> GetUserFavorites(int userId)
        {
            return await _context.FavoriteMovies
                .Where(fm => fm.UserId == userId)
                .Select(fm => fm.MovieId)
                .ToListAsync();
        }
    }
}