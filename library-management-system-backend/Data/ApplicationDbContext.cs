using library_management_system_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace library_management_system_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<BookModel> Books { get; set; }
        public DbSet<BorrowBookModel> BorrowedBooks { get; set; }
        public DbSet<LentBookModel> LentBooks { get; set; }

        public DbSet<BookRatingModel> BookRating { get; set; }

        

    }
}
