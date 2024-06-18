using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopXPress.Api.Entities;

[Table("ProductCategory")]
public class ProductCategory : BaseEntity
{
    [Key]
    public int ProductCategoryId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
