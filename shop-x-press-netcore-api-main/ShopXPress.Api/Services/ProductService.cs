using Microsoft.EntityFrameworkCore;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Entities;
using ShopXPress.Api.Entities.Database;
using ShopXPress.Api.Exceptions;
using ShopXPress.Api.Extensions;
using ShopXPress.Api.Services.Interfaces;

#nullable disable
namespace ShopXPress.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDBContext _dbContext;

        public ProductService(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateProduct(ProductContract product)
        {
            var newProduct = new Product
            {
                ProductCategoryId = product.ProductCategoryId,
                Name = product.Name,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                InStock = product.InStock,
                Description = product.Description
            };
            await _dbContext.Products.AddAsync(newProduct);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteProduct(int productId)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(c => c.ProductId == productId);
            if(product == null)
            {
                throw new InvalidActionException("Product could not be found.");
            }

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<ProductContract> GetProductById(int productId)
        {
            return await _dbContext.Products.AsNoTracking().SelectTo<ProductContract>().FirstOrDefaultAsync(c => c.ProductId == productId);
        }

        public async Task<List<ProductContract>> GetProducts(string? name, int? categoryId)
        {
            var query = _dbContext.Products.AsNoTracking();
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(c => c.Name.ToLower().Contains(name.ToLower()));
            }
            if (categoryId.HasValue)
            {
                query = query.Where(c => c.ProductCategoryId == categoryId.Value);
            }

            return await query.SelectTo<ProductContract>().ToListAsync();
        }

        public async Task<List<ProductContract>> GetTopNewProducts(int maxRecord)
        {
            return await _dbContext.Products.AsNoTracking().Take(maxRecord).OrderByDescending(c => c.CreatedAt).SelectTo<ProductContract>().ToListAsync();
        }

        public async Task<List<ProductContract>> GetTopSpendingProducts(int maxRecord)
        {
            return await _dbContext.Products.AsNoTracking().Take(maxRecord).OrderByDescending(c => c.InStock).SelectTo<ProductContract>().ToListAsync();
        }

        public async Task UpdateProduct(int productId, ProductContract product)
        {
            var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(c => c.ProductId == productId);
            if (existingProduct == null)
            {
                throw new InvalidActionException("Product could not be found.");
            }

            existingProduct.ProductCategoryId = product.ProductCategoryId;
            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.ImageUrl = product.ImageUrl;
            existingProduct.InStock = product.InStock;
            existingProduct.Description = product.Description;
            await _dbContext.SaveChangesAsync();
        }
    }
}
