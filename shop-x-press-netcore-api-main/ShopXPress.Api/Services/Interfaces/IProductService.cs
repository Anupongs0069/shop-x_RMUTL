using ShopXPress.Api.Contracts;

namespace ShopXPress.Api.Services.Interfaces;

public interface IProductService
{
    Task<List<ProductContract>> GetTopNewProducts(int maxRecord);
    Task<List<ProductContract>> GetProducts(string? name, int? categoryId);
    Task<ProductContract> GetProductById(int productId);
    Task CreateProduct(ProductContract product);
    Task UpdateProduct(int productId, ProductContract product);
    Task DeleteProduct(int productId);
    Task<List<ProductContract>> GetTopSpendingProducts(int maxRecord);
}
