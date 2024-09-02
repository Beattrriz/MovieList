public class TmdbService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey = "73de02dd53c0e4f2dc2a42773ba070cd";

    public TmdbService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetMoviesAsync(string query)
    {
        var response = await _httpClient.GetStringAsync($"https://api.themoviedb.org/3/search/movie?api_key={_apiKey}&query={query}");
        return response;

    }
}