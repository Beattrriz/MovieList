namespace MovieListApi.DTOs 
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? ImageUrl { get; set; }
        public string? Overview { get; set; }
        public double? VoteAverage { get; set; }
        public string? ReleaseDate { get; set; }

    }
}