using Newtonsoft.Json;

namespace MovieListApi.DTOs
{
    public class MovieResponse
    {
        [JsonProperty("results")]
        public List<Movie> Results { get; set; }
    }

    public class Movie
    {
         [JsonProperty("id")]
        public int Id { get; set; }  
        
        [JsonProperty("title")]
        public string? Title { get; set; }

        [JsonProperty("poster_path")]
        public string? PosterPath { get; set; }

        [JsonProperty("overview")]
        public string? Overview { get; set; }

        [JsonProperty("vote_average")]
        public double? VoteAverage { get; set; }

        [JsonProperty("release_date")]
        public string? ReleaseDate { get; set; }
        
    }
}