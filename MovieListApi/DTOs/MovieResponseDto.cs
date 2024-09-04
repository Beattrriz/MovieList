namespace MovieListApi.DTOs 
{
    public class MovieResponse
    {
        public List<MovieResult> Results { get; set; }
    }

    public class MovieResult
    {
        public string Title { get; set; }
        public string PosterPath { get; set; }  
        public string Overview { get; set; }
    }
}