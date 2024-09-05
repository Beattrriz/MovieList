using Microsoft.EntityFrameworkCore;
using MovieListApi.Entite;
using MovieListApi.DTOs;
using MovieListApi.Services;

namespace MovieListApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<FavoriteMovie> FavoriteMovies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavoriteMovie>()
                .HasOne(fm => fm.User)
                .WithMany(u => u.FavoriteMovies)
                .HasForeignKey(fm => fm.UserId);

            modelBuilder.Entity<FavoriteMovie>()
                .Property(fm => fm.MovieId)
                .HasColumnType("varchar(255)"); 
        }

    }
}