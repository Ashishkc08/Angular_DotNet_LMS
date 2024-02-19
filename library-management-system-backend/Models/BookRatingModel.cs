using System.ComponentModel.DataAnnotations;

namespace library_management_system_backend.Models
{
    public class BookRatingModel
    {
        [Key]
        public int BookRatingId { get; set; }
        [Required]
        public int BookId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [Range(1, 5)] // Assuming ratings are on a scale of 1 to 5
        public int Rating { get; set; }
    }
}
