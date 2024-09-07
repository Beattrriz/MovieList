using Microsoft.AspNetCore.Mvc;
using MovieListApi.Services;
using System.Threading.Tasks;

namespace MovieListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteMovieController : ControllerBase
    {
        private readonly IFavoriteMovieService _favoriteMovieService;

        public FavoriteMovieController(IFavoriteMovieService favoriteMovieService)
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
            if (favorites == null || !favorites.Any())
            {
                return NotFound("Nenhum favorito encontrado.");
            }

            return Ok(favorites);
        }

        [HttpGet("share/{userId}")]
        public async Task<IActionResult> ShareFavorites(int userId)
        {
            var shareLink = await _favoriteMovieService.GenerateShareLink(userId);

            if (string.IsNullOrEmpty(shareLink))
            {
                return NotFound();
            }

            return Ok(new { ShareLink = shareLink });
        }

        [HttpGet("view-shared-favorites/{userId}")]
        public async Task<IActionResult> ViewSharedFavorites(int userId)
        {
            var favorites = await _favoriteMovieService.GetUserFavorites(userId);
            if (favorites == null)
            {
                return NotFound();
            }

            return Ok(favorites);
        }
    }
}