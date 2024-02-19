using library_management_system_backend.Data;
using library_management_system_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace library_management_system_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookModel>>> GetAllBooks()
        {
            // Retrieve all books from the database
            var books = await _context.Books.ToListAsync();

            // Return the list of books
            return books;
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookModel>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }
        [HttpPost("Borrow")]
        public async Task<IActionResult> BorrowBook([FromBody] BorrowBookRequest borrowBookRequest)
        {
            // Retrieve the book from the database
            var book = await _context.Books.FindAsync(borrowBookRequest.BookId);
            var user = await _context.Users.FindAsync(borrowBookRequest.UserId);

            if (book == null)
            {
                return NotFound(new { Message = "Book not found" });
            }

            // Check if the book is available
            if (!book.IsBookAvailable)
            {
                return BadRequest(new { Message = "Book is not available for borrowing" });
            }
            if (user.TokensAvailable < 1)
            {
                return BadRequest(new { Error = "Insufficient tokens to borrow a book" });
            }
            // Update book availability and borrower information
            book.IsBookAvailable = false;
            book.CurrentlyBorrowedById = borrowBookRequest.UserId;
            user.TokensAvailable -= 1; 

            // Create a new entry in the BorrowedBooks table
            var borrowedBookEntry = new BorrowBookModel
            {
                BookId = borrowBookRequest.BookId,
                UserId = borrowBookRequest.UserId,
                BorrowedDate = borrowBookRequest.BorrowedDate
            };
            _context.BorrowedBooks.Add(borrowedBookEntry);
            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Book borrowed successfully" });
        }
        [HttpGet("BorrowedByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<BookModel>>> GetBooksBorrowedByUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var borrowedBooks = await _context.Books
                .Where(b => b.CurrentlyBorrowedById == userId)
                .ToListAsync();

            return borrowedBooks;
        }

        [HttpGet("LentedByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<BookModel>>> GetBooksLentedByUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var lentedBooks = await _context.Books
                .Where(b => b.LentByUserId == userId)
                .ToListAsync();

            return lentedBooks;
        }

        [HttpPost("Return")]
        public async Task<IActionResult> ReturnBook([FromBody] ReturnBookRequest returnBookRequest)
        {
            // Retrieve the borrowed book entry from the database
            var borrowedBookEntry = await _context.Books
                .FirstOrDefaultAsync(b => b.BookId == returnBookRequest.BookId && b.CurrentlyBorrowedById == returnBookRequest.UserId);

            if (borrowedBookEntry == null)
            {
                return NotFound(new { Message = "Borrowed book entry not found" });
            }

            // Retrieve the book from the database
            var book = await _context.Books.FindAsync(returnBookRequest.BookId);

            if (book == null)
            {
                return NotFound(new { Message = "Book not found" });
            }

            // Update book availability and borrower information
            book.IsBookAvailable = true;
            book.CurrentlyBorrowedById = null;


            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Book returned successfully" });
        }
        [HttpPost("AddBook")]
        public async Task<IActionResult> AddBook([FromBody] BookModel bookModel)
        {
            // Normalize the book name and author by removing spaces and making it lowercase
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the username is already taken
            if (await _context.Books.AnyAsync(u => u.Name == bookModel.Name))
            {
                ModelState.AddModelError("Book", "Already exist");
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(bookModel.LentByUserId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var newBook = new BookModel
            {
                Name = bookModel.Name,
                Author = bookModel.Author,
                Rating = 0,
                Genre = bookModel.Genre,
                IsBookAvailable = true,
                Description = bookModel.Description,
                LentByUserId = bookModel.LentByUserId,
                CurrentlyBorrowedById = null,
                TokensRequired = bookModel.TokensRequired,
                Image = string.Empty

    };
            user.TokensAvailable += 1;
            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "New Book Added successfully", NewBook = newBook });
        }

        // Rating endpoint in your BooksController

        [HttpPost("Rate")]
        public async Task<IActionResult> RateBook([FromBody] RateBookRequest rateBookRequest)
        {
            var book = await _context.Books.FindAsync(rateBookRequest.BookId);

            if (book == null)
            {
                return NotFound(new { Message = "Book not found" });
            }

            var user = await _context.Users.FindAsync(rateBookRequest.UserId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            if (book.Rating == 0)
            {
                book.Rating = rateBookRequest.Rating;
            }
            else
            {
                book.Rating = (book.Rating + rateBookRequest.Rating) / 2.0;
            }

            // Save the new rating to the BookRating table
            var newRatingModel = new BookRatingModel
            {
                BookId = rateBookRequest.BookId,
                UserId = rateBookRequest.UserId,
                Rating = rateBookRequest.Rating
            };

            _context.BookRating.Add(newRatingModel);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Book rated successfully" });
        }
        [HttpPost("GetUserRating")]
        public async Task<ActionResult<int>> GetUserRating([FromBody] GetUserRatingRequest request)
        {
            // Validate input parameters
            if (request.UserId <= 0 || request.BookId <= 0)
            {
                return BadRequest("Invalid user ID or book ID");
            }

            // Retrieve the user's rating for the book
            var userRating = await _context.BookRating
                .Where(r => r.BookId == request.BookId && r.UserId == request.UserId)
                .Select(r => r.Rating)
                .FirstOrDefaultAsync();

            return Ok(userRating);
        }

        [HttpPost("AllRatings")]
        public async Task<ActionResult<IEnumerable<BookRatingModel>>> GetAllRatings()
        {
            var ratings = await _context.BookRating.ToListAsync();

            return ratings;
        }
        public class GetUserRatingRequest
        {
            public int UserId { get; set; }
            public int BookId { get; set; }
        }


        public class BorrowBookRequest
        {
            public int BookId { get; set; }
            public int UserId { get; set; }
            public DateTime BorrowedDate { get; set; }
        }
        public class ReturnBookRequest
        {
            public int BookId { get; set; }
            public int UserId { get; set; }
        }
        public class RateBookRequest
        {
            public int BookId { get; set; }
            public int UserId { get; set; }
            public int Rating { get; set; }
        }

    }
}
