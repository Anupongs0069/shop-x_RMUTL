using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopXPress.Api.Entities;

[Table("Cart")]
public class Cart : BaseEntity
{
    [Key]
    public int CartId { get; set; }
     public int UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public User User { get; set; }
    public List<CartProduct> CartProducts { get; set; }
}
