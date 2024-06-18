using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopXPress.Api.Entities;

[Table("Order")]
public class Order : BaseEntity
{
    [Key]
    public int OrderId { get; set; }
    public string OrderNumber { get; set; } // Auto generate with patterns
    public int UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    public User User { get; set; }
    public List<OrderProduct> OrderProducts { get; set; }
}
