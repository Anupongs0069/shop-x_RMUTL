using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopXPress.Api.Entities.Enums;

namespace ShopXPress.Api.Entities;

[Table("User")]
public class User : BaseEntity
{
    [Key]
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
    public string HashPassword { get; set; }
    public UserType UserType { get; set; }
}
