public interface IFavoriteMovieService
{
    Task AddFavoriteMovie(int userId, int movieId);
        Task RemoveFavoriteMovie(int userId, int movieId);
        Task<List<int>> GetUserFavorites(int userId);
        Task<string> GenerateShareLink(int userId);
}