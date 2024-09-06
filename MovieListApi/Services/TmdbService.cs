using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MovieListApi.DTOs;

namespace MovieListApi.Services
{
    public class TmdbService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "73de02dd53c0e4f2dc2a42773ba070cd";
        private Dictionary<int, string>? _genreDictionary;

        public TmdbService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://api.themoviedb.org/3/");
        }

        private async Task EnsureGenresLoadedAsync()
        {
            if (_genreDictionary == null)
            {
                var genreResponse = await _httpClient.GetStringAsync($"genre/movie/list?api_key={_apiKey}&language=pt-BR");
                var genresResponse = JsonConvert.DeserializeObject<GenreResponse>(genreResponse);

                if (genresResponse?.Genres != null)
                {
                    _genreDictionary = genresResponse.Genres.ToDictionary(g => g.Id, g => g.Name);
                }
                else
                {
                    _genreDictionary = new Dictionary<int, string>();
                }
            }
        }

        public async Task<List<MovieDto>> GetMoviesAsync(string query)
        {
            await EnsureGenresLoadedAsync();

            var movieResponse = await _httpClient.GetStringAsync($"search/movie?api_key={_apiKey}&language=pt-BR&query={query}");
            var data = JsonConvert.DeserializeObject<MovieResponse>(movieResponse);

            if (data?.Results == null)
            {
                return new List<MovieDto>();
            }

            return data.Results.Select(movie => new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                ImageUrl = !string.IsNullOrEmpty(movie.PosterPath)
                    ? $"https://image.tmdb.org/t/p/w500{movie.PosterPath}"
                    : null,
                Overview = movie.Overview,
                VoteAverage = movie.VoteAverage,
                ReleaseDate = movie.ReleaseDate,
                Genres = movie.GenreIds // Apenas IDs dos gêneros
            }).ToList();
        }

        public async Task<MovieDto> GetMovieByIdAsync(int id)
        {
            await EnsureGenresLoadedAsync();

            var movieResponse = await _httpClient.GetStringAsync($"movie/{id}?api_key={_apiKey}&language=pt-BR");
            var movie = JsonConvert.DeserializeObject<Movie>(movieResponse);

            if (movie == null)
            {
                return new MovieDto();
            }

            return new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                ImageUrl = !string.IsNullOrEmpty(movie.PosterPath)
                    ? $"https://image.tmdb.org/t/p/w500{movie.PosterPath}"
                    : null,
                Overview = movie.Overview,
                VoteAverage = movie.VoteAverage,
                ReleaseDate = movie.ReleaseDate,
                Genres = movie.GenreIds
            };
        }
    }
}