using System.ComponentModel.DataAnnotations;

namespace library_management_system_backend.Models
{
    public class BorrowBookModel
    {
        [Key]
        public int BorrowedBookId { get; set; }

        public int BookId { get; set; }
        public int UserId { get; set; }

        public DateTime BorrowedDate { get; set; }

    }
}
