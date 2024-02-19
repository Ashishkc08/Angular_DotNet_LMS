using System.ComponentModel.DataAnnotations;

namespace library_management_system_backend.Models
{
    public class UserModel
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int TokensAvailable { get; set; }

    }
}
