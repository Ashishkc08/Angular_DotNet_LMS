using library_management_system_backend.Data;
using library_management_system_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace library_management_system_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup([FromBody] UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the username is already taken
            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
            {
                ModelState.AddModelError("Username", "Username is already taken");
                return BadRequest(ModelState);
            }


            var user = new UserModel
            {
                Name = model.Name,
                Username = model.Username,
                Password = model.Password,
                TokensAvailable = 2
        
    };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully", User = user });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the user with the given username and password exists
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);

            if (user == null)
            {
                // User not found, return an error
                return BadRequest(new { Message = "Invalid username or password" });
            }

            // User found, you can return additional user information if needed
            return Ok(new { Message = "Login successful", User = user });
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserModel>> GetUserByUsername(string username)
        {
            // Retrieve a user with the given username
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("{username}/UserId")]
        public async Task<ActionResult<int>> GetUserIdByUsername(string username)
        {
            // Retrieve the user ID with the given username
            var userId = await _context.Users
                .Where(user => user.Username == username)
                .Select(user => user.UserId)
                .FirstOrDefaultAsync();

            if (userId == 0)
            {
                return NotFound(); // User not found
            }

            return Ok(userId);
        }
        public class UserViewModel
        {
            public string Name { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public class UserLoginModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
    }
}