using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopXPress.Api.Entities;

[Table("OrderPayment")]
public class OrderPayment : BaseEntity
{
    [Key]
    public int OrderPaymentId { get; set; }
    public int OrderId { get; set; }
    public decimal TotalAmount { get; set; }
    [ForeignKey(nameof(OrderId))]
    public Order Order { get; set; }
}