using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieListApi.Data;
using MovieListApi.DTOs;
using MovieListApi.Entite;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MovieListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
public async Task<IActionResult> CreateUser([FromBody] UserRegisterDto userDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    if (userDto.Password != userDto.ConfirmPassword)
    {
        return BadRequest("As senhas não coincidem.");
    }

    var hashedPassword = HashPassword(userDto.Password);

    var user = new User
    {
        FirstName = userDto.FirstName,
        LastName = userDto.LastName,
        Email = userDto.Email,
        PasswordHash = hashedPassword 
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserRegisterDto userDto)
        {
            // Verifica se o ID no URL corresponde ao ID no DTO
            if (id <= 0)
            {
                return BadRequest("ID inválido.");
            }

            // Procura o usuário no banco de dados
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Atualiza as propriedades do usuário
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;

            // Atualiza a senha se fornecida
            if (!string.IsNullOrWhiteSpace(userDto.Password))
            {
                user.PasswordHash = HashPassword(userDto.Password);
            }

            // Marca a entidade como modificada e salva as alterações
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
    }
}