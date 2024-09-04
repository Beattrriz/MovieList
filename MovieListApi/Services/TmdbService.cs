using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MovieListApi.DTOs;
public class TmdbService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey = "73de02dd53c0e4f2dc2a42773ba070cd";

    public TmdbService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<MovieDto>> GetMoviesAsync(string query)
    {
        var response = await _httpClient.GetStringAsync($"https://api.themoviedb.org/3/search/movie?api_key={_apiKey}&query={query}");
        var data = JsonConvert.DeserializeObject<MovieResponse>(response);

        if (data?.Results == null)
        {
            return new List<MovieDto>();  // Retorna uma lista vazia se os resultados forem nulos
        }

        return data.Results.Select(movie => new MovieDto
        {
            Title = movie.Title,
            ImageUrl = $"https://image.tmdb.org/t/p/w500{movie.PosterPath}", 
            Overview = movie.Overview
        }).ToList();
    }
}