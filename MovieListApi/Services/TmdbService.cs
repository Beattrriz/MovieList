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

        public TmdbService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://api.themoviedb.org/3/");
        }

        public async Task<List<MovieDto>> GetMoviesAsync(string query)
        {
            var response = await _httpClient.GetStringAsync($"search/movie?api_key={_apiKey}&query={query}");
            var data = JsonConvert.DeserializeObject<MovieResponse>(response);

            return data.Results.Select(movie => new MovieDto
            {
                Title = movie.Title,
                ImageUrl = !string.IsNullOrEmpty(movie.PosterPath) 
                    ? $"https://image.tmdb.org/t/p/w500{movie.PosterPath}"
                    : null,
                Overview = movie.Overview,
                VoteAverage = movie.VoteAverage 
            }).ToList();
        }
    }
}