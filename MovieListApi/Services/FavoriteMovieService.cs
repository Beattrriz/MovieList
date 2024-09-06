using Microsoft.EntityFrameworkCore;
using MovieListApi.Entite;
using System.Collections.Generic;
using System.Linq;
using MovieListApi.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MovieListApi.Services
{
    public class FavoriteMovieService : IFavoriteMovieService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FavoriteMovieService(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
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

        public async Task<string> GenerateShareLink(int userId)
        {
            var request = _httpContextAccessor.HttpContext.Request;
            var scheme = request.Scheme;
            var host = request.Host.Value;

            var shareLink = $"{scheme}://{host}/api/FavoriteMovie/view-shared-favorites/{userId}";

            return shareLink;
        }
    }
}