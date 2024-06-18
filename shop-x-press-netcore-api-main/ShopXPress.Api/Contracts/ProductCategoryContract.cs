using ShopXPress.Api.Contracts.Attributes;
using ShopXPress.Api.Entities;

namespace ShopXPress.Api.Contracts;

[MapFrom(typeof(ProductCategory))]
[MapTo(typeof(ProductCategory))]
public class ProductCategoryContract
{
    public int ProductCategoryId { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
}
