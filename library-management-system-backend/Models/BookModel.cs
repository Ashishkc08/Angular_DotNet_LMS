using System.ComponentModel.DataAnnotations;

namespace library_management_system_backend.Models
{
    public class BookModel
    {
        [Key]
        public int BookId { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public bool IsBookAvailable { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? LentByUserId { get; set; }
        public int? CurrentlyBorrowedById { get; set; }
        public int TokensRequired { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
