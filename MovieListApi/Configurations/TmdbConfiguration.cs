namespace MovieListApi.Configurations
{
    public class ConfigurationResponse
    {
        public ImagesConfig Images { get; set; }
    }

    public class ImagesConfig
    {
       public string SecureBaseUrl { get; set; }
        public List<string> PosterSizes { get; set; }
    }

}