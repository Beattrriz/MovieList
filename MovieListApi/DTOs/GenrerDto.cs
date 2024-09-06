using Newtonsoft.Json;

namespace MovieListApi.DTOs
{
    public class GenreDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }
    }

    public class GenreResponse
    {
        [JsonProperty("genres")]
        public List<GenreDto> Genres { get; set; }
    }
}