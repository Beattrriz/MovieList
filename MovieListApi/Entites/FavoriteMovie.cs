using MovieListApi.DTOs;
using MovieListApi.Services;
using Microsoft.EntityFrameworkCore;
using MovieListApi.Entite;

namespace MovieListApi.Entite
{
    public class FavoriteMovie
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public User User { get; set; }
    }
}