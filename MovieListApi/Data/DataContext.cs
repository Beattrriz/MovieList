using Microsoft.EntityFrameworkCore;
using MovieListApi.Entite;

namespace MovieListApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

    }
}