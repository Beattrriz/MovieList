using System.ComponentModel.DataAnnotations;

namespace MovieListApi.DTOs
{
    public class UserRegisterDto
{
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string Password { get; set; }
    
    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string ConfirmPassword { get; set; }

}
}