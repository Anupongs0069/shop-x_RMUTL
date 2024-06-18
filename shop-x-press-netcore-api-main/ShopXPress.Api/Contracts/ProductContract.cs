using ShopXPress.Api.Contracts.Attributes;
using ShopXPress.Api.Entities;

namespace ShopXPress.Api.Contracts;

[MapFrom(typeof(Product))]
public class ProductContract
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public int InStock { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int ProductCategoryId { get; set; }
    public string? ProductCategoryName { get; set; }
}
