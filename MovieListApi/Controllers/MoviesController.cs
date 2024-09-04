using Microsoft.AspNetCore.Mvc;
using MovieListApi.Services;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly TmdbService _tmdbService;

    public MoviesController(TmdbService tmdbService)
    {
        _tmdbService = tmdbService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchMovies([FromQuery] string query)
    {
        try
        {
            var movies = await _tmdbService.GetMoviesAsync(query);
            return Ok(movies);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}