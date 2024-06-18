using ShopXPress.Api.Contracts.Attributes;
using ShopXPress.Api.Entities;
using ShopXPress.Api.Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopXPress.Api.Contracts;

[MapFrom(typeof(User))]
public class UserContract
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
    public UserType UserType { get; set; }
    [NotMapped]
    public string UserTypeDescription => UserType.GetDescription();
}
