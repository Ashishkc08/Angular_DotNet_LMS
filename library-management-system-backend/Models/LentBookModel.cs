using System.ComponentModel.DataAnnotations;

namespace library_management_system_backend.Models
{
    public class LentBookModel
    {
        [Key]
        public int LentBookId { get; set; }

        public int BookId { get; set; }
        public int LenderUserId { get; set; }
        public int BorrowerUserId { get; set; }

        public DateTime LentDate { get; set; }

    }
}
