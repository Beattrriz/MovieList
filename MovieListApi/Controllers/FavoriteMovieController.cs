using Microsoft.AspNetCore.Mvc;
using MovieListApi.Services;
using System.Threading.Tasks;

namespace MovieListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteMovieController : ControllerBase
    {
        private readonly FavoriteMovieService _favoriteMovieService;

        public FavoriteMovieController(FavoriteMovieService favoriteMovieService)
        {
            _favoriteMovieService = favoriteMovieService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFavoriteMovie([FromQuery] int userId, [FromQuery] int movieId)
        {
            await _favoriteMovieService.AddFavoriteMovie(userId, movieId);
            return Ok();
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveFavoriteMovie([FromQuery] int userId, [FromQuery] int movieId)
        {
            await _favoriteMovieService.RemoveFavoriteMovie(userId, movieId);
            return Ok();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserFavorites(int userId)
        {
            var favorites = await _favoriteMovieService.GetUserFavorites(userId);
            return Ok(favorites);
        }
    }
}