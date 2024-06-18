namespace ShopXPress.Api.Entities;

public class BaseEntity
{
    public DateTime? CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public bool Deleted { get; set; } = false;
}
