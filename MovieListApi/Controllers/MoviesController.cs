using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> SearchMovies(string query)
    {
        var result = await _tmdbService.GetMoviesAsync(query);
        return Ok(result);
    }
}