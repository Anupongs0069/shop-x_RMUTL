using ShopXPress.Api.Contracts.Attributes;
using ShopXPress.Api.Entities;

namespace ShopXPress.Api.Contracts;

[MapFrom(typeof(Cart))]
public class CartContract
{
    public int CartId { get; set; }
    public int UserId { get; set; }
    public List<CartProductContract> CartProducts { get; set; }
}

[MapFrom(typeof(CartProduct))]
public class CartProductContract
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public string? ProductName { get; set; }
    public string? ProductDescription { get; set; }
    public decimal ProductPrice { get; set; }
}

public class CartDetailContract
{
    public List<CartProductContract> Products { get; set; }
}

public class ProductInCartContract
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}