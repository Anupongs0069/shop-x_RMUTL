using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopXPress.Api.Entities;

[Table("CartProduct")]
public class CartProduct
{
    [Key]
    public int Id { get; set; }
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Product Product { get; set; }
    [ForeignKey(nameof(CartId))]
    public Cart Cart { get; set; }
}
