using library_management_system_backend.Models;

namespace library_management_system_backend.Data
{
    public class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Check if data already exists
            if (context.Users.Any() || context.Books.Any())
            {
                return; // Data has already been seeded
            }

            // Seed Users
            var users = new UserModel[]
            {
            new UserModel { Name = "Testing", Username = "test", Password = "test", TokensAvailable = 1 },
            new UserModel { Name = "Amit Sharma", Username = "amit", Password = "amit", TokensAvailable = 10 },
            new UserModel { Name = "Priya Patel", Username = "priya", Password = "priya", TokensAvailable = 15 },
            new UserModel { Name = "Sonal Motwani", Username = "sonal", Password = "sonal", TokensAvailable = 20 },
            new UserModel { Name = "Anita Gupta", Username = "anita", Password = "anita", TokensAvailable = 12 }
            // Add more users as needed
            };
            context.Users.AddRange(users);

            // Seed Books
            var books = new BookModel[]
            {
            new BookModel { Name = "The Secret", Author = "Rhonda Byrne", Genre = "Self-Help", IsBookAvailable = true, Description = "Law of Attraction", TokensRequired = 1, Image = "the_secret.jpg", LentByUserId=1 },
            new BookModel { Name = "Think and Grow Rich", Author = "Napoleon Hill", Genre = "Business", IsBookAvailable = true, Description = "Success Principles", TokensRequired = 1, Image = "think_and_grow_rich.jpg", LentByUserId=4 },
            new BookModel { Name = "Rich Dad Poor Dad", Author = "Robert T. Kiyosaki", Genre = "Finance", IsBookAvailable = true, Description = "Financial Education", TokensRequired = 1, Image = "rich_dad_poor_dad.jpg" , LentByUserId=3 },
            new BookModel { Name = "48 Laws of Power", Author = "Robert Greene", Genre = "Self-Help", IsBookAvailable = true, Description = "Power Dynamics", TokensRequired = 1, Image = "48_laws_of_power.jpg", LentByUserId=1 },
            new BookModel { Name = "Atomic Habits", Author = "James Clear", Genre = "Self-Help", IsBookAvailable = true, Description = "Build Good Habits", TokensRequired = 1, Image = "atomic_habits.jpg", LentByUserId=1 },
            new BookModel { Name = "The Alchemist", Author = "Paulo Coelho", Genre = "Fiction", IsBookAvailable = true, Description = "Follow Your Dreams", TokensRequired = 1, Image = "the_alchemist.jpg", LentByUserId=2 },
            new BookModel { Name = "Sapiens", Author = "Yuval Noah Harari", Genre = "History", IsBookAvailable = true, Description = "Brief History of Humankind", TokensRequired = 1, Image = "sapiens.jpg", LentByUserId=1 },
            new BookModel { Name = "Educated", Author = "Tara Westover", Genre = "Biography", IsBookAvailable = true, Description = "Memoir", TokensRequired = 1, Image = "educated.jpg" , LentByUserId = 2},
            new BookModel { Name = "The Great Gatsby", Author = "F. Scott Fitzgerald", Genre = "Fiction", IsBookAvailable = true, Description = "Classic Novel", TokensRequired = 1, Image = "great_gatsby.jpg" , LentByUserId = 4},
            new BookModel { Name = "To Kill a Mockingbird", Author = "Harper Lee", Genre = "Fiction", IsBookAvailable = true, Description = "Classic Novel", TokensRequired = 1, Image = "kill_mockingbird.jpg" , LentByUserId = 3},
            new BookModel { Name = "Born a Crime", Author = "Trevor Noah", Genre = "Biography", IsBookAvailable = true, Description = "Stories from a South African Childhood", TokensRequired = 1, Image = "born_a_crime.jpg" , LentByUserId = 2},
            new BookModel { Name = "The Power of Habit", Author = "Charles Duhigg", Genre = "Self-Help", IsBookAvailable = true, Description = "Why We Do What We Do in Life and Business", TokensRequired = 1, Image = "power_of_habit.jpg" , LentByUserId = 2},
            new BookModel { Name = "The Catcher in the Rye", Author = "J.D. Salinger", Genre = "Fiction", IsBookAvailable = true, Description = "Classic Novel", TokensRequired = 1, Image = "catcher_in_the_rye.jpg" , LentByUserId = 2}
            // Add more books as needed
            };
            context.Books.AddRange(books);

            // Save changes to the database
            context.SaveChanges();
        }
    }
}

